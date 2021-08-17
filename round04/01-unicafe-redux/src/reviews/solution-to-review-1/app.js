import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

// ** enter commit sha of your repository in here **
export const commitSHA = '5b7a2ecd';


export const store = createStore(reducer)


export const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

