import { Button, Container, Divider, Form, Grid, Header, Icon,
  Image, Input, Message, Segment } from 'semantic-ui-react'

export const Filter = ({ value, handleChange }) =>
  <p>
    <Input icon='search' placeholder='Find Countries ...' value={value} onChange={handleChange}/>
  </p>


export const Countries = ({ countries, handleCountryClick, filterText }) => {

  if(filterText === ' ' || filterText.length === 0){
    return (
      <div><Segment secondary>Enter Search criteria</Segment></div>
    )
  }

  if (countries.length > 10) {
    return (
      <div><Segment secondary>Too many matches, specify another filter</Segment></div>
    )
  }

  if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  }

  return (
    <Button.Group vertical>
      {countries.map(country =>
        <CountryName
          key={country.alpha2Code}
          country={country}
          handleClick={handleCountryClick}
        />
      )}
    </Button.Group>
  )

}

const CountryDetails = ({ country }) => {
  var languages = [];
  country.languages.map(language => languages.push(language.name))
return (
    <Segment>

      <Header size="large"><Image src={country.flag} alt={`${country.name} flag`} width="100" />{country.name}</Header>

      <Segment>
        <div><Header as="small">Capital</Header>
        <Segment textAlign='left'> {country.capital} </Segment></div><br/>

        <div><Header as="small">Population</Header>
        <Segment textAlign='left'> {country.population} </Segment></div><br/>

        <div><Header as="small">Languages</Header>
        <Segment textAlign='left'> 
          {/* <ul>
            {country.languages.map(language =>
              <li key={language.iso639_1}>{language.name}</li>
            )}
          </ul> */}
          {languages.join(', ')}
      </Segment></div>
      </Segment>

    </Segment>
  )
}


const CountryName = ({ country, handleClick }) =>
  <div>
    <Button value={country.name} onClick={handleClick}>{country.name}</Button>
  </div>

