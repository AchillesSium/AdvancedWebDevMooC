import axios from 'axios'
const baseUrl = '/api/blogs'
const baseUrlLogin = '/api/login'
//const baseUrlNotes = '/api/notes'


const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  //console.log(response);
  return response.data
}

const login = async (credentials) => {
  const response = await axios.post(baseUrlLogin, credentials)
  console.log(response)
  return response.data
}

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
}

const remove = async ( id ) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, login, setToken, create, update, remove }
