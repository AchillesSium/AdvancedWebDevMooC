import React, { useEffect } from 'react'
import { AnecdoteForm, AnecdoteList } from './components'
import { initializeAction } from './anecdoteReducer'
import { useDispatch } from 'react-redux'
export { store } from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = '805b95e';

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAction())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}
