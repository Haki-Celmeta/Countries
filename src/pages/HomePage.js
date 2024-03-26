import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Countries from "../components/Countries/Countries";

function HomePage() {
  useEffect(() => {
    window.scroll(0, 0);
  })

  return (
    <div className="home-page">
      <Navbar />
      <Countries />
    </div>
  );
}

export default HomePage;
