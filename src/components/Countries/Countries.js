import React from "react";
import './_countries.scss';
import { useState, useEffect, useContext } from "react";
import { CountryContext } from "../../App";
import Country from "../../country";
import FlagCard from "../Flag/flag-card";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";



const Countries = () => {
  const { countries, setCountries } = useContext(CountryContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    setSelectedValue(value);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value.toLowerCase());
  };

  const countriesWithinRegion = (region) => {
    if (region === '') return countries;
    if (region === 'All') return countries;

    const regionCountries = countries.filter(country => country.region === region);

    return regionCountries
  }

  function compareStartsWith(word, matchLetters) {
    for (let i = 0; i < matchLetters.length; i++) {
      if (word[i] !== matchLetters[i]) {
        return false;
      }
    }

    return true;
  }

  function searchedCountries() {
    const searchedCountriesValue = countries.filter(country => compareStartsWith(country.name.common.toLowerCase(), inputValue));
    return searchedCountriesValue;
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = new Country();
        const countriesData = await data.getAllCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCountries();
  }, [setCountries]);

  const regionCountries = inputValue !== '' ? searchedCountries() : countriesWithinRegion(selectedValue);

  console.log(searchedCountries());

  return (
    <div className="countries-container">
      <div className="search-filter-container">
        <div className="search-bar">
          <SearchIcon />
          <input value={inputValue} onChange={handleInputChange} placeholder="Search for a country" />
        </div>
        <div className="filter-container">
          <div onClick={handleClick}>
            <span>Filter by Region</span>
            <KeyboardArrowDownIcon fontSize="small" />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(!selectedValue ? 'All' : selectedValue)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleClose('All')} sx={{ width: '200px' }}>All</MenuItem>
            <MenuItem onClick={() => handleClose('Africa')} sx={{ width: '200px' }}>Africa</MenuItem>
            <MenuItem onClick={() => handleClose('Americas')} sx={{ width: '200px' }}>Americas</MenuItem>
            <MenuItem onClick={() => handleClose('Asia')} sx={{ width: '200px' }}>Asia</MenuItem>
            <MenuItem onClick={() => handleClose('Europe')} sx={{ width: '200px' }}>Europe</MenuItem>
            <MenuItem onClick={() => handleClose('Oceania')} sx={{ width: '200px' }}>Oceania</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="countries">
        {regionCountries.length !== 0 ? (
          regionCountries.map(country => (
            <Link to={`/${country.name.common}`}>
              <FlagCard
                image={country.flags.png}
                countryName={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital}
              />
            </Link>
          ))) : (
          <h1 className="no-countries">No Countries found</h1>
        )}
      </div>
    </div>
  )
}

export default Countries;