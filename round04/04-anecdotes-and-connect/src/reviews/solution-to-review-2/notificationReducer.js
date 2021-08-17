var timeoutID

const notificationReducer = (state = '', action) => {
    switch ( action.type ) {
        case 'NOTIFICATION':
            state = ''
            return state.concat(action.data)
        case 'CLEAR_NOTIFICATION':
            state= ''
            return state
        default: return state
    }
}

export const setNotification = (content, time, previousNotification) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: content
        })
        if(previousNotification !== '') {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {dispatch(clearNotification())}, (time * 1000))
    }
}

export const clearNotification = () => { return { type: 'CLEAR_NOTIFICATION' } }

export default notificationReducer