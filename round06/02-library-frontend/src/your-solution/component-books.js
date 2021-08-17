
import React from 'react'
import { useQuery } from '@apollo/client';

import {ALL_AUTHORS, ALL_BOOKS} from './gql'

const Books = (props) => {
  const authorsResult = useQuery(ALL_AUTHORS, {
    pollInterval: 2000  })
  const booksResult = useQuery(ALL_BOOKS, {
    pollInterval: 2000  })
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
  console.log(authors)

  authors = authors.map((author) => ({
    ...author,
    bookCount: books.filter(book => book.author === author.name).length
  }))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books