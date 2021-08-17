
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction, createNewAction } from './anecdoteReducer'
import { setNoteAction } from './notificationReducer'
import { setFilterAction } from './filterReducer'


export const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const filter = e.target.value.toLowerCase()
    dispatch(setFilterAction(filter))
  }
  return (
    <div style={{ marginBottom: '10px' }}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNew = async (e) => {
    e.preventDefault();
    const content = e.target.new.value
    dispatch(createNewAction(content))
    dispatch(setNoteAction(`New anecdote added: '${content}'`), 5)
    e.target.new.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="new" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export const AnecdoteList = () => {
  const { anecdotes, notification, filter } = useSelector(state => state)
  const dispatch = useDispatch()
  const vote = async (anecdote) => {
    dispatch(voteAction({ ...anecdote, votes: anecdote.votes + 1 }))
    dispatch(setNoteAction(`you voted '${anecdote.content}'`, 2))
  }
  const sortedFilteredAnecdotes = anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(a => a?.content?.toLowerCase().includes(filter))

  return (
    <>
      <div>
        <h2>Anecdotes</h2>
        {notification && <Notification />}
        <Filter />
        {sortedFilteredAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}