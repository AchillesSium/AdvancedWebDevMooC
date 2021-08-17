
import React, { useEffect, useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { anecdoteActionCreator, filterActionCreator, voteActionCreator, setNotification } from "./anecdoteReducer"

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = (event) => {
    event.preventDefault()

    dispatch(anecdoteActionCreator(event.target.anecdote.value)).then(() => {
      dispatch(setNotification(`you created anectdote "${event.target.anecdote.value}"`, 5))
    })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>Anecdote: <input type="text" name="anecdote"/></div>
        <button>create</button>
      </form>
    </>
  )
}

// wait... there is no state in this component!
export const ConnectedAnecdoteForm = connect(state => {})(AnecdoteForm)

export const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch()
  
  const handleVote = (anecdote) => {
    dispatch(voteActionCreator(anecdote)).then(() => {
      dispatch(setNotification(`you voted "${anecdote.content}"`, 5))
    })
  }

  return anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )  
}

// assume that AnecdoteForm component in the instructiosn refers to this actually
export const ConnectedAnecdoteList = connect(state => ({anecdotes: state.filtered}))(AnecdoteList)

export const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.text) {
    return (
      <div style={style}>
        {notification.text}
      </div>
    )
  }
  return null
}

// 6.19 step1 connect
export const ConnectedNotification = connect(state => ({notification: state.notification}))(Notification)


export const Filter = ({ storeState }) => {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  // update state if anecdotes change
  useEffect(() => {
    dispatch(filterActionCreator(search, storeState.anecdotes))
  }, [storeState.anecdotes, dispatch, search])

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  )
}

export const ConnectedFilter = connect(state => ({storeState: state}))(Filter)
