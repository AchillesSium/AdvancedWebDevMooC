
import React, { useState } from 'react'

import Authors from './component-authors'
import Books from './component-books'
import Notify from './component-notify'
import NewBook from './component-new-book'
import LoginForm from './component-login-form'
import { useApolloClient } from '@apollo/client';

// ** enter commit sha of your repository in here **
export const commitSHA = '1eaa3a6afcec98bd12c6d49f8e64596171b0feb1';


export const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, seterror] = useState('')
  const client = useApolloClient()

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore() 
    setPage('authors') 
  }

  if(!token){
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Notify
          errorMessage={error}
        />
  
        <Authors
          show={page === 'authors'}
        />
  
        <Books
          show={page === 'books'}
        />
  
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={seterror}
          setPage={setPage}
        />
  
      </div>
    )
  }else{
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendedbooks')}>recommended</button>
          <button onClick={() => logout()}>logout</button>
        </div>

        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
          remomendedBooks={false}
        />

        <NewBook
          show={page === 'add'}
        />

        <Books 
          show={page === 'recommendedbooks'}
          remomendedBooks={true}
        />

      </div>
    )
  }
}
