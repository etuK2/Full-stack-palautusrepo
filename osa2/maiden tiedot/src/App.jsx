import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearch = async (event) => {
    setFilter(event.target.value)
    if (event.target.value) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((response) => {
          const filtered = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
        )
      setCountries(filtered)
      setSelectedCountry(null)
    })
    } else {
      setCountries([])
    }
  }

  const handleShowDetails = (country) => {
    setSelectedCountry(country)
  }

  const CountryList = ({ countries, onShowDetails }) => (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => onShowDetails(country)}>show</button>
        </div>
      ))}
    </div>
  )

  const CountryDetails = ({ country }) => (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} width="180" />
    </div>
  )


  return (
    <div>
      find countries <input value={filter} onChange={handleSearch} />
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
      {countries.length > 1 && countries.length <= 10 && !selectedCountry && (
        <CountryList countries={countries} onShowDetails={handleShowDetails} />
      )}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
      {countries.length === 1 && !selectedCountry && ( <CountryDetails country={countries[0]} />)}
    </div>
  )
}

export default App

