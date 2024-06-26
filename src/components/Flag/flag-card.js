import React, { useContext } from "react";
import './_flag-card.scss';
import { CountryContext } from "../../App";


/**
 * Formats population number with commas
 * 
 * @returns {String}
 */
export function formatPopulation(population) {
  const [integerPart, decimalPart] = population.toString().split('.');

  const formattedInteger = parseInt(integerPart, 10).toLocaleString();

  if (decimalPart) {
      return `${formattedInteger}.${decimalPart}`;
  } else {
      return formattedInteger;
  }
}

const FlagCard = ({ image, countryName, population, region, capital }) => {
  const {darkTheme} = useContext(CountryContext);

  const formatedNumber = formatPopulation(population);

  return (
    <div className={`flag-card ${darkTheme ? 'dark' : ''}`}>
      <img src={image} alt="flag" />
      <div className="flag-info">
        <h2>{countryName}</h2>
        <p>
          <span>Population:</span>
          <span>{formatedNumber}</span>
        </p>
        <p>
          <span>Region:</span>
          <span>{region}</span>
        </p>
        <p>
          <span>Capital:</span>
          <span>{capital}</span>
        </p>
      </div>
    </div>
  )
}

export default FlagCard;