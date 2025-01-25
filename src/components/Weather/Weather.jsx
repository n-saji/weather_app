import { useEffect, useState } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../../config/config.jsx";
import "./Weather.css";

export const WeatherDetails = (data) => {
  if (!data.userSelection) {
    console.log("No weatherData");
    return;
  }
  console.log(data.userSelection.value);
  const [lat, lon] = data.userSelection.value.split(" ");
  const [weatherData, setWeatherData] = useState(null);

  if (!lat || !lon) {
    console.log("No weatherData");
    return;
  }
  useEffect(() => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    currentWeatherFetch
      .then((response) => response.json())
      .then((response_1) => {
        console.log(response_1);
        setWeatherData(response_1);
        setWeatherData({ city: data.userSelection.name, ...response_1 });
      }).catch((error) => {
        console.log(error);
        return
      });
  }, [lat, lon]);

  console.log(weatherData);
  if (!weatherData) { 
    return <div>Loading...</div>;
  }

    return (
      <div className="weather">
        <div className="top">
          <div>
            {<p className="city">{weatherData.city}</p> }
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