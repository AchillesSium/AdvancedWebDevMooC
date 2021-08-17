import axios from 'axios'
const blogs = '/api/blogs'
const api = '/api/'
export const ls = window.localStorage
let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(newObject, config)
  const res = await axios.post(blogs, newObject, config)
  return res.data
}

export const updateBlog = async updatedObject => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.put(`${blogs}/${updatedObject.id}`, updatedObject, config)
  return res.data
}

export const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${blogs}/${id}`, config)
  return res.data
}

export const getAll = () => {
  const request = axios.get(blogs)
  return request.then(response => response.data)
}

export const login = async (credentials) => {
  const res = await axios.post(`${api}login`, credentials)
  return res.data
}
