const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

const filterChanges = (filter) => {
  return {
    'type': 'SET_FILTER',
    filter,
  }
}

export { filterChanges }
export default reducer