
import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import {CURRENT_USER, ALL_BOOKS} from './gql'

const Books = (props) => {
  const [genre, setgenre] = useState(null)
  const currentUserResult = useQuery(CURRENT_USER)
  const booksResult = useQuery(ALL_BOOKS)
  if (!props.show ) {
    return null
  }

  if(!props.show && !props.remomendedBooks){
    return null
  }

  if (booksResult.loading)  {
    return <div>loading...</div>
  }
  if (currentUserResult.loading)  {
    return <div>loading...</div>
  }
  var books = booksResult.data.allBooks

  
  var booksCopy = booksResult.data.allBooks
  var genres = []

  booksCopy.map(b => b.genres.map(g => (!genres.includes(g) ? genres.push(g) : console.log(g))))

  if(props.remomendedBooks){
    var currentUser = currentUserResult.data.me
    const favoriteGenre = currentUser.favoriteGenre
    var currentBooks = []
    books.map(b => b.genres.includes(favoriteGenre) ? currentBooks.push(b) : console.log('asdasdf',b.genres))
    books = currentBooks
    return (
      <div>
        <h2>recommendations</h2>
        books in your favorite genre <b>pattern</b>
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

  const booksView = (bookss) => {
    return (
      <div>
        <h2>books</h2>
        books in genre <b>pattern</b>
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
            {bookss.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          {
            genres.map((g,index) => {
              return(<button key={index} onClick={() => {setgenre(genres[index])}}>{g}</button>)
            })
          }
          <button onClick={() => {setgenre(null)}}>see all</button>
        </div>
      </div>
    )
  }

  if(!genre){
    return(booksView(booksCopy))
  }else{
    var currentBooks = []
    booksCopy.map(b => b.genres.includes(genre) ? currentBooks.push(b) : console.log('asdasdf',b.genres))
    books = currentBooks
    return(booksView(books))
  }
  
}

export default Books