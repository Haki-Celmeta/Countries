import React, {useEffect} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import HomePage from './pages/HomePage';
import CountryInfo from './pages/CountryInfo';
import { createContext } from 'react';
import Country from "./country";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:name",
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
        const data = new Country();
        const countriesData = await data.getAllCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCountries();
  }, []);

  console.log(countries);

  return (
    <CountryContext.Provider value={{countries, setCountries, darkTheme, setDarkTheme}}>
      <RouterProvider router={router} />
    </CountryContext.Provider>
  )
}

export default App;