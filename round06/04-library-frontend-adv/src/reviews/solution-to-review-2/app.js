
import React, { useState } from 'react'
import { useQuery, useSubscription, useApolloClient,
} from '@apollo/client'

import Authors from './component-authors'
import Books from './component-books'
import NewBook from './component-new-book'
import LoginForm from './component-login-form'
import Recommendations from './component-recommendations'
import { ALL_USERS, BOOK_ADDED } from './gql'

// ** enter commit sha of your repository in here **
export const commitSHA = '42bad82';


export const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [username, setAppUsername] = useState('')
  const result = useQuery(ALL_USERS)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      //console.log(JSON.stringify(addedBook))
      window.alert('Added Book: ' + JSON.stringify(addedBook))
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const users = result.data.allUsers
  const currentUser = token && users.find(user => user.username === username)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token 
          ? <button onClick={() => logout()}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>}
        <button onClick={() => setPage('recommendations')}>recommendations</button>  
      </div>

      <Authors 
        show={page === 'authors'}
      />
      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add'}
      />
      <LoginForm
        show={page === 'login'} token={token} setToken={setToken} setAppUsername={setAppUsername}
      />
      <Recommendations 
        show={page === 'recommendations'} token={token} currentUser={currentUser}
      />
    </div>
  )
}
