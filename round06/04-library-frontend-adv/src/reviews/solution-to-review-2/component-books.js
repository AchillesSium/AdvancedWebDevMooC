import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './gql'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  const genres = ['agile', 'classic', 'crime', 'design', 'patterns', 'refactoring', 'revolution', 'all genres']

  const setCurrentGenre = async (evtValue) => {
    setGenre(evtValue)
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <em>{genre.toUpperCase()}</em>
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
          .filter(b => 
            genre.length === 0 || genre === 'all genres' || b.genres.includes(genre)    
          ).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div> </div>      
      <div>
        {genres.map(currGenre => 
          <button onClick={() => setCurrentGenre(currGenre)} type="button" key={currGenre}>{currGenre}</button>
        )}
      </div>      

    </div>
  )
}

export default Books