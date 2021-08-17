
import 'semantic-ui-css/semantic.min.css';
import {  Button, Card, Container, Divider, Input, Menu, Message, Modal, TextArea, Segment, Header, Grid } from 'semantic-ui-react'
import React from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
export {default as store} from '../redux/store'

// ** enter commit sha of your repository in here **
export const commitSHA = 'de47b5b3c99f450bc5643cecc3470826134d210e';

export const App = () => {
  return (
    <Container>
      <Segment raised>
        <Grid columns='equal'>
          <Grid.Column width='2'>
          <Header size="large">Anecdotes</Header>
          </Grid.Column>
          <Grid.Column>
          <AnecdoteForm />
          </Grid.Column>
          <Grid.Column width='4'>
          <Filter />
          </Grid.Column>
        </Grid>
      </Segment>
      <Notification /> 
      <AnecdoteList />
    </Container>
  )
}
