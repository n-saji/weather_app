import { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import SERVER_API from "../../../config/config.jsx";

export const SearchBar = ({ setUserSelection }) => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [results, setResults] = useState();
  const [apiCall, setAPICall] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedInput.length < 3 || !apiCall) {
      return;
    }

    fetch(SERVER_API + "/cities?city=" + debouncedInput)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed!");
      })
      .then((data) => {
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
        console.log(error);
      });
  }, [debouncedInput, setResults]);

  const CitiesDropDown = () => {
    if (!dropdownVisible )  {
      return null;
    }
    if (results && results.length === 0) {
      return (
        <div className="cities-dropdown" ref={dropdownRef}>
          <div className="cities-dropdown-empty-item">
            No results found
          </div>
        </div>
      );
    }
    return (
      <div className="cities-dropdown" ref={dropdownRef}>
        {results &&
          results.length > 0 &&
          results.map((city) => (
            <div
              key={city.value}
              value={city.name}
              onClick={() => handleDropDownClick(city)}
              className="cities-dropdown-item"
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
    setDropdownVisible(false);
    setUserSelection(city);
  };

  const handleOnChange = (searchData) => {
    setDropdownVisible(true);
    setInput(searchData);
    setAPICall(true);
    if (searchData.length < 3) {
      setResults([]);
    }
  };

  return (
    <>
      <div className="search-bar">
        <label htmlFor="search">Search for a city</label>
        <div className="search-bar-input">
          <div className="search-bar-input-field">
            <input
              type="text"
              value={input}
              onChange={(e) => handleOnChange(e.target.value)}
              onFocus={() => setDropdownVisible(true)}
            />
          </div>
          <CitiesDropDown />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
