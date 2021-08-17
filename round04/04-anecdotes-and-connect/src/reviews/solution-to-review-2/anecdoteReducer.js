import anecdoteService from "./anecdoteService"

const anecdoteReducer = (state = [], action) => {
  switch ( action.type ) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find( n => n.id === id )
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map( anecdote => anecdote.id !== id ? anecdote : votedAnecdote )
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    }) 
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer