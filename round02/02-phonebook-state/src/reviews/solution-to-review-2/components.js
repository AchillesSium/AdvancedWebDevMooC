const Person = (props) => {
    return (
    <form id={props.person.name} onSubmit={props.command}>
      <li>{props.person.name} {props.person.number} <button type="submit">delete</button></li>
      </form>
    )
  }
  const PersonForm = (props) => {
    return(
      <form onSubmit={props.onSubmit}>
          <div>
            name: <input 
              value={props.nameValue}
              onChange={props.nameChange}
            />
          </div>
          <div>
            number: <input 
              value={props.numberValue}
              onChange={props.numberChange}
              />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }
  const Filter = (props) => {
    return(
    <form>
      filter shown with: <input 
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        />
      </form>
    )
  }
  const Persons = (props) => {
    return(
      <ul>
        {props.persons.filter(person => (person.name).toLowerCase().includes(props.filterStr.toLowerCase())).map(person => 
            <Person key={person.name} person={person} command={props.deleteNumber}/>
        )}
      </ul>
    )
  }

export { Person, PersonForm, Filter, Persons }
