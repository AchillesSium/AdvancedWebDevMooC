import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { anecdoteInitializer } from './anecdoteReducer';
import { ConnectedAnecdoteForm, ConnectedAnecdoteList, ConnectedFilter, ConnectedNotification } from "./components"
export { default as store } from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = '0a41e57';

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // step 3
    dispatch(anecdoteInitializer())
  }, [dispatch])
  
  return (
    <div>
      <ConnectedNotification />
      <h2>Anecdotes</h2>
      <ConnectedFilter />
      <ConnectedAnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  )
}
