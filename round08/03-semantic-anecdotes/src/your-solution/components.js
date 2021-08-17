
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  Button, Card, Container, Divider, Input, Menu, Message, Modal, TextArea, Segment, Header, Grid, Icon } from 'semantic-ui-react'
import { addAnecdote, voteAnecdote } from '../redux/reducer-anecdote'
import { setNotification, clearNotification } from '../redux/reducer-notification'
import { setFilter } from '../redux/reducer-filter'

//
// Notification
//

export const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification.length ? 'block' : 'none'
  }

  if(!notification) {
    return (<></>)
  }

  return (
    <Message>
    <Message.Header>{notification.action}</Message.Header>
    <p>
    {`"${notification.anecdote}"`}
    </p>
  </Message>
  )
}

//
// AnecdoteForm
//

export const AnecdoteForm = () => {

  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    const anecdote = e.target.content.value
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification({action: 'You added', anecdote: anecdote}))
    setTimeout(() => dispatch(clearNotification()), 5000)
    e.target.content.value = ''
    setOpen(false)
  }

  const style = {
    marginTop: 5,
    marginBottom: 5,
  }

  return (
    // <div style={style}>
    //   <form onSubmit={handleSubmit}>
    //     <input name='content' />
    //     <button>create</button>
    //   </form>
    // </div>
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button color="green" basic>New</Button>}
    >
      <Modal.Header>New Anecdote</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <Modal.Description>
          <TextArea placeholder='Enter new anecdote ...' name='content' style={{width:'100%', minHeight: 100}}></TextArea>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button floated='right' basic color="green" type='submit'><Icon name='checkmark' /> Create</Button>
          <Button floated='right' basic color="gray" onClick={() => setOpen(false)}><Icon name='remove' /> Cancel</Button>
        </Modal.Actions>
      </form>
    </Modal>
  )

}

//
// AnecdoteList
//

export const AnecdoteList = () => {

  const filter = useSelector(state => state.filter).toLowerCase()

  const anecdotes = useSelector(state => state.anecdotes)
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter))

  const dispatch = useDispatch()

  const notify = anecdote => {
    dispatch(setNotification({action: 'You voted',anecdote: anecdote}))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const handleVoteClick = (id, anecdote) => () => {
    dispatch(voteAnecdote(id))
    notify(anecdote)
  }

  return (
    <div style={{ marginTop: 5 }}>
      {anecdotes.map(anecdote =>
        <Segment.Group raised>
          <Segment>
            {anecdote.content}
          </Segment>
          <Segment>
            {anecdote.votes} votes
          </Segment>
          <Segment>
            <Button basic color="green" onClick={handleVoteClick(anecdote.id, anecdote.content)}>Vote</Button>
          </Segment>
        </Segment.Group>
      )}
    </div>
  )
}

//
// Filter
//

export const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <Input icon="search" placeholder="Search ..." onChange={handleChange} />
  )
}
