
import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './component-authors'
import Books from './component-books'
import NewBook from './component-new-book'
import LoginForm from './component-login-form'
import Notify from './component-notify'

// ** enter commit sha of your repository in here **
export const commitSHA = '02af6a18';


export const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  // If user is not logged in.
  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Notify errorMessage={errorMessage} />
  
        <Authors
          show={page === 'authors'} token={null} setErrorMessage={setErrorMessage}
        />
  
        <Books
          show={page === 'books'}
        />
  
        <LoginForm
          show={page === 'login'} setToken={setToken} setErrorMessage={setErrorMessage}
        />
  
      </div>
    )
  }

  // If token is found.
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'} token={token} setErrorMessage={setErrorMessage}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}
