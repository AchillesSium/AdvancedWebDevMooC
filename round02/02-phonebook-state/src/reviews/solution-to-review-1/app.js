import React, { useState, useEffect } from 'react'
import personsData from '../initial-persons.js'
import components from './components'
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '031ed9c';
// ------------------------------------------------------------ //


export const App = () => {
  const [persons, setPersons] = useState(personsData)

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  //Handler filtterin päivittämistä varten
  const filterMuuttuu = (event) => {
    //console.log('filtterikenttä muuttuu:', event.target.value)
    setNewFilter(event.target.value)
  }

  //Handler tekstikentän päivittämistä varten
  const nimiMuuttuu = (event) => {
    //console.log('tekstikenttä muuttuu:', event.target.value)
    setNewName(event.target.value)

  }

  //Handler numerokentän päivittämistä varten
  const numeroMuuttuu = (event) => {
    //console.log('numerokenttä muuttuu:', event.target.value)
    setNewNumber(event.target.value)

  }

  //Ihmislistan filtteröiminen annetulla filtterillä caseINsensitiivisesti
  const filteredPersons = persons.filter(person => {
    return person.name.toLocaleLowerCase().includes(newFilter.toLowerCase())
  })

  //Handler napin toiminnalle ja nimen lisäämiselle
  const addNote = (event) => {
    event.preventDefault()
    //console.log('Saatu sisältö', newName)

    //tämän simppelin rivin naputteluun meni liian kauan
    //Ottaa kaikki moniulotteisen listan name-tiedot ja tiivistää ne yhteen yksiulotteiseen listaan
    const nimet = persons.map(yksittainen => yksittainen.name)

    //console.log('Nimien listassa nyt:', nimet)

    //jos nimi ei ole vielä listassa
    if (!nimet.includes(newName)) {
      const lisattavaperson = {
        name: newName,
        number: newNumber
      }
      //console.log('Pusketaan listaan seuraavat tiedot: ', lisattavaperson)
      setPersons(persons.concat(lisattavaperson))

      //tyhjennetään kentät
      setNewName('')
      setNewNumber('')
      //console.log('Listassa nyt: ', persons)
    }
    else {
      //advanced web dev step 7 eli päivitetään olemassa oleva numero
      const paivitettavaperson = {
        name: newName,
        number: newNumber
      }

      console.log(persons)

      //käydään lista läpi ja päivitetään olemassa oleva numero
      for (let i = 0; i < persons.length; i++) {
        if (persons[i].name == paivitettavaperson.name) {
          persons[i].number = newNumber
        }
      }

      //console.log(persons)

      //console.log('Nimi jo listassa, päivitetään numero ', paivitettavaperson)
      setPersons(persons)

      //tyhjennetään kentät
      setNewName('')
      setNewNumber('')

    }

  }

  //varsinaisen rungon tulostus
  return (
    <div>
      <h2>Phonebook</h2>
      <components.Filter newFilter={newFilter} filterMuuttuu={filterMuuttuu} />
      <h2>Add a new</h2>
      <components.PersonForm addNote={addNote} newName={newName} nimiMuuttuu={nimiMuuttuu} newNumber={newNumber} numeroMuuttuu={numeroMuuttuu} />
      <h2>Numbers</h2>
      <components.PersonsListForm filteredPersons={filteredPersons} updateList={setPersons}/>
    </div>
  )
}
