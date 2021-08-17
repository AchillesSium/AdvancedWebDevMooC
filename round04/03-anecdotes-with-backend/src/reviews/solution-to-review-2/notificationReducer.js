import { ACTIONS } from './anecdoteReducer'

export const notificationReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case ACTIONS.CLEAR_NOTE:
            return ''
        case ACTIONS.SET_NOTE:
            return action.data
        default:
            return state;
    }
}

export const clearNoteAction = () => {
    return {
        type: ACTIONS.CLEAR_NOTE,
    }
}

export const setNoteAction = (note, time = 5) => {
    return async dispatch => {
        dispatch({
            type: ACTIONS.SET_NOTE,
            data: note
        })
        setTimeout(() => {
            dispatch(clearNoteAction())
        }, time * 1000)
    }
}