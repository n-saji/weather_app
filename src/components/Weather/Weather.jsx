import { useEffect, useState } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../../config/config.jsx";

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
      });
  }, [lat, lon]);

  console.log(weatherData);

    return (
      <div className="weather">
        <div className="top">
          <div>
            {/* <p className="city">{weatherData.city}</p> */}
            <p className="weather-description">
              {weatherData.weather[0].description}
            </p>
          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${weatherData.weather[0].icon}.png`}
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Details</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(weatherData.main.feels_like)}°C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">
                {weatherData.wind.speed} m/s
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">
                {weatherData.main.humidity}%
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">
                {weatherData.main.pressure} hPa
              </span>
            </div>
          </div>
        </div>
      </div>
    );
};
