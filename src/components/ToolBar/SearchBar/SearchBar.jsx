// import { useState } from "react";
// import { GEO_API_URL, GEO_OPTIONS } from "../../../config/config.jsx";
// import { AsyncPaginate } from "react-select-async-paginate";

// export const SearchBar = ({ setResults }) => {
//   const [input, setInput] = useState("");

//   // const loadOptions = async (inputData) => {
//   //   const response = await fetch(GEO_API_URL + `/cities?namePrefix=${inputData}`, GEO_OPTIONS);
//   //   const response_1 = await response.json();
//   //   return {
//   //     options: response_1.data.map((city) => {
//   //       return {
//   //         value: `${city.latitude} ${city.longitude}`,
//   //         label: `${city.name}, ${city.countryCode}`,
//   //       };
//   //     }),
//   //   };
//   // };
//   const loadCities = (inputData) => {
//     const response = fetch(
//       GEO_API_URL + `/cities?namePrefix=${inputData}`,
//       GEO_OPTIONS
//     )
//       .then((response) => response.json())
//       .then((response_1) => {
//         console.log(response_1);
//         return response_1.data.map((city) => {
//           return {
//             value: `${city.latitude} ${city.longitude}`,
//             label: `${city.name}, ${city.countryCode}`,
//           };
//         });
//       });

//     // return <div>{response}</div>;
//   };

//   const handleOnChange = (searchData) => {
//     setInput(searchData);
//     setResults(searchData);
//   };

//   return (
//     // <AsyncPaginate
//     //   placeholder="Search for city"
//     //   debounceTimeout={1000}
//     //   value={input}
//     //   onChange={handleOnChange}
//     //   loadOptions={loadOptions}
//     // />
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Search for city"
//         value={input}
//         onChange={(e) => handleOnChange(e.target.value)}
//       />
//       {loadCities(input)}
//     </div>
//   );
// };

// export default SearchBar;

import { useState, useEffect } from "react";
import { GEO_API_URL, GEO_OPTIONS } from "../../../config/config.jsx";

export const SearchBar = ({ setLatitudes }) => {
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
              onClick={() => handleDropDownClick(city.name, city.value)}
            >
              {city.name + ", " + city.countryCode}
            </div>
          ))}
      </div>
    );
  };

  const handleDropDownClick = (city, value) => {
    setInput(city);
    setAPICall(false);
    setResults([]);
    setLatitudes(value);
  };

  const handleOnChange = (searchData) => {
    setInput(searchData);
    setAPICall(true);
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
