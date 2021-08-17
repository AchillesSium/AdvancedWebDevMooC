import React, { useState, useEffect } from 'react'
import {
  Blog,
  BlogForm,
  LOCALSTORAGE_KEYS,
  LoginForm,
  Notification,
} from './components'
import blogService from './services'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'dc7a3cd'
// ------------------------------------------------------------ //

const NOTIFICATION_TIMEOUT = 5000

export const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    text: '',
    success: true,
  })
  // Step 5: Toggle
  const [showCreateBlog, setShowCreateBlog] = useState(false)

  // Step 4: Notifications
  const createNotification = (data) => {
    setNotification(data)
    setTimeout(() => {
      setNotification({ text: '', success: true })
    }, NOTIFICATION_TIMEOUT)
  }

  // Step 2: Logout
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem(LOCALSTORAGE_KEYS.USER)
  }

  // Step 6: BlogForm component
  const addBlog = (blog) => {
    blogService
      .addBlog(blog)
      .then((newBlog) => {
        createNotification({
          text: `a new blog ${newBlog.title} by ${newBlog.author}`,
          success: true,
        })
        setShowCreateBlog(false)
      })
      .catch(() =>
        createNotification({
          text: 'An error occurred when adding blog.',
          success: false,
        })
      )
      .finally(refresh)
  }

  // Step 7: Like a blog post
  const likeBlog = (blog) => {
    blogService
      .likeBlog(blog)
      .then(() => {
        createNotification({
          text: `You liked a blog ${blog.title}.`,
          success: true,
        })
      })
      .catch(() =>
        createNotification({
          text: 'An error occurred liking blog.',
          success: false,
        })
      )
      .finally(refresh)
  }

  // Step 10: delete blog
  const deleteBlog = (blog) => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (confirmed) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          createNotification({
            text: `Blog ${blog.title} deleted.`,
            success: true,
          })
        })
        .catch(() => {
          createNotification({ text: 'Blog delete failed.' })
        })
        .finally(refresh)
    }
  }

  const refresh = () => {
    blogService
      .getAll()
      // Step 9: sorting
      .then((newBlogs) => newBlogs.sort((a, b) => b.likes - a.likes))
      .then(setBlogs)
  }

  useEffect(() => {
    refresh()
  }, [])

  // Step 1: Login
  if (user === null) {
    return (
      <LoginForm
        setUser={setUser}
        notification={notification}
        setNotification={createNotification}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification {...notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      {showCreateBlog ? (
        <BlogForm
          onSubmit={addBlog}
          onCancel={() => setShowCreateBlog(false)}
        />
      ) : (
        <>
          <button onClick={() => setShowCreateBlog(true)} id="button__create-new-blog">
            create new blog
          </button>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              onLike={likeBlog}
              onDelete={deleteBlog}
              username={user.username}
            />
          ))}
        </>
      )}
    </div>
  )
}
