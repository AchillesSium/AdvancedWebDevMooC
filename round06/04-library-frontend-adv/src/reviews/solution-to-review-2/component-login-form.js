
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './gql'

const LoginForm = ({ show, token, setToken, setAppUsername }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
      //setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const tokeni = result.data.login.value
      setToken(tokeni)
      window.localStorage.setItem('library-user-token', tokeni)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    setAppUsername(username)
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')     
  }

  if (!show) return null

  if (token) {
    return (
      <div>
        <h2>User logged in</h2>
      </div>  
    )
  }

  return (
    <div>
      <h2>login</h2>

      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
