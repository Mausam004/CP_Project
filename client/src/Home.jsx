import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import NavBar from "./NavBar";

const transportData = [
  { id: 1, city: "Ahmedabad", fee: "15,000" },
  { id: 2, city: "Gandhinagar", fee: "15,000" },
  { id: 3, city: "Mehsana", fee: "9,000" },
  { id: 4, city: "Himmatnagar", fee: "13,000" },
  { id: 5, city: "Vijapur", fee: "11,000" },
  { id: 6, city: "Unjha", fee: "11,000" },
  { id: 7, city: "Siddhpur", fee: "11,000" },
  { id: 8, city: "Visnagar", fee: "9,000" },
  { id: 9, city: "Palanpur", fee: "15,000" },
  { id: 10, city: "Patan", fee: "11,000" },
  { id: 11, city: "Deesa", fee: "15,000" },
  { id: 12, city: "Idar", fee: "13,000" },
  { id: 13, city: "Modasa", fee: "13,000" },
  { id: 14, city: "Bayad", fee: "13,000" },
  { id: 15, city: "Bhiloda", fee: "13,000" },
  { id: 16, city: "Khedbrahma", fee: "13,000" },
  { id: 17, city: "Balisana", fee: "11,000" },
  { id: 18, city: "Kalol", fee: "11,000" },
  { id: 19, city: "Kadi", fee: "11,000" },
  { id: 20, city: "Satlasana", fee: "15,000" },
  { id: 21, city: "Kheralu", fee: "13,000" },
  { id: 22, city: "Vadnagar", fee: "11,000" },
  { id: 23, city: "Visnagar", fee: "9,000" },
  { id: 24, city: "Chansma", fee: "11,000" },
];

function Home() {
  return (
    <>
      <NavBar />
      <div className="hero-container">
        <video autoPlay loop muted className="hero-video">
          <source src="public/images/bus1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
        <div className="hero-content">
          <h2>WELCOME TO</h2>
          <h1>Ganpat University</h1>
          <h1>Bus Services</h1>
          <p>Your trusted travel partner, ensuring safety & comfort.</p>
        </div>
      </div>

      {/* ✅ Updated section & table class names */}
      <section className="transportation-section">
        <h2>Transportation Routes & Fees</h2>
        <table className="transportation-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>City</th>
              <th>Fee (INR)</th>
            </tr>
          </thead>
          <tbody>
            {transportData.map((route) => (
              <tr key={route.id}>
                <td>{route.id}</td>
                <td>{route.city}</td>
                <td>{route.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Home;
