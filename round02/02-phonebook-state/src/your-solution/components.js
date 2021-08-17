 export const Persons = (props) => {
    console.log(props.persons)
    return props.persons.filter((person)=>{
        if(props.newSearch == null)
          return person
        else if(person.name.toLowerCase().includes(props.newSearch.toLowerCase())){
          return person
        }
      }).map((person, index) => {
        return(
            <li key={index}>
              <div>{
                person.name} {person.number} 
                <button type="button" onClick={() => 
                    props.setPersons( props.persons.filter(perso => {
                    if(person.name !== perso.name){
                        return perso
                    }
                    })
                )} >
                     Delete
                </button>
              </div>
            </li>
        )
      })
  }


export const Filter = (props) => {
    return(
      <div>
        filter shown with<input placeholder="Enter name to search" onChange={props.search}/>
      </div>
    )
}

export const PersonForm = (props) => {
    return(
        <form onSubmit={props.addPerson}>
            <div>
            name:         
            <input 
                value={props.newName} 
                onChange={props.handleNameChange} 
            />  
            </div>
            <div>number:  <input 
                value={props.newNumber} 
                onChange={props.handleNumberChange} 
            />  
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}