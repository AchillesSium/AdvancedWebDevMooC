import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from './gql'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => {
      //setError(error.graphQLErrors[0])
      console.log('err:',error)
    }
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const setAuthor = async (event) => {
    event.preventDefault()
    
    const setToBorn = parseInt(born);
    console.log('update author...',{ name, setToBorn })
    updateAuthor({
      variables: { name, setToBorn }
    })

    setName('')
    setBorn('')
  }

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
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <div>
        <div>
          name
          <select name="authors"
                  onChange={({ target }) => setName(target.value)}>
            {authors.map(a => 
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}/>
          <div>
            <button onClick={setAuthor} type="button">update author</button>
          </div>
        </div>
      </div> 

    </div>
  )
}

export default Authors