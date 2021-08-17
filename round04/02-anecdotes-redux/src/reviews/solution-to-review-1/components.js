import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote, voteAnecdote } from './anecdoteReducer'
import { notificationSet, notificationDelete } from './notificationReducer'
import { filterSet } from './filterReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notificationSet(`New anecdote '${content}' created`))
    setTimeout(() => {
      dispatch(notificationDelete())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="newAnecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if ( state.filter.length === 0 ) {
      return state.anecdotes
    }
    else {
      return state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase()) === true)
    }
  })
  
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(notificationSet(`You voted '${content}'`))
    setTimeout(() => {
      dispatch(notificationDelete())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {
    return null
  }

  else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterSet(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}