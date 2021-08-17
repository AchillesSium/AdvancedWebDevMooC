
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, Card, Container, Form, InputGroup, Modal, Nav, Navbar, Search  } from 'react-bootstrap'
import React from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
export {default as store} from '../redux/store'

// ** enter commit sha of your repository in here **
export const commitSHA = 'dc89805adae4b6f622abcd5c2d80dcfeabc92739';

export const App = () => {
  return (
    <Container>
      <br />
       <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Anecdotes</Navbar.Brand>
        <Nav className="mr-auto">
          <AnecdoteForm />
        </Nav>
        <Form inline>
          <Filter />
        </Form>
      </Navbar>
      <br />
      <Notification />
      
      <AnecdoteList />
    </Container>
  )
}
