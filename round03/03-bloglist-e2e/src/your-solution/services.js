import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {  token = `bearer ${newToken}`}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response =>  response.data)
}

const login = async credentials => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

const newBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const addLike = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const id = blog.id
  const response = await axios.put(baseUrl+'/'+id, blog, config)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const id = blog.id
  const response = await axios.delete(baseUrl+'/'+id, config)
  return response.data
}

// const update = (id, newObject) => {
//   const request = axios.put(`${ baseUrl } /${id}`, newObject)
//   return request.then(response => response.data)
// }

export default { getAll, login, newBlog, setToken, addLike, deleteBlog }
