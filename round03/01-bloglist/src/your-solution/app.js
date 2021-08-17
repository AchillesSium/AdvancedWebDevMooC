import React, { useState, useEffect } from 'react'
import { Blog, NewBlog, Notification, LoginForm, Togglable } from './components'
import blogService from './services'
import './styles.css'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '3d7052128727c3a133fd34e1b0df060ae5f4bdce'
// ------------------------------------------------------------ //


export const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes)))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await blogService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong user name or password')
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const reloadBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes)))
    )
  }

  const handleLikes = async (event) => {
    event.preventDefault()
    const id = event.target.value
    var blog = blogs.filter(obj => {
      return obj.id === parseInt(id)
    })[0]
    try {
      const b = await blogService.addLike({
        'title': blog.title,
        'author': blog.author,
        'url': blog.url,
        'likes': blog.likes + 1,
        'userId': user.id,
        'id': id,
      })
      console.log(b)
      setErrorMessage(`You liked ${blog.title} by ${blog.author}`)
      setMessageType('confirmation')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      reloadBlogs()
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Can not add like')
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    const id = event.target.value
    var blog = blogs.filter(obj => {
      return obj.id === parseInt(id)
    })[0]

    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      try {
        const b = await blogService.deleteBlog({
          'title': blog.title,
          'author': blog.author,
          'url': blog.url,
          'likes': blog.likes,
          'userId': user.id,
          'id': id,
        })
        console.log(b)
        setErrorMessage(`Removed ${blog.title} by ${blog.author}`)
        setMessageType('error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        reloadBlogs()
      } catch (exception) {
        console.log(exception)
        setErrorMessage('Can not add like')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const maxId = Math.max.apply(Math, blogs.map(function(o) { return o.id })) + 1
    try {
      const blog = await blogService.newBlog({
        'title': title,
        'author': author,
        'url': url,
        'likes': 0,
        'userId': user.id,
        'id': maxId,
      })
      console.log(blog)
      setErrorMessage(`a new blog ${title} added by ${author}`)
      setMessageType('confirmation')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      reloadBlogs()
    } catch (exception) {
      setErrorMessage('Can not create new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if(user === null){
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} messageType={messageType} />
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} messageType={messageType} />
      <div>
        {user.name} is logged in
        <button onClick={handleLogout}>logout</button>
        <div>
          <Togglable buttonLabel='create'>
            <NewBlog handleNewBlog={handleNewBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
          </Togglable>
        </div>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}