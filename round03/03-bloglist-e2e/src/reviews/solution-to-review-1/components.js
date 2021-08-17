import React, { useEffect, useState } from 'react'
import { login } from './services'
import PropTypes from 'prop-types'

export const LOCALSTORAGE_KEYS = {
  USER: 'user',
}

// Step 7: view and hide
export const Blog = ({ blog, onDelete, onLike, username }) => {
  const [expanded, setExpanded] = useState(false)

  const handleDelete = () => onDelete(blog)
  const handleLike = () => onLike(blog)
  const handleToggle = () => setExpanded(!expanded)

  return (
    <div
      style={{
        border: '2px solid black',
        margin: '1rem 0',
        padding: '0.5rem',
      }}
      className="blog"
      data-cy={`${blog.title}`}
    >
      {blog.title} {blog.author}{' '}
      <button onClick={handleToggle}
              className="view-blog">
        {expanded ? 'hide' : 'view'}
        </button>
      {expanded && (
        <div>
          {blog.url} <br />
          likes {blog.likes} <button onClick={handleLike} className="like-blog">like</button>
          <br />
          {blog.user.name}
          <br />
          {/* Step 10: delete*/}
          {username === blog.user.username && (
            <button
              style={{ backgroundColor: 'blue', color: 'white' }}
              onClick={handleDelete}
              className="delete-blog"
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// Step 11: proptypes for one component
Blog.propTypes = {
  blog: PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      passwordHash: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

// General use Components
const InputWithLabel = ({ label, name, ...props }) => {
  return (
    <label>
      {label || name}:
      <input name={name} {...props} />
    </label>
  )
}

// Step 4: notification
export const Notification = ({ text, success }) => {
  const successStyle = {
    backgroundColor: 'lightgray',
    border: '2px solid green',
    color: 'green',
  }
  const failStyle = {
    backgroundColor: 'lightgray',
    border: '2px solid red',
    color: 'red',
  }


  if (text) {
    return (
      <p style={success ? successStyle : failStyle}>
        {text}
      </p>
    )
  }
  return null
}

// Specific Components

// Step 3: add blog
export const BlogForm = ({ onSubmit, onCancel }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleInputChange = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(blog)
  }

  console.debug('CreateBlogForm state:', blog)

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} id="form__create-new-blog">
        <InputWithLabel
          name='title'
          type='text'
          value={blog.title}
          onChange={handleInputChange}
          required={true}
        />
        <br />
        <InputWithLabel
          name='author'
          type='text'
          value={blog.author}
          onChange={handleInputChange}
        />
        <br />
        <InputWithLabel
          name='url'
          type='text'
          value={blog.input}
          onChange={handleInputChange}
        />
        <br />
        {/* Step 5: toggle cancel */}
        <button type='button' onClick={onCancel}>
          cancel
        </button>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export const LoginForm = ({ setUser, notification, setNotification }) => {
  // Step 1: Login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.debug('Logging in.')
    login(username, password)
      .then((response) => {
        // Step 2: LocalStorage
        localStorage.setItem(
          LOCALSTORAGE_KEYS.USER,
          JSON.stringify(response.data)
        )
        setUser(response.data)
      })
      .catch(() => {
        console.debug('Login failed.')
        setNotification({ text: 'wrong username or password', success: false })
      })
  }

  useEffect(() => {
    // Step 2: Restore from localStorage
    const user = localStorage.getItem(LOCALSTORAGE_KEYS.USER)
    if (user) {
      try {
        setUser(JSON.parse(user))
      } catch (error) {
        localStorage.removeItem(LOCALSTORAGE_KEYS.USER)
      }
    }
  }, [])

  return (
    <>
      <h1>log in to application</h1>
      <Notification {...notification} />
      <form onSubmit={handleSubmit} id="form__login">
        <label>
          username
          <input
            name="username"
            type='text'
            autoComplete='off'
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label>
          password
          <input
            name="password"
            type='password'
            autoComplete='off'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button>login</button>
      </form>
    </>
  )
}
