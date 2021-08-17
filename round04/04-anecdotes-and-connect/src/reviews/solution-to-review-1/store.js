import { applyMiddleware, createStore } from 'redux'
import thunk from "redux-thunk"
import reducer from './anecdoteReducer'
import { composeWithDevTools } from "redux-devtools-extension"

// step 7 store in own file
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
