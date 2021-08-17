
import React from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter, AnecdoteHeader, AnecdoteModal } from './components'
import "semantic-ui-css/semantic.min.css"
export {default as store} from '../redux/store'

// ** enter commit sha of your repository in here **
export const commitSHA = 'c30d7bc';

export const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteHeader />
      <Notification />
      <AnecdoteList />
    </div>
  )
}
