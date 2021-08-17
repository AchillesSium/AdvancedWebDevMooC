import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_BIRTHYEAR } from './gql'

const Authors = ( { show, token, setErrorMessage } ) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const authorsQuery = useQuery(ALL_AUTHORS, {
    pollInterval: 2000  
  })

  const [ editBirthyear, result ] = useMutation(EDIT_BIRTHYEAR)

  useEffect(() => {
    if (result.data && result.data.editBirthyear === null) {
      setErrorMessage('error happened')
    }
  }, [result.data])  // eslint-disable-line 

  const submit = async (event) => {
    event.preventDefault()
    
    try {
      editBirthyear({ variables: {name, birthYear} })
    }
    catch(error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    setName('')
    setBirthYear('')
  }

  if (!show) {
    return null
  }

  if (authorsQuery.loading)  {
    return <div>loading...</div>
  }

  // If user is logged in.
  if (token) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authorsQuery.data.allAuthors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
  
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authorsQuery.data.allAuthors.map(a =>
              <option value={a.name} key={a.name}>{a.name}</option>
            )}
          </select>
          <div>
            born
            <input value={birthYear}
              type='number'
              onChange={({ target }) => setBirthYear(parseInt(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
  }
  // If no token is set.
  else {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authorsQuery.data.allAuthors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Authors