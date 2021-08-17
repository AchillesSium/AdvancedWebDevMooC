
// replace this with the previous assignment's solution


import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { initializeNotes } from './anecdoteReducer'
import {AnecdoteLists} from './components'
import {FilterAnecdotes} from './components'
import {AnecdoteForm} from './components'
import {Notifications} from './components'

export { store } from './store'

export const commitSHA = '568d693f79afd1f4a11f7428092e3e5c0309ebe9'


export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notifications />
      <FilterAnecdotes />
      <AnecdoteLists />
      <AnecdoteForm />
    </div >
  )
}
