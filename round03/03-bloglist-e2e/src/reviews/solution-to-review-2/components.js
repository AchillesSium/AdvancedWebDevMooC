import React, { useState } from 'react'
import PropTypes from 'prop-types'


export const Blog = ({ blog, addLike, remove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const show = () => {
    setInfoVisible(true)
  }

  const [infoVisible, setInfoVisible] = useState(false)
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }
  return(
    
    <div style = {blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button className="view_btn" onClick={() => show()}>view</button>
      </div>
      <div style={showWhenVisible}>
        <ul id={blog.title}>
          <li>{blog.title}</li>
          <li>{blog.url}</li>
          <li>likes {blog.likes}
            <button name="like_button" onClick={() => addLike(blog)}>like</button>
          </li>
          <li>{blog.author}</li>
        </ul>
        <button onClick={() => setInfoVisible(false)}>hide</button>
        <button onClick={() => remove(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export const BlogForm = ({ addBlog, handleBlogChange, setInfoVisible }) => {

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = '')
    )
  }
  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>Create new</h2>
        <div>
        Title:
          <input name="title" type="text" onChange={handleBlogChange} />
        </div>
        <div>
        Author:
          <input name="author" type="text" onChange={handleBlogChange} />
        </div>
        <div>
        Url:
          <input name="url" type="text" onChange={handleBlogChange} />
        </div>
        <div>
          <button name="create" type="submit" onClick={() => setInfoVisible(false)}>create</button>
        </div>
      </form>
      <button onClick={() => {setInfoVisible(false), handleReset()}}>cancel</button>
    </div>
  )
}

export const Login = ({ user }) => {
  return(
    <div>
      {user.name} is loged in
      <button onClick={() => { window.localStorage.clear(); window.location.reload()} }>logout</button>
    </div>

  )
}

export const Notification = ({ message }) => {
  return message?(
    <h2>{message}</h2>
  ):null
}