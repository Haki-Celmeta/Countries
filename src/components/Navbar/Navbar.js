import React, {useContext} from "react";
import './_navbar.scss';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { CountryContext } from "../../App";
import { Button } from "@mui/material";

const Navbar = () => {
  const { darkTheme, setDarkTheme } = useContext(CountryContext);

  const handleClick = () => {
    setDarkTheme(!darkTheme);
  }

  return (
    <div className={`navbar-container ${darkTheme ? 'dark': ''}`}>
      <h1>Where in the world?</h1>
      <Button sx={{color: '#000'}} onClick={handleClick}>
        <div className={`theme-change-container ${darkTheme ? 'dark': ''}`}>
          {darkTheme ? <LightModeIcon sx={{color: '#fff'}} fontSize="small"/> : <DarkModeIcon fontSize="small"/>}
          <span>Dark Mode</span>
        </div>
      </Button>
    </div>
  )
}

export default Navbar;