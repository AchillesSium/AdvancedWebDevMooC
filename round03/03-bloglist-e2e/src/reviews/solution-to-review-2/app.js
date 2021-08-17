import React, { useState, useEffect } from 'react'
import { Blog, Notification, Login, BlogForm } from './components'
import blogService from './services'
import loginService from './services'
import noteService from './services'
import PropTypes from 'prop-types'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '9c6ea7e'
// ------------------------------------------------------------ //


export const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({})
  const [infoVisible, setInfoVisible] = useState(false)
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const getBlogs = async () => {
    const fetchedBlogs = await blogService.getAll()
    fetchedBlogs.sort((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(fetchedBlogs)
    return fetchedBlogs
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) 
    {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return(
      <form onSubmit={handleLogin}>
        <h1>log in to application</h1>
        <div>
        username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const addBlog = (event) => {
    event.preventDefault()

    const noteObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0
    }

    blogService
      .create(noteObject)
      .then(returnedNote => {
        let content = returnedNote
        let id = returnedNote.id
        content['id'] = id
        content['userId'] = returnedNote.userId
        setBlogs(blogs.concat(content))
        setNewBlog('')
        event.target.reset()
      })
  }

  const handleBlogChange = (event) => {
    event.preventDefault()
    setNewBlog((oldBlog) => ({
      ...oldBlog,
      [event.target.name]: event.target.value,
    }))
  }

  const addLike = async (blog) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService.update(blog.id, updatedBlog)
    getBlogs()
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      const id = blog.id
      blogService.remove(id)
      setBlogs(blogs.filter(item => item.id !== id))
    }
  }
  const show = () => {
    setInfoVisible(true)
  }

  const content = () => (
    <div>
      <Login user={user}/>
      <button name="createNewBlog" onClick={() => show()}>create new blog</button>
      <div style={showWhenVisible}>
        <BlogForm addBlog={addBlog} handleBlogChange={handleBlogChange} setInfoVisible={setInfoVisible}/>
      </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike = {addLike} remove = {deleteBlog} />
      )}
    </div>
  )
  return (
    <div>
      <Notification message = {errorMessage} />
      {user === null ?
        loginForm() :
        content()
      }
    </div>
  )
}

