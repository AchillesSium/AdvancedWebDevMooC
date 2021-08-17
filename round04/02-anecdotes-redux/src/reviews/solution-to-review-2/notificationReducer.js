const initialState = {
    content: "",
    visible: false
}

export const createNotification = (notification) => {
    console.log(notification);
    return {
        type: "NOTIFICATION",
        data: {
            notification
        }
    }
}

export const hideNotification = () => {
    return {
        type: "HIDE"
    }
}

const notificationReducer = (state = initialState, action) => {
    console.log("Notification state now: ", state);
    console.log("Notification action: ", action);
    if (action === undefined) {
        return state;
    }
    switch (action.type) {
        case "NOTIFICATION":
            return {
                ...state,
                content: action.data.notification,
                visible: true
            }
        case "HIDE":
            return {
                ...state,
                visible: false
            }
        default: return state;
    }
}

export default notificationReducer;