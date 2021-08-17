import { createStore } from 'redux'
import reducer from './reducer'

// ** enter commit sha of your repository in here **
export const commitSHA = '-1ca2c5f-';


export const store = createStore(reducer)


export const App = () => {

  return (
    <div>
      <div>
        <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
        <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
        <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
        <button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>
      </div>

      <div>
        <div>good {store.getState().good}</div>
        <div>neutral {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    </div>
  )
}

