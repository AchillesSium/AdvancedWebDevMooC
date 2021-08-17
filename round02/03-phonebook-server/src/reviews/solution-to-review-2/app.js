import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, ContactForm, Contacts, Notification } from './components'
import contactService from './person-service'
import './styles.css'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'd96445e';
// ------------------------------------------------------------ //

/**
  Note for peer review: to avoid name collisions resulting from 
  importing 'persons' table from initial-persons.js, I renamed
  all variables from 'persons' to 'contacts'.

  To keep the code coherent, I also use the following component names:
     - 'ContactForm' instead of advised 'PersonForm'
     - 'Contacts' instead of advised 'Persons'
     - 'Contact' instead of advised 'Person'

     etc.
*/

export const App = () => {

  const [ contacts, setContacts ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ operationSuccess, setOperationSuccess ] = useState(true)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => setContacts(initialContacts))
  }, [])

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setNewFilter(event.target.value)

  const notifyUser = (message, success) => {
    setOperationSuccess(success)

    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleUnsuccessfulOperation = (name, id) => {
    const msg = `Information for ${name} has already been removed from the server`
    notifyUser(msg, false)
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService
        .remove(id)
        .then(returnedContact => {
          setContacts(contacts.filter(contact => 
              contact.id !== id
          ))
          notifyUser(`Deleted ${name}`, true)
        })
        .catch(error => {
          handleUnsuccessfulOperation(name, id)
        })
    }
  }

  const confirmAndReplaceContact = (oldContact) => {
    const confirmed = window.confirm(
      `${oldContact.name} is already added to phonebook, 
      replace the old number with a new one?`)

    if (confirmed) {
      const newContact = { ...oldContact, number: newNumber }
      contactService
        .update(oldContact.id, newContact)
        .then(returnedContact => {
          setContacts(contacts.map(contact => 
            contact.id !== oldContact.id ? contact : newContact
          ))
          notifyUser(`Updated ${oldContact.name}`, true)
        })
        .catch(error => {
          handleUnsuccessfulOperation(oldContact.name, oldContact.id)
        })
    }
  }

  const addContact = (event) => {
    event.preventDefault()

    // Find possible old entry:
    const oldContact = contacts.find(contact => 
      contact.name === newName
    )

    // Handle contact update to server and React state:
    if (oldContact !== undefined) {
      confirmAndReplaceContact(oldContact)
    }
    else {
      const newContact = {
        name: newName,
        number: newNumber
      }
      contactService
        .create(newContact)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact))
          notifyUser(`Added ${newName}`, true)
        })
    }

    setNewName('')
    setNewNumber('')    
  }
  
  const contactsToShow = contacts.filter(contact => 
    contact.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <Notification message={message} success={operationSuccess} />

      <h2>Phonebook</h2>
      
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <ContactForm 
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>

      <Contacts contacts={contactsToShow} handleDelete={handleDelete}/>
    </div>
  )
}
