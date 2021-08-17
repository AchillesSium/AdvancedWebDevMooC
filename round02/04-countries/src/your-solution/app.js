import React, { useState, useEffect } from "react";
import axios from "axios";
import { Country, Filter, Countries } from './components'
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '5875f2b01a53d0d1bbf447186ee6f044bfca782f';
// ------------------------------------------------------------ //

export const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [availableFilter, setAvailableFilter] = useState(false);

  const fetchCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(fetchCountries, []);

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(countryFilter.toLowerCase());
  });

  const sameMatch = filteredCountries.some((country) => {
    return country.name.toLowerCase() === countryFilter.toLowerCase();
  });

  let filteringCountries;
  if (sameMatch) {
    filteringCountries = filteredCountries.filter((country) => {
      return country.name.toLowerCase() === countryFilter.toLowerCase();
    });
  }

  const handleChange = (event) => {
    setCountryFilter(event.target.value);

    if (event.target.value === "") setAvailableFilter(false);
    else setAvailableFilter(true);
  };

  const handleClick = (event) => {
    setCountryFilter(event.target.id);
  };

  return (
    <div>
      <h1>Data For Countries</h1>
      <Filter onChange={(event) => handleChange(event)} value={countryFilter} />
      {availableFilter && sameMatch && (
        <Countries countries={filteringCountries} />
      )}
      {availableFilter && !sameMatch && (
        <Countries
          countries={filteredCountries}
          handleClick={(event) => handleClick(event)}
        />
      )}
    </div>
  );
}



