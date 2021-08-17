import { addAnecdote, getAnecdotes, updateAnecdote } from './anecdotes-service'

export const ACTIONS = {
  INITIALIZE: 'INITIALIZE',
  VOTE: 'VOTE',
  CREATE_NEW: 'CREATE_NEW',
  CLEAR_NOTE: 'CLEAR_NOTE',
  SET_NOTE: 'SET_NOTE',
  SET_FILTER: 'SET_FILTER',
}


export const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case ACTIONS.INITIALIZE:
      return action.data
    case ACTIONS.VOTE:
      return state.map(a => a.id === action?.data?.id ? action?.data : a)
    case ACTIONS.CREATE_NEW:
      return [...state, action.data]
    default:
      return state;
  }
}

export const initializeAction = () => {
  return async dispatch => {
    const anecdotes = await getAnecdotes()
    dispatch({
      type: ACTIONS.INITIALIZE,
      data: anecdotes
    })
  }
}

export const voteAction = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await updateAnecdote(anecdote)
    dispatch({
      type: ACTIONS.VOTE,
      data: updatedAnecdote
    })
  }
}

export const createNewAction = (content) => {
  return async dispatch => {
    const newAnecdote = await addAnecdote({ content, votes: 0 })
    dispatch({
      type: ACTIONS.CREATE_NEW,
      data: newAnecdote
    })
  }
}