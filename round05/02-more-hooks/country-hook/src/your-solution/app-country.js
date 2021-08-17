import React, { useState, useEffect } from 'react'
import axios from 'axios'

// ** enter commit sha of your repository in here **
export const commitSHA = 'a26cedd3131ca8b05fb95e21bcfa06f5604032c3';


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const countryUrl = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`

  useEffect(() => {
    if (name === '') {
      return
    } else {
      axios.get(countryUrl)
        .then((response) => {
          setCountry(response)
        })
        .catch((error) => {
          console.log('Country not found', error)
          setCountry({status: error.status})
        })
    }
  }, [countryUrl, name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.status != 200) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (country.data.map((country, i) => <CountryList country={country}/>))
  
}

const CountryList = ({ country }) => {
  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

export const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

