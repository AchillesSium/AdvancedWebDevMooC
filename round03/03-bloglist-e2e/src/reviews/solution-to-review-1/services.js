import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getHeaders = () => {
  // impossible to import the key because of circlar imports.
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    return {
      Authorization: `bearer ${user.token}`,
    }
  } catch (error) {
    localStorage.removeItem('user')
  }
}

// Step 1: Login
export const login = (username, password) => {
  return axios.post('/api/login', { username, password })
}

// Step 3: add blogs
const addBlog = (blog) => {
  return axios
    .post(baseUrl, { ...blog, likes: 0 }, { headers: getHeaders() })
    .then((response) => response.data)
}

// Step 8: increase like
const likeBlog = ({ id, author, title, likes, url, user }) => {
  return axios.put(
    `${baseUrl}/${id}`,
    {
      user: user.id,
      likes: likes + 1,
      author,
      title,
      url,
    },
    { headers: getHeaders() }
  )
}

// Step 10: delete blog
const deleteBlog = (blogId) => {
  return axios.delete(`${baseUrl}/${blogId}`, { headers: getHeaders() })
}

export default { getAll, addBlog, likeBlog, deleteBlog }
