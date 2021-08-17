
export const Filter = ({ value, onChange }) => {
    return (
      <div>
        filters shown with
        <input
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }
  
  const Person = ({ name, number }) => {
      return (
        <span>
          {name} {number}
        </span>
      )
    }
  
    export const PersonForm =
    ({ onSubmit, valueName, onChangeName, valueNumber, onChangeNumber }) => {
  
      return (
        <form onSubmit={onSubmit}>
        <div>
          name:
          <input
            value={valueName}
            onChange={onChangeName}
          />
        </div>
  
        <div>
          number:
          <input
            value={valueNumber}
            onChange={onChangeNumber}
          />
        </div>
  
        <div>
          <button
            type="submit">add
          </button>
        </div>
      </form>
      )
    }
    export const Persons = ({ filter, persons, deleteName }) => {
      return (
        persons.filter(person =>
          person.name.includes(filter)).map(person =>
            <span key={person.id}>
              <Person 
                name={person.name} 
                number={person.number} 
              />
              {' '}
              <button 
                type="button" 
                value={person.id}
                onClick={deleteName}>
                delete
              </button>
              <br />
            </span>
          )
      )
    }
    export const Notification = ({ message, messageType }) => {
      if (message === null) {
        return null
      }
    
      return (
        <div className={messageType}>
          {message}
        </div>
      )
    }
    
  