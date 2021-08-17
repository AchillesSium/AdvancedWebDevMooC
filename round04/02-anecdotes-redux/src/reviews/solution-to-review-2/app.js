import React from 'react'
import {AnecdoteForm, AnecdoteList, Notification} from "./components"


// ** enter commit sha of your repository in here **
export const commitSHA = 'fa8952cf';

export {default as store} from './store'

export const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}
