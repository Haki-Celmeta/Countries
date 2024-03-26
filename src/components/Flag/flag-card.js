import React from "react";
import './_flag-card.scss';


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

  const formatedNumber = formatPopulation(population);

  return (
    <div className="flag-card">
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