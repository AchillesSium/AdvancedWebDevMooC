import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

import { notify } from './notificationReducer'
import { create_new, vote } from './anecdoteReducer'
import { filterChanges } from './filterReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      vote number: {anecdote.votes} <br/>
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
)


export const AnecdoteLists = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    let response = anecdotes
    if (filter) {
      response = anecdotes.filter(anecdote =>
        anecdote.content.includes(filter))
    }
    response.sort(function(a, b) {
      return b.votes - a.votes;
    });
  
    return response
  })

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(notify(`You voted '${anecdote.content}'`))
  }

  return (  
    <div>
      <div>
        {
          anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote}
              handleClick={() => handleVote(anecdote)} />
          )
        }
      </div>
    </div>
  )
}

export const FilterAnecdotes = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterChanges(event.target.value))
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


export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    if(content === '') {
      dispatch(notify(`Please type some text`))
      return
    }
    event.target.content.value = ''
    dispatch(create_new(content))
    dispatch(notify(`You created '${content}'`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(event) => createAnecdote(event)}>
        <div><input name="content" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export const Notifications = () => {
    const notifications = useSelector(state => state.notification)
  
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 3
    }
  
    let component = null
    if (notifications) {
      component = (
        <div style={style}>
          {notifications}
        </div>
      )
    }
  
  return component
}

