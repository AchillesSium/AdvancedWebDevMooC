import React, { useEffect } from 'react'
import { AnecdoteList, ConnectedAnecdoteForm as AnecdoteForm, ConnectedFilter as Filter, ConnectedNotification as Notification } from './components'
import { initializeAnecdotes } from './anecdoteReducer'
import { useDispatch } from 'react-redux'
export {default as store} from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = 'dc128a1f';

export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h1>Anecdotes</h1>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

