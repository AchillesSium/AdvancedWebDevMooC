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
      const newState = [...filterState, action.data]
      return newState.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export const initialize = () => {
  return async dispatch => {
    const data = await service.getAll()
    dispatch({
      'type': 'INIT',
      data,
    })
  }
}

export const createDote = (content) => {
  return async dispatch => {
    const data = await service.create(content)
    dispatch({
      'type': 'NEW',
      data
    })
  }
}

export const makeVote = (anecdote) => {
  return async dispatch => {
    const data = await service.update(anecdote)
    dispatch({
      'type': 'VOTE',
      data
    })
  }
}

export default reducer