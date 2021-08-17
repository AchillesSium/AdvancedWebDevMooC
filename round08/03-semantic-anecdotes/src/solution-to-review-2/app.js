
import React from 'react'
import { AnecdoteForm, AnecdoteList, Notification } from './components'
import 'semantic-ui-css/semantic.min.css'
import { Container, Divider } from 'semantic-ui-react'

export {default as store} from '../redux/store'

// ** enter commit sha of your repository in here **
export const commitSHA = '10eb4ada';

export const App = () => {
  return (
    <Container style={{
      padding: 5
    }}>
      <AnecdoteForm />
      <Divider hidden />
      <Notification />
      <AnecdoteList />
    </Container>
  )
}
