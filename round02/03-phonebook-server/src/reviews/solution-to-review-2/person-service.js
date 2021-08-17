import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const promise = axios.get(baseUrl)
	return promise.then(response => response.data)
}

const create = newContact => {
	const promise = axios.post(baseUrl, newContact)
	return promise.then(response => response.data)
}

const update = (id, newContact) => {
	const promise = axios.put(`${baseUrl}/${id}`, newContact)
	return promise.then(response => response.data)
}

const remove = id => {
	const promise = axios.delete(`${baseUrl}/${id}`)
	return promise.then(response => response.data)
}

export default { getAll, create, update, remove }
