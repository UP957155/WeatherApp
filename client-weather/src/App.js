import React, { useEffect, useState } from 'react'
import { fetchWeather } from './api/fetchWeather'
import { fetchCityName } from './api/fetchCityName'
import './App.css'

const App = () => {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})
    const [location, setLocation] = useState(true)

    

    useEffect(() => {

        const onSuccess = (position) => {
            findByLocation(position.coords.latitude, position.coords.longitude) // Find weather by location
        }
    
        const onError = () => { // If location denied
            setLocation(false)
            alert('Geolocation is denied\nUse manual search')
        }

      if(location){// If search by location
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
        }else{
            alert('Geolocation not supported')
        }
      }
    }, [location])

    const findByLocation = async (lat, long) => {
        const data = await fetchCityName(lat, long)
        if (!data.error){// If not error
            const weatherResults = await fetchWeather(data.results[0].locations[0].adminArea5)
            if(!weatherResults.message){ // If not error
                setWeather(weatherResults)
                setLocation(true)
                setQuery(data.results[0].locations[0].adminArea5)
            }else{
                setWeather({
                    error: weatherResults.message // To show error message
                })
            }
            
        }else{
            setWeather(data)// To show error message
        }
    }

    const search = async (e) => {
        if(e.key === 'Enter'){
            const data = await fetchWeather(query)
            if(!data.message){// If not error
                setWeather(data)
                setLocation(false)
            }else{
                setWeather({
                    error: data.message // To show error message
                })
            }
               
        }
        
    }

    const backToLocation = () => { //Back to user location
        setLocation(true)
    }

    return (
        <div className="main/container">
            <input 
            className="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => {
                setQuery(e.target.value)
            }}
            onKeyPress={search}
            />
            {
              (weather.main) ?
                  <div className="city">
                      <h2 className="city-name">
                          <span>{weather.name}</span>
                          <sup>{weather.sys.country}</sup>
                      </h2>
                      <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                      </div>
                      <div className="info">
                      <img className="city-icon"
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                        {(location === false) ?
                        <p
                        className='location'
                        onClick={backToLocation}
                        >BACK TO MY LOCATION</p> :
                        <p></p>
                        }
                      </div>
                  </div>
              : <h1 style={{color: 'red'}}>{weather.error}</h1>
            }
        </div>
    )
}

export default App