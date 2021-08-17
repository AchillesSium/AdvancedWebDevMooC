import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const Blog = ({ blog, handleLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <TogglableBlog buttonLabel='view' blog={blog} handleLikes={handleLikes} deleteBlog={deleteBlog}>
        </TogglableBlog>
      </div>
    </div>
  )}

export const NewBlog = (props) => (
  <div>
    <h2>Create New</h2>
    <form onSubmit={props.handleNewBlog}>
      <div>
        title
        <input
          type="text"
          value={props.title}
          name="title"
          onChange={({ target }) => props.setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={props.author}
          name="author"
          onChange={({ target }) => props.setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={props.url}
          name="url"
          onChange={({ target }) => props.setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}


export const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? '' : 'none' }
  const showWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.prototype = {
  buttonLabel: PropTypes.string.isRequired
}

export const TogglableBlog = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {props.blog.title}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.blog.title}
        <button onClick={toggleVisibility}>hide</button><br/>
        {props.blog.url}<br/>
        Likes: {props.blog.likes} <button type="button" value={props.blog.id} onClick={props.handleLikes}>Like</button><br/>
        {props.blog.author}<br/>
        <button type="button" value={props.blog.id} onClick={props.deleteBlog}>remove</button>
      </div>
    </div>
  )
}