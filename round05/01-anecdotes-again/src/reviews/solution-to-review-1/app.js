import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory, withRouter
} from "react-router-dom"
import  { useField } from './hooks'

// ** enter commit sha of your repository in here **
export const commitSHA = '3b83105';


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Link to={`/anecdotes/${anecdote.id}`}><li key={anecdote.id} >{anecdote.content}</li></Link>)}
    </ul>
  </div>
)

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id)
  return <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
  </div>
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField("text")
  const author = useField("text")
  const info = useField("text")
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    const contentvalue = content.value
    const authorvalue = author.value
    const infovalue = info.value
    props.addNew({
      content: contentvalue,
      author: authorvalue,
      info: infovalue,
      votes: 0
    })
    history.push("/")
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={info.onChange} />
        </div>
        <button type = "submit">create</button>
        <button type = "button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({noti}) => {
  return <div><p>{noti}</p></div>
}

export const App = () => {
  const [notification, setNotification] = useState("")
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created`)
    setInterval(() => setNotification(""), 10000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  return (
      <div>
        <h1>Software anecdotes</h1>
        <Notification noti={notification}/>
        <Router>
          <Menu />
          <Switch>
            <Route exact path="/">
              <AnecdoteList anecdotes={anecdotes} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/create">
              <CreateNew addNew={addNew} />
            </Route>
            <Route path="/anecdotes/:id">
              <Anecdote anecdotes={anecdotes} />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </div>
  )
}
