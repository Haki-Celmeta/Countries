import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Countries from "../components/Countries/Countries";
import { CountryContext } from "../App";

function HomePage() {
  const {darkTheme} = useContext(CountryContext);

  useEffect(() => {
    window.scroll(0, 0);
  })

  return (
    <div className={`home-page ${darkTheme ? 'dark' : ''}`}>
      <Navbar />
      <Countries />
    </div>
  );
}

export default HomePage;
