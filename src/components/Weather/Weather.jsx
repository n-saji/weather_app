import { useEffect, useState } from "react";
import "./Weather.css";
import SERVER_API from "../../config/config.jsx";

export const WeatherDetails = (data) => {
  if (!data.userSelection) {
    return;
  }
  const [lat, lon] = data.userSelection.value.split(" ");
  const [weatherData, setWeatherData] = useState(null);

  if (!lat || !lon) {
    return;
  }
  useEffect(() => {
    const currentWeatherFetch = fetch(
      SERVER_API + `/weather?lat=${lat}&lon=${lon}`
    );
    currentWeatherFetch
      .then((response) => response.json())
      .then((response_1) => {
        setWeatherData(response_1);
        setWeatherData({ city: data.userSelection.name, ...response_1 });
      })
      .catch((error) => {
        return error;
      });
  }, [lat, lon]);

  if (!weatherData) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="weather">
      <div className="top">
        <div>
          {<p className="city">{weatherData.city}</p>}
          <p className="weather-description">
            {weatherData.weather[0].description}
          </p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like: </span>
            <span className="parameter-value">
              {Math.round(weatherData.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind: </span>
            <span className="parameter-value">
              {weatherData.wind.speed} m/s
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity: </span>
            <span className="parameter-value">
              {weatherData.main.humidity}%
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure: </span>
            <span className="parameter-value">
              {weatherData.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
{
    "coord": {
        "lon": 71.5167,
        "lat": 37.6833
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": -29.83,
        "feels_like": -36.83,
        "temp_min": -29.83,
        "temp_max": -29.83,
        "pressure": 1073,
        "humidity": 29,
        "sea_level": 1073,
        "grnd_level": 667
    },
    "visibility": 10000,
    "wind": {
        "speed": 2.24,
        "deg": 195,
        "gust": 2.16
    },
    "clouds": {
        "all": 8
    },
    "dt": 1737773648,
    "sys": {
        "country": "TJ",
        "sunrise": 1737771784,
        "sunset": 1737808146
    },
    "timezone": 16200,
    "id": 1221328,
    "name": "Khorugh",
    "cod": 200
}
*/
