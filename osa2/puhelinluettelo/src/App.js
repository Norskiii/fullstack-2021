import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const Notification = ({ message, type }) => {
    if(message === null){
      return null
    }

    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  const addName = (props) => {
    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessageType('info')
      setMessage(`Added ${nameObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const checkName = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)

    person === undefined
    ? addName()
    : window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      ? personService
        .update(person.id, {...person, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setMessageType('info')
          setMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
        })
      : console.log("ei kirjoiteta paalle")
  }

  const personsToShow = filter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const deletePerson = (id, name) => {
    const result = window.confirm(`Delete ${name}?`)
    result 
      ? personService
        .deletePerson(id)
        .then(() => {
          personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
              setMessageType('info')
              setMessage(`Deleted ${name}`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })    
        })
      : console.log("poisto peruttu")
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={messageType} />
      <Filter value={filter} onChange={handleFilterChange}/>
      
      <h2>Add a new</h2>

      <PersonForm
        checkName={checkName}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      {personsToShow.map(person =>
        <Person key={person.name}
            name={person.name}
            number={person.number}
            deletePerson={() => deletePerson(person.id, person.name)}
        />
      )}
    </div>
  )

}

export default App