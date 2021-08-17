const reducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.text
    default:
      return state
  }
}

export const filter = (value) => {
  return {
    type: 'FILTER',
    text: value
  }
}

export default reducer