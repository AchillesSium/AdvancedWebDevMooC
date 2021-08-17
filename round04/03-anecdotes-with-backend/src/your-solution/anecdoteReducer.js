import service from './services'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const filterState = state.filter(as => as.id !== id)
      const finalState = [...filterState, action.data]
      return finalState.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

const initializeNotes = () => {
  return async dispatch => {
    const data = await service.getAll()
    dispatch({
      'type': 'INIT',
      data,
    })
  }
}

const create_new = (content) => {
  return async dispatch => {
    const data = await service.createNew(content)
    dispatch({
      'type': 'NEW',
      data
    })
  }
}

const vote = (anecdote) => {
  return async dispatch => {
    const data = await service.updateVotes(anecdote)
    dispatch({
      'type': 'VOTE',
      data
    })
  }
}

export { create_new, vote, initializeNotes }
export default reducer