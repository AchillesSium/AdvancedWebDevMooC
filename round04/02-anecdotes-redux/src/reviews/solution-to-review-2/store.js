
import { combineReducers, createStore } from 'redux';
import reducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const redu = combineReducers({
    anecdoteReducer: reducer,
    notification: notificationReducer
})

const store = createStore(redu, composeWithDevTools());

export default store;