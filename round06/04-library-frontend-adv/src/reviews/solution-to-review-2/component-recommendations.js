
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './gql'


const Recommendations = ({ show, currentUser }) => {
  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <em>{currentUser && currentUser.favoriteGenre}</em>
      </div>
      
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
          {books
          .filter(b => !currentUser || !currentUser.favoriteGenre 
            || currentUser.favoriteGenre.length === 0
            || b.genres.includes(currentUser.favoriteGenre)    
          ).map(a =>
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

export default Recommendations
