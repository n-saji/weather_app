export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const GEO_API_KEY = process.env.GEO_API_KEY;
export const GEO_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": GEO_API_KEY,
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  },
};

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY
