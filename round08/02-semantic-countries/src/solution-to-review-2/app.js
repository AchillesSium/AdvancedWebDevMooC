import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, Countries } from './components'
import { Container, Segment, Grid, Divider } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE
export const commitSHA = '4f8c063';

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
    <Container>
      <Divider hidden />
      <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
          <Grid.Row verticalAlign='middle'>
            <Filter value={filter} handleChange={handleFilterChange} />
            <Countries
              filter={filter}
              countries={countriesToShow}
              handleCountryClick={handleCountryClick}
            />
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )

}
