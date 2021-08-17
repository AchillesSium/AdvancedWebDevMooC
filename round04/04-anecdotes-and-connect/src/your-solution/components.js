import { connect } from 'react-redux'
import React from 'react'

import { create_new, vote } from './anecdoteReducer'
import { notify } from './notificationReducer'
import { filterChanges } from './filterReducer'

const AnecdoteForm = (props) => {
  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value

    if(content === ''){
        props.notify(`Please enter some text`)
        return
    }

    event.target.content.value = ''

    props.create_new(content)
    props.notify(`You created '${content}'`)
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
  
  
  const AnecdoteLists = (props) => {
    const handleVote = (anecdote) => {
      props.vote(anecdote)
      props.notify(`You voted '${anecdote.content}'`)
    }
  
    return (
      <div>
        <div>
          {
            props.anecdotes.map(anecdote =>
              <Anecdote key={anecdote.id} anecdote={anecdote}
                handleClick={() => handleVote(anecdote)} />
            )
          }
        </div>
      </div>
    )
  }
  
  
  const mapStateToProps = (state) => {
    let response = state.anecdotes
    if (state.filter) {
        response = state.anecdotes.filter(anecdote =>
        anecdote.content.includes(state.filter))
    }

    response.sort(function(a, b) {
        return b.votes - a.votes;
    });
  
    return {
      'anecdotes': response
    }
  }

const FilterAnecdotes = (props) => {
  const handleChange = (event) => {
    props.filterChanges(event.target.value)
  }

  const style = {
    'marginBottom': 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

  const Notifications = (props) => {
    const notification = props.notification
  
    const style = {
      'border': 'solid',
      'padding': 10,
      'borderWidth': 3
    }
  
    let component = null
    if (notification) {
      component = (
        <div style={style}>
          {notification}
        </div>
      )
    }
  
    return component
  }
  
  const mapStateToNotificationProps = (state) => ({
    notification: state.notification
  })
  
  export default {
    AnecdoteForm: connect(null, { create_new, notify })(AnecdoteForm),
    AnecdoteLists: connect(mapStateToProps, { vote, notify })(AnecdoteLists),
    FilterAnecdotes: connect(null, { filterChanges })(FilterAnecdotes),
    Notifications: connect(mapStateToNotificationProps, null)(Notifications),
  }
