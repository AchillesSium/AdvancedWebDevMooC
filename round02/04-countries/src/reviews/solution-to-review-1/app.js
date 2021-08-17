import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Filter, Country} from './components'
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '915eba9';
// ------------------------------------------------------------ //

const url = 'https://restcountries.eu/'

export async function fetchData(){
    const response = await axios.get(url+"rest/v2/all")
    return response
}

export const App = () => {
  const [reset, setReset] = useState(0)
  useEffect(async () => {
   const response = await fetchData()
   setData(response.data)
   console.log(response.data)
  }, [reset]);
  const [data, setData] = useState()
  const [ fil, setFil ] = useState('')
  let renderData = data ? data.filter(country => (country.name.toLowerCase()).includes(fil)) : []
  return (
    <div>
      <Filter fil={fil} setFil={setFil}/>
      {renderData.length > 10 && <p>Too many matches</p>}
      {(renderData.length < 10 && renderData.length > 1) && renderData.map(country => <Country key={country.name} country={country}/>)}
    </div>
  );
}

