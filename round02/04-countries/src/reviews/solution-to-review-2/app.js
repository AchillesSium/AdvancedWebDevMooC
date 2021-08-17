import {useState, useEffect} from 'react'
import axios from 'axios'
import {Countries, Filter} from './components'
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '8d49a1e';
// ------------------------------------------------------------ //

const baseUrl = "https://restcountries.eu/rest/v2/all"

export const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [hasFilter, setHasFilter] = useState(false);

  const fetchCountries = () => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(fetchCountries, []);

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(countryFilter.toLowerCase());
  });

  const hasExactMatch = filteredCountries.some((country) => {
    return country.name.toLowerCase() === countryFilter.toLowerCase();
  });

  let exactFilteredCountries;
  if (hasExactMatch) {
    exactFilteredCountries = filteredCountries.filter((country) => {
      return country.name.toLowerCase() === countryFilter.toLowerCase();
    });
  }

  const handleChange = (event) => {
    setCountryFilter(event.target.value);
    if (event.target.value === "") setHasFilter(false);
    else setHasFilter(true);
  };

  const handleClick = (event) => {
    setCountryFilter(event.target.id);
  };

  return (
    <div>
      <Filter onChange={(event) => handleChange(event)} value={countryFilter} />
      {hasFilter && hasExactMatch && (
        <Countries countries={exactFilteredCountries} />
      )}
      {hasFilter && !hasExactMatch && (
        <Countries
          countries={filteredCountries}
          handleClick={(event) => handleClick(event)}
        />
      )}
    </div>
  );
}

