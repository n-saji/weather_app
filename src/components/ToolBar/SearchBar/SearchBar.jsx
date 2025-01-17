import { useState, useEffect } from "react";
import { GEO_API_URL, GEO_OPTIONS } from "../../../config/config.jsx";

export const SearchBar = ({ setUserSelection }) => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [results, setResults] = useState();
  const [apiCall, setAPICall] = useState(true);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    console.log(debouncedInput, apiCall);
    if (debouncedInput.length < 3 || !apiCall) {
      return;
    }

    fetch(GEO_API_URL + `/cities?namePrefix=${debouncedInput}`, GEO_OPTIONS)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed!");
      })
      .then((data) => {
        console.log(data);
        setResults(
          data.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              name: `${city.name}`,
              countryCode: `${city.countryCode}`,
            };
          }) || []
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [debouncedInput, setResults]);

  const CitiesDropDown = () => {
    return (
      <div className="cities-dropdown">
        {results &&
          results.length > 0 &&
          results.map((city) => (
            <div
              key={city.value}
              value={city.name}
              onClick={() => handleDropDownClick(city)}
            >
              {city.name + ", " + city.countryCode}
            </div>
          ))}
      </div>
    );
  };

  const handleDropDownClick = (city) => {
    setInput(city.name);
    setAPICall(false);
    setResults([]);
    setUserSelection(city);
  };

  const handleOnChange = (searchData) => {
    setInput(searchData);
    setAPICall(true);
    if (searchData.length < 3) {
      setResults([]);
    }
  };

  return (
    <div className="search-bar">
      <label htmlFor="search">Search for a city</label>
      <input
        type="text"
        value={input}
        onChange={(e) => handleOnChange(e.target.value)}
        // placeholder="Search for a city..."
      />
      <CitiesDropDown />
    </div>
  );
};

export default SearchBar;
