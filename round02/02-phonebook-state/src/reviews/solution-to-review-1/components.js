import React from 'react';
//components lista vastaa sivun eri komponenttien tulostamisesta sille lähetettyjen tietojen avulla


//Person komponentti. Tulostaa yhden ainoa ihmisen tiedot
//advanced web front step 6 - mahdollisuus poistaa klikattu tieto
const Person = (props) => {
    //console.log('Tulostetaan yksittäinen henkilö')
    
    return (<p key={props.name}>{props.name} {props.number} <button onClick={handleClick => {
        //console.log("Klikattu!", props.name)
        //console.log(props.lista)
  
        //poistetaan klikattu tieto persons-muuttujasta
        for (let i = 0; i < props.lista.length; i++) {
          if (props.lista[i].name == props.name) {
            delete props.lista[i]
            props.updateList(props.lista)
          }
        }
      }
      
      }>
    Delete</button> </p> )
  }
  
  //Person-komponentin kattokomponentti. Valmistaa kaikki listan henkilöt tulostamista varten
  const PersonsListForm = (props) => {
    //console.log('Tulostetaan Ihmisten hallintaan käytetty lista', props)
    return (
      <div>
        {props.filteredPersons.map(person =>
          <Person key={person.name} name={person.name} number={person.number} lista={props.filteredPersons} updateList={props.updateList}/>
        )}</div>
    )
  }
  
  //Filter vastaa filter-kentän ja tekstin tulostamisesta
  const Filter = (props) => (
    <div>
      filter shown with: <input
        value={props.newFilter}
        onChange={props.filterMuuttuu}
      />
    </div>
  )
  
  //PersonForm vastaa numero ja nimikentän + add-napin tulostamisesta
  const PersonForm = (props) => (
    <form onSubmit={props.addNote}>
      <div>
        name: <input
          value={props.newName}
          onChange={props.nimiMuuttuu}
        />
      </div>
      <div>
        number: <input
          value={props.newNumber}
          onChange={props.numeroMuuttuu}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

  export default {
    PersonForm,
    Filter,
    PersonsListForm
}