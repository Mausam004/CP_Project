import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Home() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const pages = ["Home", "About Us", "Contact"];

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <div
        className="min-vh-100 d-flex flex-column"
        style={{
          backgroundImage: `url("/images/image.png")`, // Replace with your hero image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white", // White text for contrast
          position: "relative",
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        ></div>

        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg px-4"
          style={{
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.7)", // semi-transparent navbar
          }}
        >
          <div className="container-fluid justify-content-end">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                {pages.map((page, index) => (
                  <li className="nav-item" key={index}>
                    <button
                      className={`nav-link btn btn-link ${
                        selectedPage === index ? "text-warning" : "text-white"
                      }`}
                      onClick={() => setSelectedPage(index)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div
          className="container d-flex flex-column justify-content-center align-items-center text-center"
          style={{ flex: 1, zIndex: 2 }}
        >
          <img
            src="/images/logo.png"
            alt="Ganpat University Logo"
            className="img-fluid"
            style={{ maxHeight: "100px" }}
          />
          <h1 className="mt-3 fw-bold">Ganpat University Bus Services</h1>
          <p className="lead">Safe and Reliable Transport for Students and Staff</p>

          {selectedPage === 0 && (
            <div className="text-center mt-4 px-4" style={{ maxWidth: "800px" }}>
              <p>
                Ganpat University provides transportation facilities from various
                locations. More than 52 luxury buses are regularly available for
                the use of students and staff commuting from the nearby cities of
                Ahmedabad, Gandhinagar, Idar, Himmatnagar, Vijapur, Deesa,
                Palanpur, Siddhpur, Unjha, Patan, Kadi, Kalol, Kheralu, Vadnagar,
                Visnagar, Chanasma, etc... In addition, State Transport bus
                services are also available at regular intervals. Transportation
                charges and routes are mentioned below.
              </p>
            </div>
          )}

          {selectedPage === 1 && (
            <div className="text-center mt-4 px-4" style={{ maxWidth: "800px" }}>
              <h2 className="fw-bold">About Us</h2>
              <p className="mt-3">
                Ganpat University Bus Services provides secure and timely
                transport solutions for students and staff members. Our buses
                cover all major routes across nearby cities.
              </p>
            </div>
          )}

          {selectedPage === 2 && (
            <div className="text-center mt-4 px-4" style={{ maxWidth: "800px" }}>
              <h2 className="fw-bold">Contact Us</h2>
              <p className="mt-3">
                Need assistance? Reach out to our transport desk for queries and
                support.
              </p>
              <ul className="list-unstyled">
                <li>
                  <strong>Email:</strong> transport@ganpatuni.ac.in
                </li>
                <li>
                  <strong>Phone:</strong> +91 12345 67890
                </li>
                <li>
                  <strong>Office:</strong> Ganpat University Campus, Mehsana
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ========== STATS BOXES SECTION ========== */}
      <section style={{ backgroundColor: "#008B8B", padding: "40px 0" }}>
        <div className="container">
          <div className="row text-white">
            <div className="col-md-3 mb-4">
              <div className="text-center p-3 border-0 rounded">
                <h2>52</h2>
                <p>Total Buses</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="text-center p-3 border-0 rounded">
                <h2>680+</h2>
                <p>Total Students From Ahmedabad and Gandhinagar</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="text-center p-3 border-0 rounded">
                <h2>1800+</h2>
                <p>Total Students From North Gujarat</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="text-center p-3 border-0 rounded">
                <h2>25+</h2>
                <p>Total City Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== GALLERY SECTION ========== */}
      <section style={{ backgroundColor: "#fff", padding: "40px 0" }}>
        <div className="container">
          <h2 className="text-center mb-4" style={{ color: "red" }}>
            Gallery
          </h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <img
                src="/images/busgallery1.png"
                alt="Bus 1"
                className="img-fluid rounded shadow"
                style={{
                  width: "100%",      // ensures responsiveness
                  height: "250px",    // fixed height
                  objectFit: "cover"  // scales & crops nicely
                }}
              />
            </div>
            <div className="col-md-4 mb-3">
              <img
                src="/images/busgallery2.png"
                alt="Bus 2"
                className="img-fluid rounded shadow"
                style={{
                  width: "100%",      // ensures responsiveness
                  height: "250px",    // fixed height
                  objectFit: "cover"  // scales & crops nicely
                }}
              />
            </div>
            <div className="col-md-4 mb-3">
              <img
                src="/images/bus2.PNG"
                alt="Bus 3"
                className="img-fluid rounded shadow"
                style={{
                  width: "100%",      // ensures responsiveness
                  height: "250px",    // fixed height
                  objectFit: "cover"  // scales & crops nicely
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
