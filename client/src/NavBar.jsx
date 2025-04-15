import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <span className="black-text">Transportation</span>
        <span className="blue-text">Services</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-link-detail">
        <ul className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/about-us" className={location.pathname === "/about-us" ? "active" : ""}>About Us</Link>
          <Link to="/service" className={location.pathname === "/service" ? "active" : ""}>Services</Link>
          <Link to="/contacts" className={location.pathname === "/contacts" ? "active" : ""}>Contacts</Link>
        </ul>
      </div>

      {/* Login & Register Buttons */}
      <div className="nav-actions" style={{ display: "flex", gap: "20px" }}>
        <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
        <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
      </div>
    </nav>
  );
}
