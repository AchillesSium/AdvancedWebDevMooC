import React, { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons, Notification} from './components.js'
import personService from './person-service.js'
import './styles.css'
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '96cda4c';
// ------------------------------------------------------------ //



export const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState(null)
  
  useEffect(() => {   
    personService   
      .getAll()  
      .then(response => {    
        console.log('promise fulfilled')     
        setPersons(response.data)    
      }) 
     }, []) 

  const generateId = () => {
    const lastAdded = persons[persons.length-1]
    const newId = lastAdded.id + 1
    return newId
  }

  const addOrUpdate = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: generateId()
    }
    //add new 
    if (!persons.some(person => person.name === newName)) {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotification(`Added ${nameObject.name}`)        
          setNotificationType('succes')
          setTimeout(() => {
            setNotification(null) 
            setNotificationType(null)  
          }, 5000)
        }) 
    //update already existing    
    } else {
      const personUpdate = persons.find(person => person.name === newName)
      if (window.confirm(`${personUpdate.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updated = persons.map((person) => {
          if (person.name === newName) {
            person.number = newNumber
            return person
          } else {
            return person
          }
        })
        personService
          .update(personUpdate.id, nameObject)
          .then(response => {
            setPersons(updated)
            setNotification(`${personUpdate.name} number updated`)    
            setNotificationType('succes')
            setTimeout(() => {
              setNotification(null) 
              setNotificationType(null)     
            }, 5000)
          })
          .catch(error => {
            setNotification(`Information of ${personUpdate.name} has already been removed from server`)       
            setNotificationType('error')
            setTimeout(() => {
              setNotification(null)  
              setNotificationType(null)  
            }, 5000)
            setPersons(persons.filter(person => person.id !== personUpdate.id))
          })
      }
    }  
    setNewName('')
    setNewNumber('')
  }

  const deleteName = (event) => {
    const idToDelete = parseInt(event.target.className.split("-")[1])
    console.log(event.target.className.split("-")[1])
    const deletedObject = persons.filter(person => person.id === idToDelete)
    if (window.confirm(`Delete ${deletedObject[0].name}?`)) {
      const newList = persons.filter((person) => person.id !== idToDelete)
      personService
        .remove(idToDelete)
        .then(response => {
          console.log(response.data)
          setPersons(newList)
          setNotification(`Deleted ${deletedObject[0].name}`)    
            setNotificationType('succes')
            setTimeout(() => {
              setNotification(null) 
              setNotificationType(null)     
            }, 5000)
        })
        .catch(error => {
          setNotification(`Information of ${deletedObject[0].name} has already been removed from server`)       
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)  
            setNotificationType(null)  
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    if (event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const namesToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType}/>
      <Filter search={newSearch} handleSearch={handleSearchChange} />
      <h3>Add a new number</h3>
      <PersonForm name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange} addName={addOrUpdate} />
      <h3>Numbers</h3>
      <Persons persons={persons} namesToShow={namesToShow} handleDelete={deleteName}/>
    </div>
  )
}


