import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';


import {ALL_AUTHORS, ALL_BOOKS, UPDATE_BIRTHYEAR} from './gql'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authorsResult = useQuery(ALL_AUTHORS, {
    pollInterval: 2000  })
  const booksResult = useQuery(ALL_BOOKS, {
    pollInterval: 2000  })

  const [ changeBirthyear ] = useMutation(UPDATE_BIRTHYEAR)
  if (!props.show) {
    return null
  }

  if (authorsResult.loading)  {
    return <div>loading...</div>
  }

  if (booksResult.loading)  {
    return <div>loading...</div>
  }

  var authors = authorsResult.data.allAuthors
  var books = booksResult.data.allBooks

  authors = authors.map((author) => ({
    ...author,
    bookCount: books.filter(book => book.author === author.name).length
  }))

  const updateAuthor = async (event) => {
    event.preventDefault()

    const br = parseInt(`${born}`)
    changeBirthyear({ variables: { name, br } })

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
      <h2>Set birthyear</h2>
      <div>
      <form onSubmit={updateAuthor}>
        <div>
          name
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map(a =>
              <option key= {a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
    </div>
  )
}

export default Authors