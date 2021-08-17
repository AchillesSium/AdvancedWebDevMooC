import axios from "axios"

const listAnecdotes = () => {
    return axios.get("http://localhost:3001/anecdotes").then(response => response.data)
}

const createAnectdote = (content) => {
    return axios.post("http://localhost:3001/anecdotes", { content, votes: 0 }).then(response => response.data)
}

const vote = (anecdote) => {
    return axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1 }).then(response => response.data)
}

export const AnecdoteService = {
    list: listAnecdotes,
    create: createAnectdote,
    vote
}
