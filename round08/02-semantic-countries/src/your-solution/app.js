import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Divider, Form, Grid, Header, Icon,
  Image, Input, Message, Segment } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, Countries } from './components'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE
export const commitSHA = '8e3c319bc0beb9ecee0a08f1876f709ad3a06237';

export const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = ({ target }) => {
    setFilter(target.value)
  }

  const handleCountryClick = ({ target }) => {
    setFilter(target.value)
  }

  const countriesToShow = filter.length
    ? countries.filter(country => country.name.match(new RegExp(filter, 'i')))
    : countries

  return (
    <div>
      <Container>
        <Segment placeholder>
          <Grid textAlign='center' columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Header icon>
                  <Icon name='search' />
                  Find Country
                </Header>
                <Filter value={filter} handleChange={handleFilterChange} />
              </Grid.Column>
              <Grid.Column>
                <Countries
                  countries={countriesToShow}
                  handleCountryClick={handleCountryClick}
                  filterText={filter}
                />
            </Grid.Column>
            </Grid.Row>
          </Grid>
        </ Segment>
      </Container>
    </div>
  )

}
