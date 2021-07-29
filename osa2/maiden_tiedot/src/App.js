import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {

  const [ filter, setFilter ] = useState('')

  const [countries, setCountries] = useState([])
  
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
  
  const countriesTotal = countriesToShow.length

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {countriesTotal > 10
      ? <div>Too many matches, specify another filter</div>
      : countriesTotal === 1
        ? <Country country={countriesToShow[0]}/>
        : <Countries countries={countriesToShow} handleClick={setFilter.bind(this)}/>}
    </div>
  )
}

export default App