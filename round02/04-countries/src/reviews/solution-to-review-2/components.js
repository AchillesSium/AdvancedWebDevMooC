export const Countries = ({ countries, handleClick }) => {
    const tooManyCountries = countries.length > 10;
    const multipleCountries = countries.length > 1 && countries.length <= 10;
    const singleCountry = countries.length === 1;
  
    const countriesList = countries.map((country) => {
      return (
        <div key={country.alpha3Code}>
          {country.name}{" "}
          <button onClick={handleClick} id={country.name}>
            Show
          </button>
        </div>
      );
    });
  
    return (
      <div>
        {tooManyCountries && "Too many matches, specify another filter"}
        {multipleCountries && <div>{countriesList}</div>}
        {singleCountry && <Country country={countries[0]} />}
      </div>
    );
  };

  const Country = ({ country }) => {
    const languagesList = country.languages.map((lang) => {
      return <li key={lang.iso639_2}>{lang.name}</li>;
    });
  
    return (
      <div>
        <h2>{country.name}</h2>
        <div>
          <span>
            <strong>Capital: </strong>
            {country.capital}
          </span>
          <br />
          <span>
            <strong>Population: </strong>
            {country.population}
          </span>
        </div>
        <div>
          <h3>Languages</h3>
          <ul>{languagesList}</ul>
        </div>
        <div>
          <img alt={"Country Flag"} width={"200px"} src={country.flag}></img>
        </div>
      </div>
    );
  };

  export const Filter = (props) => {
    return (
      <div>
        <label>find countries </label>
        <input onChange={props.onChange} value={props.value}></input>
      </div>
    );
  };

