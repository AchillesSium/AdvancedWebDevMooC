import React, { useState } from 'react'
import { Persons, Filter, PersonForm } from './components'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '3cc0e83536a11757fee1da822a0dffd3b25a55c9';
// ------------------------------------------------------------ //


export const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let obj = persons.find( personObj => personObj.name === newName);
    if(obj != null && obj.number == newNumber){
      window.alert(`${newName} is already added to phonebook`);
      return
    }else if(obj != null && obj.number != newNumber){
      persons.map(person => person.number == obj.number ? person.number = newNumber : person.number);
      setPersons(persons)
      setNewName('')
      setNewNumber('')
      return
    }
    const namebject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(namebject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {    
    event.preventDefault()
    console.log(event.target.value)    
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {    
    event.preventDefault()
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={handleSearch}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch} setPersons={setPersons}/>
    </div>
  )
}
