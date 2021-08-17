const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'DELETE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const notificationSet = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationDelete = () => {
  return {
    type: 'DELETE_NOTIFICATION',
    notification: null
  }
}

export default notificationReducer