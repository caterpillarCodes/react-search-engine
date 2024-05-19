import "./styles.css";
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [objectData, setObjectData] = useState("");
  function updateWeatherData(response) {
    setObjectData({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    console.log(objectData);
  }
  function search() {
    let aipkey = "f09d3949047ab6c9e3bcaf79cf61f619";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${aipkey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherData);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  if (objectData) {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            onChange={updateCity}
            placeholder="type a city..."
            required
          />
          <input type="submit" value={"Search"} />
        </form>
        <h3>{city}</h3>
        <img src={objectData.icon} alt="icon" />
        <ul>
          <li>Temperature: Math.round({objectData.temperature})°C</li>
          <li>Description: {objectData.description}</li>
          <li>Humidity: {objectData.humidity}%</li>
          <li>Wind: {objectData.wind}km/h</li>
        </ul>
      </div>
    );
  } else
    return (
      <div className="App">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            onChange={updateCity}
            placeholder="type a city..."
            required
          />
          <input type="submit" value={"Search"} />
        </form>
      </div>
    );
}
