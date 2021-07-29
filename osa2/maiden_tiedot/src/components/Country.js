import { React, useState, useEffect} from 'react'
import axios from 'axios'

const Country = (props) => {
    const [weather, setWeather] = useState({})

    const capital = props.country.capital
    
    const hook = () => {
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: capital
        }

        axios
          .get('http://api.weatherstack.com/current', {params})
          .then(response => {
            setWeather(response.data.current)
          })
    }

    useEffect(hook, [capital])

    return (
        <div>
            <h1>{props.country.name}</h1>
                capital {props.country.capital} <br/>
                population {props.country.population}
                <h3>Spoken languages</h3>
                <ul>
                    {props.country.languages.map(lang =>
                    <li key={lang.name}> {lang.name} </li>
                )}
                </ul>
                <img src={props.country.flag} alt={"Country flag"} width={150} height={100}></img>
                <h3>Weather in {props.country.capital}</h3>
                <b>temperature: </b> 
                {weather === undefined 
                ? "?" 
                : weather.feelslike} Celcius <br/>
                {weather === undefined 
                ? "Weather icon" 
                : <img src={weather.weather_icons} alt={"Weather icon"} width={50} height={50}></img>}<br/>
                <b>wind:</b>
                {weather === undefined 
                ? "?" 
                : weather.wind_speed + " mph direction " + weather.wind_dir}

        </div>
    )
}

export default Country