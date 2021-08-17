const reducer = (state = '', action) => {
  switch (action.type) {
    case 'VIEW':
      return action.data.message
    case 'HIDE':
      return ''
    default:
      return state
  }
}
  
const display = (message) => ({
  type: 'VIEW',
  data: { message }
})
  
const hide = () => ({
  type: 'HIDE'
})
  
export const onNotification = (message, timer = 3) => {
  return async dispatch => {
    await dispatch(display(message))
    setTimeout(
      async () => await dispatch(hide()),
      timer * 1000
    )
  }
}
  
export default reducer