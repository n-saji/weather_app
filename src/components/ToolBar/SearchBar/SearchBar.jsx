import { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import { SERVER_API } from "../../../config/config.jsx";

export const SearchBar = ({ setUserSelection }) => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [results, setResults] = useState();
  const [apiCall, setAPICall] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const dropdownRef = useRef(null);
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    setResults([]);

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
              countryCode: `${city.country}`,
            };
          }) || []
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [debouncedInput, setResults]);

  const CitiesDropDown = () => {
    if (!dropdownVisible) {
      return null;
    }
    if (!loader && results && results.length === 0 && input.length > 0) {
      return (
        <div className="cities-dropdown" ref={dropdownRef}>
          <div className="cities-dropdown-empty-item">No results found</div>
        </div>
      );
    }
    return (
      <div className="cities-dropdown" ref={dropdownRef}>
        {loader && <div className="loader">Loading...</div>}
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
            <img
              src="https://img.icons8.com/ios/30/search--v1.png"
              alt="search"
              className="serach-button"
              onClick={() => setDropdownVisible(true)}
            />
          </div>
          <CitiesDropDown />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
