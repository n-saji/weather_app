import { WEATHER_API_URL, WEATHER_API_KEY } from "../../config/config.jsx";

export const WeatherDetails = (latitudes) => {
  const [lat, lon] = latitudes.latitudes.split(" ");

  if (!lat || !lon) {
    console.log("No data");
    return;
  }
  const currentWeatherFetch = fetch(
    `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  currentWeatherFetch
    .then((response) => response.json())
    .then((response_1) => {
      console.log(response_1);
    });
};
