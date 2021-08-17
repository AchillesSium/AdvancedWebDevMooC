import React, { useState } from 'react'
import { updateBlog, deleteBlog, getAll } from './services'
import propTypes from 'prop-types'



export const Login = ({ handleLogin, username, setUsername, passwword, setPassword, notification }) => (
  <form onSubmit={handleLogin}>
    <h2>log in to application</h2>
    <Notification notification={notification} />
    <div>
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)} />
    </div>
    <div>
      <input
        type="password"
        name="Password"
        value={passwword}
        onChange={({ target }) => setPassword(target.value)} />
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
  </form>
)

export const Logout = ({ user, handleLogout }) => (
  <>
    <div>{user.name}
      <button style={{ marginLeft: '1em' }} onClick={handleLogout}>logout</button>
    </div>
  </>
)

export const CreateNew = ({
  handleNewBlogPost,
  title,
  user,
  setTitle,
  url,
  setUrl,
  notification,
  newNoteVisible,
  setNewNoteVisible }) => {

  const labelStyle = {
    display: 'inline-block',
    width: '60px'
  }
  return newNoteVisible ?
    <>
      <hr />
      <h2>Create new</h2>
      <form onSubmit={handleNewBlogPost}>
        <div>
          <label style={labelStyle} htmlFor="Title">Title: </label>
          <input type="text" name="Title" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="Author">Author: </label>
          <input type="text" name="Author" readOnly placeholder={user.name || ''} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="Url">Url: </label>
          <input type="url" name="Url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
      <button onClick={() => setNewNoteVisible(!newNoteVisible)}>Cancel</button>
    </>
    :
    <>
      <Notification notification={notification} />
      <button style={{ margin: '15px 0' }} onClick={() => setNewNoteVisible(!newNoteVisible)}>New note</button>
    </>
}

CreateNew.propTypes = {
  handleNewBlogPost: propTypes.func,
  title: propTypes.string,
  user: propTypes.object,
  setTitle: propTypes.func,
  url: propTypes.string,
  setUrl: propTypes.func,
  notification: propTypes.object,
  newNoteVisible: propTypes.bool,
  setNewNoteVisible: propTypes.func
}

export const Blog = ({ blog, setBlogs, username }) => {
  const blogStyle = {
    padding: '10px 5px',
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)
  const [_blog, setBlog] = useState(blog)
  const likes = _blog.likes || 0

  const handleLike = async (likes) => {
    try {
      const updatedBlog = await updateBlog({
        id: blog.id,
        user: blog.user,
        likes: likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      })
      setBlog(updatedBlog)
      console.log(updatedBlog)
    } catch (e) {
      console.log('update error', e)
    }
  }

  const handleBlogRemove = async id => {
    if (!window.confirm(`Remove blog ${_blog.title} by ${_blog.author}`)) return
    try {
      await deleteBlog(id)
      const blogs = await getAll()
      setBlogs(blogs)
    } catch (e) {
      console.log(e)
    }
  }
  return <div style={blogStyle}>
    <div>
      {_blog.title} {_blog.author}
      <button style={{ marginLeft: '1em' }} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'hide' : 'view'}
      </button>
    </div>
    {expanded &&
      <>
        <div>{_blog.url}</div>
        <div>likes {likes}
          <button style={{ marginLeft: '1em' }} onClick={() => { handleLike(+likes + 1) }}>
            like
          </button>
        </div>
        <div>{_blog.author}</div>
        <div>
          <button
            style={{ display: _blog.user.username === username ? 'block' : 'none' }} onClick={() => handleBlogRemove(_blog.id)}>
            remove
          </button>
        </div>
      </>}
  </div>

}

export const Notification = ({ notification }) => {
  const messageStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    color: notification.type === 'error' ? 'red' : 'green'
  }
  return Object.keys(notification).length === 0 ? null :
    <div style={messageStyle}>
      {notification.message}
    </div>
}
