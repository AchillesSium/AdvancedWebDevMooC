import React, { useState } from 'react'
import { PersonForm, Filter, Persons } from './components.js'
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '04052eb';
// ------------------------------------------------------------ //

export const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterStr, setNewFilter ] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name == newName) && persons.some(e => e.number == newNumber)){
      window.alert(`${newName} is already added to phonebook`)
    }else if(persons.some(e => e.name == newName)){
      let ind = findPerson(newName)
      persons[ind].number = newNumber
    }else{
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const findPerson = (id) =>{
    for(let i = 0; i < persons.length; i++){
      if(persons[i].name == id){
        return i
      }
    }
    return -1
  }
  const deleteNumber = (event) => {
    event.preventDefault()
    let id = event.target.id
    setPersons(persons.filter(p => p.name !== id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter type="text" value={filterStr} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} nameValue={newName} numberValue={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange}  />
      <h3>Numbers</h3>
      <Persons persons={persons} filterStr={filterStr} deleteNumber={deleteNumber} />  
    </div>
  )
}
