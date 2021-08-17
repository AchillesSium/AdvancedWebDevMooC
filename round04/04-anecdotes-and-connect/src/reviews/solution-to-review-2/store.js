import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer, { initializeAnecdotes} from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
import anecdoteService from './anecdoteService'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

anecdoteService.getAll().then( anecdotes => store.dispatch(initializeAnecdotes(anecdotes)) )

export default store