import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import NavBar from "./NavBar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />

      <div className="hero-container">
        <div className="overlay"></div>
        <div className="hero-content">
          <h2>WELCOME TO</h2>
          <h1>Ganpat University </h1>
            <h1>Bus Services</h1>
            <p>Your trusted travel partner, ensuring safety & comfort.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
