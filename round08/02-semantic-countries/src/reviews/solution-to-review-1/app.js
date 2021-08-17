

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, Countries } from './components'
import { Grid, Segment } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css"

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE
export const commitSHA = '64290cf';

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
    <Segment placeholder>
      <Grid columns={2} verticalAlign="middle">
        <Grid.Column textAlign="center">
          <Filter value={filter} handleChange={handleFilterChange} />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Countries
            countries={countriesToShow}
            handleCountryClick={handleCountryClick}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )

}
