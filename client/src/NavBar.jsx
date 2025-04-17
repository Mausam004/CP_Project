import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
export default function NavBar() {
  const navigate = useNavigate();

  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    console.log("storeduser",storedUser)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log(user)
    } else {
      setUser(null);
    }
  }, [location.pathname]); // updates on route change
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

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
          {user && (
    <Link to="/buspass" className={location.pathname === "/buspass" ? "active" : ""}>
      Bus Pass
    </Link>
  )}
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className="nav-actions" style={{ display: "flex", gap: "20px" }}>
  {user ? (
    <>
      {user.role === "admin" && (
        <button onClick={() => navigate("/admin-dashboard")}>
          Admin Dashboard
        </button>
      )}

      {/* ✅ This part was broken — now fixed */}
      {location.pathname === "/profile" ? (
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
      )}

     
    </>
  ) : (
    <>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  )}
</div>
    </nav>
  );
}
