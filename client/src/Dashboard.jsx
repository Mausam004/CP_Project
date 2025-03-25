import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState("home");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={styles.navbar}>
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">Ganpat University Bus Services</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {["home", "cities", "pass", "facilities", "features"].map((feature) => (
                <li className="nav-item" key={feature}>
                  <button
                    className={`nav-link btn btn-link ${selectedFeature === feature ? "text-warning" : "text-white"}`}
                    onClick={() => setSelectedFeature(feature)}
                  >
                    {feature === "home" && "Home"}
                    {feature === "cities" && "Cities & Fees"}
                    {feature === "pass" && "Bus Pass"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="container mt-5 text-center">
        {/* University Logo */}
        <img
          src="/images/guni1.png"
          alt="University Logo"
          className="img-fluid mb-3"
          style={{ maxWidth: "150px" }}
        />

        {/* Render Sections */}
        {selectedFeature === "home" && (
          <div className="p-4 rounded shadow" style={styles.card}>
            <h2 className="mb-3">Welcome to Ganpat University Buses</h2>
            <p className="text-muted">You are logged in successfully.</p>
            <div className="row mt-4">
              <div className="col-md-6 mb-3">
                <img
                  src="/images/bus1.PNG"
                  alt="Bus 1"
                  className="img-fluid rounded shadow"
                  style={styles.busImage}
                />
              </div>
              <div className="col-md-6 mb-3">
                <img
                  src="/images/bus2.PNG"
                  alt="Bus 2"
                  className="img-fluid rounded shadow"
                  style={styles.busImage}
                />
              </div>
            </div>
          </div>
        )}

        {selectedFeature === "cities" && (
          <div className="p-4 rounded shadow" style={styles.card}>
            <h2 className="mb-3">Bus Service Cities & Fees</h2>cd client
            <table className="table table-striped table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>City</th>
                  <th>Fees (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Ahmedabad</td><td>₹15000</td></tr>
                <tr><td>Gandhinagar</td><td>₹14000</td></tr>
                <tr><td>Mehsana</td><td>₹5000</td></tr>
                <tr><td>Visnagar</td><td>₹7000</td></tr>
                <tr><td>Patan</td><td>₹12000</td></tr>
                <tr><td>Palanpur</td><td>₹13500</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Logout Button */}
        <button
          className="btn btn-warning mt-4 px-4 py-2 fw-bold"
          onClick={handleLogout}
          style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

// ✅ Styles Object
const styles = {
  body: {
    background: "linear-gradient(120deg, #f6f9fc, #e9f0f9)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  navbar: {
    background: "linear-gradient(to right, #004e92, #000428)",
  },
  card: {
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    borderRadius: "12px",
  },
  busImage: {
    maxHeight: "300px",
    width: "100%",
    borderRadius: "10px",
    transition: "transform 0.3s ease",
  },
  logoutButton: {
    transition: "all 0.3s ease",
  },
};
