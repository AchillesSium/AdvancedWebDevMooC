import React, { useState } from 'react'

export const Filter = (props) => {
    return (<div>Find contries: <input value={props.fil} onChange={e => props.setFil(e.target.value)}/></div>)
  }

export const Country = props => {
    const [show, setShow] = useState(false)

    const country = props.country
    return show ? <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>laguages</h2>
        <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img style={{height: 200, width: 200, display: 'block'}} src={country.flag} alt="Flag" />  
        <button onClick={() => setShow(false)}>hide</button>    
    </div> : <div>
        <p>{country.name}</p>
        <button onClick={() => setShow(true)}>show</button>
    </div>
}  