
import React, { useState } from 'react'

import Authors from './component-authors'
import Books from './component-books'
import NewBook from './component-new-book'

import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR } from "./gql" 

// ** enter commit sha of your repository in here **
export const commitSHA = 'b440cbc';


export const App = () => {
  const [page, setPage] = useState('authors')
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  console.log('app aut')
  console.log(authors.data)
  const handleError = (error) => {
    console.log('error: ', error);
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} result={authors} editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'} result={books}
      />

      <NewBook
        show={page === 'add'} addBook={addBook}
      />

    </div>
  )
}
