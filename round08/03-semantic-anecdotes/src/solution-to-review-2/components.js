
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon, Input, TextArea, Button, Message, Modal, Menu } from 'semantic-ui-react'

import { addAnecdote, voteAnecdote } from '../redux/reducer-anecdote'
import { setNotification, clearNotification } from '../redux/reducer-notification'
import { setFilter } from '../redux/reducer-filter'

//
// Notification
//

export const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    display: notification.length ? 'block' : 'none'
  }

  const splits = notification.split('\"')

  return (
    <Message style={style}>
      <Message.Header>{splits[0]}</Message.Header>
      <p>
        "{splits[1]}"
      </p>
    </Message>
  )
}

//
// AnecdoteForm (contains filter)
//

export const AnecdoteForm = () => {
  const [open, setOpen] = React.useState(false)
  const [newAnecdote, setNewAnecdote] = React.useState("")

  const dispatch = useDispatch()

  const notify = anecdote => {
    dispatch(setNotification(`You added "${anecdote}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpen(false)
    dispatch(addAnecdote(newAnecdote))
    notify(newAnecdote)
    setNewAnecdote("")
  }

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  const handleNewAnecdoteChange = (event) => {
    setNewAnecdote(event.target.value)
  }

  return (
    <Menu borderless>
      <Menu.Item header>
        Anecdotes
      </Menu.Item>
      <Menu.Item>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button basic color='green'>New</Button>}
        >
          <Modal.Header>New anecdote</Modal.Header>
          <Modal.Content>
            <TextArea 
              name='content'
              onChange={handleNewAnecdoteChange}
              rows={2} 
              style={{
                minWidth: "100%",
              }}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='grey' onClick={() => setOpen(false)}>
              <Icon name='remove' />
              Cancel
            </Button>
            <Button
              basic
              color='green'
              onClick={handleSubmit}
              positive>
              <Icon name='checkmark' />
              Create
            </Button>
          </Modal.Actions>
        </Modal>
      </Menu.Item>
      <Menu.Item position='right'>
        <Input 
          size='small' icon={{ name: 'search', circular: true }}
          onChange={handleChange}
          focus 
          placeholder='Search...' 
        />
      </Menu.Item>
    </Menu>
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
    dispatch(setNotification(`You voted "${anecdote}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const handleVoteClick = (id, anecdote) => () => {
    dispatch(voteAnecdote(id))
    notify(anecdote)
  }

  return (
    <Card.Group>
      {anecdotes.map(anecdote =>
        <Card fluid key={anecdote.id}>
          <Card.Content>
            {anecdote.content}
          </Card.Content>
          <Card.Content extra>
            {anecdote.votes} votes
          </Card.Content>
          <Card.Content extra>
            <Button onClick={handleVoteClick(anecdote.id, anecdote.content)} basic color='green' content='Green'>vote</Button>
          </Card.Content>
        </Card>
      )}
    </Card.Group>
  )
}