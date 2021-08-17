
import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from './gql'

const Books = (props) => {
  const booksQuery = useQuery(ALL_BOOKS, {
    pollInterval: 2000  
  })

  if (!props.show) {
    return null
  }

  if (booksQuery.loading)  {
    return <div>loading...</div>
  }

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
          {booksQuery.data.allBooks.map(a =>
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