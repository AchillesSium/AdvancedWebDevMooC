import React from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
export { default as store } from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = '9981f9cf';

export const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}