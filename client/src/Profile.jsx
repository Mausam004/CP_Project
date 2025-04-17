import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css"; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      navigate("/"); 
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUser(null);
    navigate("/"); 
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-details">
          <h2>Profile</h2>
          <div className="profile-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {/* You can add more fields as per the user data */}
          </div>
          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p> // Display loading message while user data is being fetched
      )}
    </div>
  );
};

export default Profile;