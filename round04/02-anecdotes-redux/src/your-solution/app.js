
// replace this with the starter
import React from 'react'

import {AnecdoteLists} from './components'
import {FilterAnecdotes} from './components'
import {AnecdoteForm} from './components'
import {Notifications} from './components'

export {default as store} from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = '578d028e16a56ed9646183a1707a6196aade877c';

export const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notifications />
      <FilterAnecdotes />
      <AnecdoteLists />
      <AnecdoteForm />
    </div>
  )
}

export default App