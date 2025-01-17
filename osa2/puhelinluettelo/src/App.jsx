import { useEffect, useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from './services/persons'
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameAlreadyExist = persons.find(person => person.name === newName)
    if (nameAlreadyExist) {
      const confrimChange = window.confirm(`${newName} is aleady added to phonebook, replace the old number with a new one?`)
      if (confrimChange) {
      const updatedPerson = { ...nameAlreadyExist, number: newNumber }
      personService
        personService
          .update(nameAlreadyExist.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person =>
              person.id !== nameAlreadyExist.id ? person : response.data
            ))
            setSuccessMessage(
              `Updated the number of ${nameAlreadyExist.name}`
            )
            setNewName("")
            setNewNumber("")
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${nameAlreadyExist.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
    else {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setSuccessMessage(
          `Added ${newName}`
        )
        setNewName("")
        setNewNumber("")
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className='notification'>
        {message}
      </div>
    )
  }

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )


  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App