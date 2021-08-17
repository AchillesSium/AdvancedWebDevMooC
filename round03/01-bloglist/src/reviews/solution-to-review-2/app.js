import React, { useState, useEffect } from 'react'
import { Blog, Login, Logout, CreateNew } from './components'
import { getAll, login, ls, setToken, createBlog } from './services'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '65810bd'
// ------------------------------------------------------------ //


export const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({})
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [newNoteVisible, setNewNoteVisible] = useState(false)

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs(blogs)
    )
    setUser(JSON.parse(ls.getItem('user')) || '')
    setToken(JSON.parse(ls.getItem('token')) || '')
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({ username, password })
      setUser(user)
      ls.setItem('user', JSON.stringify(user))
      ls.setItem('token', JSON.stringify(user.token))
      setToken(user.token)
    } catch (e) {
      setNotification({
        type: 'error',
        message: 'wrong username or password'
      })
      setTimeout(() => {
        setNotification({})
      }, 3000)
    }
  }

  const handleLogout = () => {
    ls.removeItem('user')
    ls.removeItem('token')
    setUser('')
  }

  const handleNewBlogPost = async (e) => {
    e.preventDefault()
    try {
      const data = await createBlog({
        title,
        author: user.name,
        url,
        likes: 0
      })
      const _blogs = await getAll()
      setBlogs(_blogs)
      setNotification({
        type: 'normal',
        message: `a new blog ${title} by ${user.name} added`
      })
      setNewNoteVisible(false)
      setTimeout(() => {
        setNotification({})
      }, 4000)
      console.log(data)
    }
    catch (e) {
      console.log('error', e)
    }

  }

  return !user ?
    <Login
      handleLogin={handleLogin}
      setUsername={setUsername}
      username={username}
      password={password}
      setPassword={setPassword}
      notification={notification} />
    :
    <div>
      <h2>blogs</h2>
      <Logout user={user} handleLogout={handleLogout} />
      <CreateNew
        handleNewBlogPost={handleNewBlogPost}
        title={title}
        setTitle={setTitle}
        user={user}
        url={url}
        setUrl={setUrl}
        notification={notification}
        newNoteVisible={newNoteVisible}
        setNewNoteVisible={setNewNoteVisible}
      />
      <hr />
      {blogs
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} username={user.username} />
        )}
    </div>

}
