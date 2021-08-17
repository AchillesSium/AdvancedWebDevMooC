import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const Blog = ({ blog, likesUpdate, deleteHandle }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div className="summary" style={hideWhenVisible}>
        <p><span className="summaryName">{blog.title + ' ' +blog.author}</span><button className="viewButton" onClick={() => setVisible(!visible)}>view</button></p>
      </div>
      <div className="detail" style={showWhenVisible}  >
        <p>{blog.title}<button onClick={() => setVisible(!visible)}>hide</button></p>
        <p>{blog.url}</p>
        <p>Likes : {blog.likes ? blog.likes : 0} <button className='likeButton' onClick={likesUpdate}>like</button></p>
        <p>{blog.author} </p>
        <button onClick={deleteHandle}>Remove</button>
      </div>
    </div>
  )
}

export const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <div>
        username
      <input
        type="text"
        value={props.username}
        name="Username"
        onChange={props.handleUsername}
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={props.password}
        name="Password"
        onChange={props.handlePassword}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export const NewBlog = ({ handleCreate, titleChange, authorChange, urlChange }) => (
  <form onSubmit={handleCreate} >
    <p>title: <input type='text' name='title' id='title' onChange={titleChange} /></p>
    <p>author: <input type='text' name='author' id='author' onChange={authorChange} /></p>
    <p>url: <input type='text' name='url' id='url' onChange={urlChange} /></p>
    <input type='submit' value='create' id='submitButton' />
  </form>
)

NewBlog.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  titleChange: PropTypes.func.isRequired,
  authorChange: PropTypes.func.isRequired,
  urlChange: PropTypes.func.isRequired
}

export const Notification = ({ notification }) => {
  if (!notification || notification === null) {
    return null
  }

  return (
    <div style={notification.style}>
      {notification.message}
    </div>
  )
}

export const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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