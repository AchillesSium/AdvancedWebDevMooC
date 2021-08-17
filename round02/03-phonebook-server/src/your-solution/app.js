import React, { useState, useEffect } from 'react';
import './styles.css';
import {Notification,Filter,PersonForm,Persons} from './components';
import personService from './person-service';
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '596f0a65579bc7c943220d06dcd8661ead4663d8';
// ------------------------------------------------------------ //

export const App = () => {
  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
        })
  }, [])
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setmessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const addName = (event) => {
    event.preventDefault()

    const duplicateCheck = persons.find(person => person.name === newName)
    if (typeof duplicateCheck !== 'undefined' && duplicateCheck.number !== newNumber) {
      personService
        .update(duplicateCheck.id, { name: duplicateCheck.name, number: newNumber})
        .then(person => {
          if (window.confirm(`${person.name} is already added to phonebook, 
            Do you want to replace it?`)) {
            setPersons(persons.map(person => 
                      person.id !== duplicateCheck.id ? person : person))
          }
          setNewName('')
          setNewNumber('')
        })
        return
    } else if (typeof duplicateCheck !== 'undefined') {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
    }

    personService
      .create({ name: newName, number: newNumber })
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setMessageType('confirmation')
        setmessage(`Added ${response.name}`)
        setTimeout(() => {
          setmessage(null)
          setMessageType(null)
        }, 5000)
      })

  }

  const deletePerson = (event) => {
    event.preventDefault()
    const id = parseInt(event.target.value)
    console.log(id)
    const pers = persons.filter(per => {
      return per.id === id
    })
    if (pers.length == 0) {
      return
    }
    const name = pers[0].name
    personService.remove(pers[0])
    .catch(error => {
      setMessageType('error')
      setmessage(`Information of ${name} removed from server`)
      setTimeout(() => {
        setmessage(null)
        setMessageType('error')
      }, 5000)
      setPersons(persons.filter(n => n.id !== id))
    })
    setPersons(persons.filter(n => n.id !== id))
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} messageType={messageType} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addName}
                  valueName={newName}
                  onChangeName={handleNameChange}
                  valueNumber={newNumber}
                  onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filter={newFilter} persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

