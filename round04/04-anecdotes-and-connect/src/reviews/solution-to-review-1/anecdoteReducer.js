import { combineReducers } from "redux"
import { AnecdoteService } from "./services"

const anecdotesAtStart = []
/*[
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]*/

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// Let"s keep actions in constant so they stay consistent
const ActionTypes = {
  ADD_ANECDOTE: "new",
  FILTER: "filter",
  INIT: "init",
  NOTIFICATION: "show_notification",
  VOTE: "vote",
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state)
  console.log("action anecdote", action)
  switch (action.type) {
    case ActionTypes.VOTE: 
      return state.map(anecdote => {
        if (anecdote.id === action.data.id) {
          return {...anecdote, votes: anecdote.votes + 1}
        }
        return anecdote
        // this stopped working after I added another reducer... even console logs shows unsorted but updated one
      }).sort((a, b) => a.votes < b.votes)
    case ActionTypes.ADD_ANECDOTE:
      return state.concat(action.data)
    case ActionTypes.INIT:
      // from backend
      return action.data
    default:
      return state
  }
}

const initialNotification = { text: undefined }
const notificationReducer = (state = initialNotification, action) => {
  console.log("notification state now: ", state)
  console.log("notification action", action)
  if (action.type === ActionTypes.NOTIFICATION) {
    // grand finale remove previous timeout
    clearTimeout(state.timeoutId)
    return { ...action.data }
  }
  return state
}

const filterState = []
const filterReducer = (state = filterState, action) => {
  console.log("filter state now: ", state)
  console.log("filter action", action)
  if (action.type === ActionTypes.FILTER) {
    return action.data.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(action.data.search.toLowerCase()))
  }
  return state
}

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filtered: filterReducer,
  notification: notificationReducer
})

export const filterActionCreator = (search, anecdotes) => {
  return {
    type: ActionTypes.FILTER,
    data: { search, anecdotes }
  }
}

export const notificationNewActionCreator = (text, timeoutId) => {
  return {
    type: ActionTypes.NOTIFICATION,
    data: { text, timeoutId }
  }
}

export const clearNotification = () => {
  return {
    type: ActionTypes.NOTIFICATION,
    data: {}
  }
}

export const setNotification = (text, delaySeconds) => {
  return async dispatch => {
    //grand finale
    const timeoutId = setTimeout(() => dispatch(clearNotification()), delaySeconds * 1000)
    dispatch(notificationNewActionCreator(text, timeoutId))
  }
}


export const voteActionCreator = (anecdote) => {
  return async dispatch => {
    await AnecdoteService.vote(anecdote).then(() => {
      dispatch({
        type: ActionTypes.VOTE,
        data: { id: anecdote.id }
      })
    })
  }
}

export const anecdoteActionCreator = (anecdote) => {
  return async dispatch => {
    await AnecdoteService.create(anecdote).then((data) => {
      console.error(data)
      dispatch({
        type: ActionTypes.ADD_ANECDOTE,
        data
      })
    })
  }
}

export const anecdoteInitializer = () => {
  return async dispatch => {
    await AnecdoteService.list().then(data => dispatch({
      type: ActionTypes.INIT,
      data
    }))
  }
}


export default reducer