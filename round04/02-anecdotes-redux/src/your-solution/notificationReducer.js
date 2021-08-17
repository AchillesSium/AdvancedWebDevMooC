
const reducer = (state = '', action) => {
    switch(action.type) {
        case 'NOTIFY':
            let newState = {...state}
            newState = action.msg
            return newState
        case 'MUTE':
            return ''
        default:
            return state
    }
    
}

export const showNotification = (message) => {
    return {   
        type: 'NOTIFY',    
        msg: message
    }
}

export const removeNotification = () => {
    return {   
        type: 'MUTE'        
    }
}

export default reducer