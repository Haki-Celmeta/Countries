import React from "react";
import './_countries.scss';
import { useState, useEffect, useContext } from "react";
import { CountryContext } from "../../App";
import FlagCard from "../Flag/flag-card";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Tooltip from '@mui/material/Tooltip';

const Countries = () => {
  const { countries } = useContext(CountryContext);
  const { darkTheme } = useContext(CountryContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);
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
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const regionCountries = inputValue !== '' ? searchedCountries() : countriesWithinRegion(selectedValue);

  console.log(countries);

  return (
    <div className={`countries-container ${darkTheme ? 'dark': ''}`}>
      <div className="search-filter-container">
        <div className={`search-bar ${darkTheme ? 'dark' : ''}`}>
          <SearchIcon />
          <input value={inputValue} onChange={handleInputChange} placeholder="Search for a country" />
        </div>
        <div className={`filter-container ${darkTheme ? 'dark' : ''}`}>
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
            sx={{'& .MuiList-root': {
                bgcolor: darkTheme ? 'hsl(209, 23%, 22%) !important' : '#fff', 
                color: darkTheme ? '#fff' : '#000',
                '&:hover': {bgcolor: darkTheme ? 'hsl(207, 20%, 33%)': 'rgba(0, 0, 0, 0.04)'}}}}
          >
            <MenuItem 
              onClick={() => handleClose('All')} 
              sx={{ width: '200px', 
                '&:hover': {bgcolor: darkTheme ? 'hsl(207, 20%, 33%)': 'rgba(0, 0, 0, 0.04)'} }}
            >
              All
            </MenuItem>
            <MenuItem 
              onClick={() => handleClose('Africa')} 
              sx={{ width: '200px',
                '&:hover': {bgcolor: darkTheme ? 'hsl(207, 20%, 33%)': 'rgba(0, 0, 0, 0.04)'}  }}
            >
              Africa
            </MenuItem>
            <MenuItem 
              onClick={() => handleClose('Americas')} 
              sx={{ width: '200px',
                '&:hover': {bgcolor: darkTheme ? 'hsl(207, 20%, 33%)': 'rgba(0, 0, 0, 0.04)'}  }}
            >
              Americas
            </MenuItem>
            <MenuItem 
              onClick={() => handleClose('Asia')} 
              sx={{ width: '200px',
                '&:hover': {bgcolor: darkTheme ? 'hsl(207, 20%, 33%)': 'rgba(0, 0, 0, 0.04)'}  }}
            >
              Asia
            </MenuItem>
            <MenuItem 
              onClick={() => handleClose('Europe')} 
              sx={{ width: '200px',
                '&:hover': {bgcolor: darkTheme ? 'hsl(207, 20%, 33%)': 'rgba(0, 0, 0, 0.04)'}  }}
            >
              Europe
            </MenuItem>
            <MenuItem 
              onClick={() => handleClose('Oceania')} 
              sx={{ width: '200px',
                '&:hover': {bgcolor: darkTheme ? 'hsl(207, 20%, 33%)': 'rgba(0, 0, 0, 0.04)'}  }}
            >
              Oceania
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="countries">
        {regionCountries.length !== 0 ? (
          regionCountries.map(country => (
            <Link to={`/Countries/${country.name.common}`}>
              <FlagCard
                image={country.flags && country.flags.png ? country.flags.png : null}
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

      <Tooltip title="Go to top" arrow disableInteractive>
        <div 
          className={`move-to-top ${isVisible ? 'show' : ''}`}
          onClick={handleScrollToTop}
        >
          <div>
            <KeyboardDoubleArrowUpIcon />
          </div>
        </div>
      </Tooltip>
    </div>
  )
}

export default Countries;