import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from './anecdoteReducer'
import { setNotification } from './notificationReducer'
import { changeFilter } from './filterReducer'
import { connect } from 'react-redux'


const Notification = (props) => {
  return (
    <div style={{padding: 10}}>
      {props.notification}
    </div>
  )
}

export const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.sort((a, b) =>  b.votes - a.votes).map(anecdote =>
        <div style={{marginTop: 10, border: 'solid', padding: 10, borderWidth: 1}} key={anecdote.id}>
          <div >
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button style={{marginLeft: 10}} onClick={ () => {dispatch(vote(anecdote))
                                                              dispatch(setNotification(`You voted '${anecdote.content}'`, 5, notification))} }>vote</button>                                   
          </div>
        </div>)}
    </div>
  )
}

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`${content} added`, 5)
  }
  
  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input style={{marginBottom: 10}} name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const Filter = (props) => {
  const addFilter = (event) => {props.changeFilter(event.target.value)}
  return (
    <div style={{marginBottom: 10}}>Filter: <input type="text"  name="filter" onChange={addFilter} /></div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  changeFilter,
  createAnecdote,
  setNotification
}

export const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export const ConnectedNotification = connect(mapStateToProps)(Notification)
export const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)



