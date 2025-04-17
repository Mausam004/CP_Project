import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "./NavBar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Simulate user login status (null means not logged in)
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      console.log("storedUser",storedUser)
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });
  return (
    <nav className="navbar">
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
          {user && (
    <Link to="/buspass" className={location.pathname === "/buspass" ? "active" : ""}>
      Bus Pass
    </Link>
  )}
        </ul>
      </div>

      {/* Profile Icon or Register (if not logged in) */}
      <div className="nav-actions">
        {user ? (
          location.pathname === "/profile" ? (
            <div className="profile-dropdown">
              <ul className="profile-menu">
                <li onClick={() => navigate("/profile")}>My Profile</li>
              </ul>
            </div>
          ) : (
            <FaUserCircle 
              className="profile-icon" 
              size={28} 
              onClick={() => navigate("/profile")} 
            />
          )
        ) : (
          <button className="register-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        )}
      </div>
    </nav>
  );
}
