
const TextInput = ({title, value, onChange}) => 
  <div>{title} <input value={value} onChange={onChange}/></div>

export const Filter = ({newFilter, handleFilterChange}) =>
  <TextInput
    title={'filter shown with'}
    value={newFilter}
    onChange={handleFilterChange}
  />

export const ContactForm = (props) => {
  const {
    addContact,
    newName, handleNameChange,
    newNumber, handleNumberChange
  } = props

  return (
    <form onSubmit={addContact}>
      <TextInput
        title={'name:'}
        value={newName}
        onChange={handleNameChange}
      />
      <TextInput
        title={'number:'}
        value={newNumber}
        onChange={handleNumberChange}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Contact = ({contact, handleDelete}) =>
  <div>
    {contact.name} {contact.number} <button onClick={
      () => handleDelete(contact.id, contact.name)
    }>
      delete
    </button>
  </div>

export const Contacts = ({contacts, handleDelete}) =>
  <div>
    {contacts.map(contact =>
      <Contact
        key={contact.name}
        contact={contact}
        handleDelete={handleDelete}
      />
    )}
  </div>

export const Notification = ({message, success}) => {
  if (message === '') {
    return null
  }

  return (
    <div className={success ? 'note' : 'error'}>
      {message}
    </div>
  )
}
