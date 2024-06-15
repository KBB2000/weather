import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './api/api';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DarkMode from "./components/DarkMode/DarkMode"

function App() {
const [city , setCity] = useState("")
const [weather, setWeather] = useState({})

const getWeatherbyCity = async () => {
  const weatherData = await getWeather(city); 
  setWeather(weatherData);
  setCity("")
}

const reanderDate = () => {
  let now = new Date()
  return dateFormat(now, "dddd, mmmm dS, h:MM TT")
}

  return (
    <div className="app">
      <div className="toggle-functionality flex d-flex">
      <h1>Weather App</h1>
      <DarkMode />
      </div>
      <div className="input-wrapper">
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City Name' />
          <button onClick={()=>getWeatherbyCity()}>
            <Search></Search>
          </button>
      </div>

   {weather && weather.weather &&  

      <div className="content">
        <div className="location d-flex">
              <MapPin></MapPin>
              <h2>{weather.name} <span> ({weather.sys.country})</span></h2>
        </div>
        <p className='datetext'>{reanderDate()}</p>
        <div className="weatherdesc d-flex flex-c">
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <h3>{weather.weather[0].description}</h3>
        </div>
        <div className="tempstats d-flex flex-c">
              <h1>{weather.main.temp} <span>&deg;c</span></h1>
              <h3>Feels Like {weather.main.feels_like} <span>&deg;c</span></h3>
        </div>
        <div className="windstats d-flex">
            <Wind></Wind>
            <h3>Wind Speed : {weather.wind.speed} km/h</h3>
        </div>

        <div className="windstats d-flex">
            <h3>humidity : {weather.main.humidity} %</h3>
        </div>
      </div>
}
     {!weather.weather && <div className="content">
        <h4>No Data Found ! </h4>
      </div>}
    </div>
  );
}

export default App;
