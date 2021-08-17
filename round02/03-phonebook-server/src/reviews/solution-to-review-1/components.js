
 const Filter = ({search, handleSearch}) => {
    return (
      <div>
        Filter by name <input value={search} onChange={handleSearch}/>
      </div>
    )  
  }
  
  const PersonForm = ({name, handleName, number, handleNumber, addName}) => {
    return (
      <form>
      <div>
        Name: <input value={name} onChange={handleName}/>
      </div>
      <div>
        Number: <input value={number} onChange={handleNumber}/>
      </div>
      <div>
        <button type="submit" onClick={addName}>add</button>
      </div>
    </form>
    )
  }
  
  const Persons = ({persons, namesToShow, handleDelete}) => {
    if (persons.length > 0) {
      return (
        <ul>
          {namesToShow.map(person =>
            <p key={person.id}>{person.name} {person.number}
            <DeleteButton personId={person.id} handleClick={handleDelete} />
            </p> 
          )}
        </ul> 
      ) 
    } else {
      return (
        <div>...</div>
      )
    }
  }
  
  const DeleteButton = ({personId, handleClick}) => {
    return (
      <button className={"delete-"+personId} onClick={handleClick}> delete</button>
    )
  }

  const Notification = ({ message, type }) => {
    if (message === null || type === null) {
      return null
    } else if (type === 'error') {
      return (
        <div className="error">
          {message}
        </div>
      )
    } else  {
      return (
        <div className="succes">
          {message}
        </div>
      )
    }
  }

  export {Filter, PersonForm, Persons, Notification}