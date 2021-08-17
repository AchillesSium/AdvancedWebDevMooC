import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Divider,
  Header,
  Form,
  Modal,
  Segment,
  Button,
  Input,
  TextArea,
  Icon,
  Card,
} from "semantic-ui-react"
import { addAnecdote, voteAnecdote } from "../redux/reducer-anecdote"
import {
  setNotification,
  clearNotification,
} from "../redux/reducer-notification"
import { setFilter } from "../redux/reducer-filter"

//
// Notification
//

export const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification.length ? "block" : "none",
  }
  return (
    <Card style={style}>
      {/* render here notification... */}
      {notification}
    </Card>
  )
}

//
// AnecdoteForm
//

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(e.target.content.value))
    e.target.content.value = ""
  }

  const style = {
    marginTop: 5,
    marginBottom: 5,
  }

  return (
    <div style={style}>
      <form onSubmit={handleSubmit}>
        <Input name='content' />
        <Button>create</Button>
      </form>
    </div>
  )
}

export const AnecdoteModal = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    console.log(e.target.content.value)
    e.preventDefault()
    dispatch(addAnecdote(e.target.content.value))
    dispatch(setNotification(`you added "${e.target.content.value}"`))
    e.target.content.value = ""
    setOpen(false)
  }

  const style = {
    marginTop: 5,
    marginBottom: 5,
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      as={Form}
      onSubmit={(event) => handleSubmit(event)}
      trigger={
        <Button basic color='green'>
          New
        </Button>
      }
    >
      <Modal.Header>New Anecdote</Modal.Header>
      <Modal.Content>
        <div style={style}>
          <TextArea name='content' />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button type='submit' color='green'>
          <Icon name='checkmark' /> Create
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

//
// AnecdoteList
//

export const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter).toLowerCase()

  const anecdotes = useSelector((state) => state.anecdotes).filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter)
  )

  const dispatch = useDispatch()

  const notify = (anecdote) => {
    dispatch(setNotification(`you voted "${anecdote}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const handleVoteClick = (id, anecdote) => () => {
    dispatch(voteAnecdote(id))
    notify(anecdote)
  }

  return (
    <div style={{ marginTop: 5 }}>
      {anecdotes.map((anecdote) => (
        <Segment.Group key={anecdote.id} style={{ width: "100%" }}>
          <Segment>{anecdote.content}</Segment>
          <Segment>{anecdote.votes} votes</Segment>
          <Segment>
            <Button
              onClick={handleVoteClick(anecdote.id, anecdote.content)}
              basic
              color='green'
            >
              vote
            </Button>
          </Segment>
        </Segment.Group>
      ))}
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
    marginBottom: 10,
  }

  return (
    <div style={style}>
      <Input onChange={handleChange} icon='search' placeholder='Search...' />
    </div>
  )
}

///
/// Filter and AnecdoteForm combined component
///

export const AnecdoteHeader = () => {
  const style = {
    width: "100%",
    display: "flex"
  }
  return (
    <Segment style={style}>
      <div>
        Anecdotes <AnecdoteModal />
      </div>
      <Filter floated='right' />
    </Segment>
  )
}
