
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createDote, makeVote } from './anecdoteReducer'
import { onNotification } from './notificationReducer'
import {filter} from './filterReducer'

export const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  else {
    return (<></>)
  }
  
}

export const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if(state.filter) {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
    return state.anecdotes
  })
  const dispatch = useDispatch()

  const vote = (event) => {
    const id = event.target.value
    const selected = anecdotes.find(anecdote => anecdote.id === id)

    dispatch(makeVote(selected))
    dispatch(onNotification(`You voted '${selected.content}'`))
  }
  return (
    <>
    {anecdotes.sort((first,second) => second.votes - first.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={vote} value={anecdote.id}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export const AnecdoteForm = () => {
  
  const dispatch = useDispatch()

  const addDote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createDote(content))
    dispatch(onNotification(`You added '${content}'`))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addDote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export const Filter = () => {
  const dispatch = useDispatch()
  const handleFilterChange = (event) => {
    const value = event.target.value
    dispatch(filter(value))

  }

  return (
    <div>
      filter <input onChange={handleFilterChange} />
    </div>
  )
}


