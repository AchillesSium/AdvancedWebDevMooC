import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Image,
  Message,
  Segment
} from "semantic-ui-react"

export const Filter = ({ value, handleChange }) =>
  <>
    <Header size="medium" icon={true}>
      <Icon name="search" />
      Find Country
    </Header>
    <Form>
      <Form.Field>
        <Input
          value={value}
          onChange={handleChange}
          placeholder="Search countries..."
          icon={{ name: "search", circular: true }} />
      </Form.Field>
    </Form>
  </>


export const Countries = ({ countries, handleCountryClick }) => {

  if (countries.length > 10) {
    return (
      <Message>Too many matches, specify another filter</Message>
    )
  }

  if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  }

  return (
    <Button.Group basic={true} vertical={true}>
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

const CountryDetails = ({ country }) =>
  <Segment>
    <Header as="h2">
      <Image src={country.flag} alt={`${country.name} flag`} width="100" />
      {country.name}
    </Header>

    <Form>
      <Form.Field>
        <label>Capital</label>
        <Input value={country.capital} />
      </Form.Field>
      <Form.Field>
        <label>Population</label>
        <Input value={country.population} />
      </Form.Field>
      <Form.Field>
        <label>Languages</label>
        <Input value={country.languages.map(language => language.name).join(", ")} />
      </Form.Field>
    </Form>
  </Segment>


const CountryName = ({ country, handleClick }) =>
  <Button value={country.name} onClick={handleClick}>
    {country.name}
  </Button>
