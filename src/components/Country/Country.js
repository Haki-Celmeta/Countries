import React, { useContext } from "react";
import './_country.scss';
import { useParams } from "react-router-dom";
import { CountryContext } from "../../App";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatPopulation } from "../Flag/flag-card";

const Country = () => {
  const { name } = useParams();
  const { countries, darkTheme } = useContext(CountryContext);

  const country = countries.filter(country => country.name.common === name)[0];

  function findBorderCountry(borderCca3) {
    for (let i = 0; i < countries.length; i++) {
      if (borderCca3 === countries[i].cca3) {
        return countries[i].name.common;
      }
    }
    return null;
  }

  const handleBackButtonClick = () => {
    window.history.back();
  };

  return (
    <div className={`country-container ${darkTheme ? 'dark': ''}`}>
      <button id="back-button" onClick={handleBackButtonClick}>
        <ArrowBackIcon fontSize="small" />
        <span>Back</span>
      </button>
      <div className="country-information-container">
        <div className="flag-container">
          <img src={country.flags && country.flags.png ? country.flags.png : null} alt="flag" />
        </div>
        <div className="country-info">
          <h1>{country.name.common}</h1>
          <div className="information">
            <p className="native-names-container">
              <span>Native Name:</span>
              <span>
                {country.name.nativeName !== undefined ? (
                  Object.entries(country.name.nativeName).map(([key, value]) => (
                    <span key={key}>{value.common}</span>
                  ))) : (
                  <span className="notfound-span">Not Found</span>
                )
                }
              </span>
            </p>
            <p>
              <span>Population:</span>
              <span>
                {formatPopulation(country.population)}
              </span>
            </p>
            <p>
              <span>Region:</span>
              <span>
                {country.region !== undefined ? country.region : <span className="notfound-span">No Region</span>}
              </span>
            </p>
            <p>
              <span>Sub Region:</span>
              <span>
                {country.subregion !== undefined ? country.subregion : (<span className="notfound-span">No Subregion</span>)}
              </span>
            </p>
            <p>
              <span>Capital:</span>
              <span>
                {country.capital !== undefined ? country.capital[0] : (<span className="notfound-span">No Capital</span>)}
              </span>
            </p>
            <p>
              <span>Top Level Domain:</span>
              <span>
                {country.tld !== undefined ? country.tld[0] : (<span className="notfound-span">No Domain</span>)}
              </span>
            </p>
            <p>
              <span>Currencies:</span>
              <span>
                {country.currencies !== undefined ? (
                  Object.entries(country.currencies).map(([key, value]) => (
                    <span key={key}>{value.name}</span>
                  ))) : (
                  <span className="notfound-span">No Currencies</span>
                )}
              </span>
            </p>
            <p className="languages">
              <span>Languages:</span>
              <span>
                {country.languages !== undefined ? (
                  Object.entries(country.languages).map(([key, value]) => (
                    <span key={key}>{value}</span>
                  ))) : (
                  <span className="notfound-span">No Languages</span>
                )}
              </span>
            </p>
          </div>
          <div className="borders-container">
            <span>Border Countries:</span>
            <div className="borders">
              {country.borders !== undefined ? (
                country.borders.map((border, index) => (
                  <span key={index}>{findBorderCountry(border)}</span>
                ))) : (
                <span className="notfound-span">No border countries</span>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Country;