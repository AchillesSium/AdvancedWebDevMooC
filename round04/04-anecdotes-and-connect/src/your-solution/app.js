
// replace this with the previous assignment's solution

import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { initializeNotes } from './anecdoteReducer'
// import {AnecdoteLists} from './components'
// import {FilterAnecdotes} from './components'
// import {AnecdoteForm} from './components'
// import {Notifications} from './components'
import Components from './components'

export { store } from './store'

export const commitSHA = '108e4218a6d7899f19181be33de83d0a1956a1f9'


export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Components.Notifications />
      <Components.FilterAnecdotes />
      <Components.AnecdoteLists />
      <Components.AnecdoteForm />
    </div >
  )
}

