import { ACTIONS } from './anecdoteReducer'

export const filterReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case ACTIONS.SET_FILTER:
            return action.data
        default:
            return state;
    }
}

export const setFilterAction = (filter) => {
    return {
        type: ACTIONS.SET_FILTER,
        data: filter
    }
}