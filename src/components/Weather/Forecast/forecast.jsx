import { useState, useEffect } from "react";
import "./forecast.css";
import { SERVER_API } from "../../../config/config.jsx";
import axios from "axios";

export const Forecast = ({ lat, lon }) => {
  const [foreCastData, setForeCastData] = useState(null);
  if (!lat || !lon) {
    return;
  }
  useEffect(() => {
    axios
      .get(SERVER_API + `/weather/forecast?lat=${lat}&lon=${lon}`)
      .then((response) => {
        setForeCastData(response.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lat, lon]);

  if (!foreCastData) {
    return <div className="loader">Loading...</div>;
  }

  const htmlTemplate = foreCastData.map((forecast, index) => {
    const d = new Date(forecast.dt * 1000);
    let hoursFormatted =
      d.getHours() > 12 ? d.getHours() - 12 + " PM" : d.getHours() + " AM";
    let timeString = d.getDate() + "/" + (d.getMonth() + 1);

    return (
      <div className="forecast-item" key={index}>
        <p className="forecast-time">{timeString}</p>
        <p>{hoursFormatted}</p>
        <img
          alt="weather"
          className="forecast-icon"
          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
        />
        <p className="forecast-temperature">
          {Math.round(forecast.main.temp)}°C
        </p>
      </div>
    );
  });

  return <div className="forecast">{htmlTemplate}</div>;
};
