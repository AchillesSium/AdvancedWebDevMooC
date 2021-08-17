
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Button, Card, Container, Form, InputGroup, Modal, Nav, Navbar, FormControl  } from 'react-bootstrap'
import {Search} from 'react-bootstrap-icons'
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
    <Alert variant="success">
      
      <Alert.Heading>{notification.action}</Alert.Heading>
      <p>
        {`"${notification.anecdote}"`}
      </p>
    </Alert>
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

  const borderStyle = {
    borderColor: "white",
    borderRadius: "5px"
  }

  return (
    <div style={style}>
      <Button variant="primary" style={borderStyle} onClick={() => setOpen(true)}>New</Button>

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        backdrop="static"
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New anecdote</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control as="textarea" name="content" placeholder="Enter new anecdote ..." />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">Create</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
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
    <>
      {anecdotes.map(anecdote =>
        <Card style={{ marginTop: 5 }}>
          <Card.Body>
            <Card.Title>{anecdote.content}</Card.Title>
            <Card.Text>
              {anecdote.votes} Votes
              <Button variant="outline-primary" onClick={handleVoteClick(anecdote.id, anecdote.content)}>vote</Button>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
    // <div style={{ marginTop: 5 }}>
    //   {anecdotes.map(anecdote =>
    //     <div key={anecdote.id}>
    //       <div>
    //         {anecdote.content}
    //       </div>
    //       <div>
    //         has {anecdote.votes}
    //         <button onClick={handleVoteClick(anecdote.id, anecdote.content)}>vote</button>
    //       </div>
    //     </div>
    //   )}
    // </div>
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
    <div style={style}>
      {/* filter <input onChange={handleChange} /> */}
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-default"><Search /></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="inputGroup-sizing-default"
          onChange={handleChange}
        />
      </InputGroup>
    </div>
  )
}
