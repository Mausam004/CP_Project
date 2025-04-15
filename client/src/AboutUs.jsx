import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Your trusted university bus transportation service</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="about-content">
        {/* 🏆 Our Mission */}
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            Our goal is to provide **safe, comfortable, and efficient** transportation for all 
            students and faculty members at Ganpat University.  
            We strive to offer **on-time, well-maintained, and secure** buses that ensure a 
            smooth journey to and from the university.
          </p>
          <p>
            Our commitment is to create a **hassle-free commuting experience** with 
            well-trained drivers, GPS tracking, and **round-the-clock assistance**.  
            We believe that a stress-free commute contributes to a **better learning environment**.
          </p>
        </section>

        {/* 🛡️ Why Choose Us? (Top: Safety, Bottom: Comfort) */}
        <section className="why-choose">
          <h2>Why Choose Us?</h2>

          {/* 🔹 Safety First (Top Section) */}
          <div className="feature-top">
            <img src="/images/safety.png" alt="Safety" className="feature-img" />
            <div className="feature-text">
              <h3>Safe & Secure Transportation</h3>
              <p>
                Your safety is our **top priority**. Our buses are equipped with **CCTV cameras, GPS tracking**,  
                and **emergency contact systems** to ensure maximum security.  
                Our drivers undergo **regular training** for safe driving practices.
              </p>
            </div>
          </div>

          {/* 🏡 Comfort & Convenience (Bottom Section) */}
          <div className="feature-bottom">
            <img src="/images/confort.png" alt="Comfort" className="feature-img" />
            <div className="feature-text">
              <h3>Comfortable & Well-Maintained Buses</h3>
              <p>
                We ensure **spacious, air-conditioned, and well-maintained** buses for a smooth and relaxing ride.  
                Seating is designed for **maximum comfort**, ensuring you arrive at your destination refreshed.
              </p>
            </div>
          </div>
        </section>

        {/* 🚍 Gallery Section */}
        <section className="gallery">
          <h2>Our Bus Fleet</h2>
          <div className="gallery-container">
            <img src="/images/busgallery1.png" alt="Bus 1" />
            <img src="/images/busgallery2.png" alt="Bus 2" />
            <img src="/images/busgallery3.png" alt="Bus 3" />
            <img src="/images/busgallery4.png" alt="Bus 4" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
