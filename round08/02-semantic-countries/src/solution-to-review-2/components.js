import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Message,
  Segment
} from "semantic-ui-react";

export const Filter = ({ value, handleChange }) =>
  <Grid.Column>
    <Header as='h3' icon>
      <Icon name='search' />
      Find Country
    </Header>
    <Container>
      <Input value={value}
            onChange={handleChange}
            placeholder="Search countries..."
            icon={{ name: 'search', circular: true, link: true }}
      />
    </Container>
  </Grid.Column>


export const Countries = ({ filter, countries, handleCountryClick }) => {

  if (filter.length === 0) {
    return (
      <Grid.Column>
        <Message>Enter search criteria</Message>
      </Grid.Column>
    )
  }

  if (countries.length > 10) {
    return (
      <Grid.Column>
        <Message>Too many matches, enter more specific search criteria</Message>
      </Grid.Column>
    )
  }

  if (countries.length === 1) {
    return (
      <Grid.Column>
        <CountryDetails country={countries[0]} />
      </Grid.Column>
    )
  }

  return (
    <Grid.Column>
      <Button.Group basic vertical>
        {countries.map(country =>
          <CountryName
            key={country.alpha2Code}
            country={country}
            handleClick={handleCountryClick}
          />
        )}
      </Button.Group>
    </Grid.Column>
  )

}

const CountryDetails = ({ country }) =>
  <Segment.Group>
    <Header as="h2">
      <Image src={country.flag} alt={`${country.name} flag`} />
      {country.name}
    </Header>
    <Header as="h5">Capital</Header>
    <Segment>{country.capital}</Segment>
    <Header as="h5">Population</Header>
    <Segment>{country.population}</Segment>
    <Header as="h5">Languages</Header>
    <Segment>
      {country.languages.map(language => language.name).join(", ")}
    </Segment>

  </Segment.Group>


const CountryName = ({ country, handleClick }) =>
  <div>
    <Button value={country.name} onClick={handleClick}>{country.name}</Button>
  </div>

