import React, { useState } from 'react'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors
  console.log(authors)
  
  const handleChange = (event) => {
    console.log('handlechange')
    console.log(event)
    console.log(event.target.value)
    setName(event.target.value)
  }

  const submit = async (e) => {
    e.preventDefault()

    console.log('submit')
    console.log(born)
    console.log(name)
    console.log('__')
    await props.editAuthor({ variables: { name, "born": parseInt(born)} })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          select Author:
          <select value={name} onChange={handleChange}>
            {authors.map(a =>
              <option value={a.name}>{a.name}</option> 
            )}
          </select>
        </div>
        born
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
        <br />
        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}

export default Authors