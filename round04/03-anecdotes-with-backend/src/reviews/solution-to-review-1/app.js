import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { initialize } from './anecdoteReducer'
import {AnecdoteList, Filter, AnecdoteForm, Notification } from './components'

export {default as store} from './store'

export const commitSHA = '3e0ec4ef'


export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div >
  )
}
