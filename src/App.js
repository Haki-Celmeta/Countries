import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import HomePage from './pages/HomePage';
import CountryInfo from './pages/CountryInfo';
import { createContext } from 'react';

const router = createBrowserRouter([
  {
    path: "/Countries",
    element: <HomePage />,
  },
  {
    path: "/Countries/:name",
    element: <CountryInfo />
  }
]);

export const CountryContext = createContext({})

const App = () => {
  const [countries, setCountries] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await fetch('https://restcountries.com/v3.1/all');
        const data = await countriesData.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCountries();
  }, []);

  return (
    <CountryContext.Provider value={{ countries, setCountries, darkTheme, setDarkTheme }}>
      {countries.length > 200 ? (
        <RouterProvider router={router} />
      ) : (
        <div id="loading">Loading...</div>
      )}
    </CountryContext.Provider>
  )
}

export default App;