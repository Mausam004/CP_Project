import React, { useState, useEffect } from 'react';
import './AdminRequestList.css';
import axios from 'axios';

const AdminRequestList = () => {
  const [placesData, setPlacesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(0);

  useEffect(() => {
    fetchPlaces(statusFilter);
  }, [statusFilter]);

  const fetchPlaces = (status) => {
    setLoading(true);
    setError(null);

    const apiUrl = 'http://localhost:8000/api/admin/get_request';

    // Make the API call
    axios
      .post(apiUrl, { status })
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data.data)) {
          setPlacesData(res.data.data);
        } else {
          setPlacesData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err.response || err.message);
        setError("Failed to load data.");
        setLoading(false);
      });
  };

  const handleFetchAllRequests = () => setStatusFilter(0);
  const handleFetchRejected = () => setStatusFilter(2);
  const handleFetchApproved = () => setStatusFilter(1);

  const handleApprove = (id) => {
    axios
      .put('http://localhost:8000/api/admin/update_request_status', {
        placeId: id,
        isApprove: 1,
      })
      .then((response) => {
        console.log(response.data);
        setPlacesData(placesData.filter((place) => place.id !== id));
      })
      .catch((err) => {
        console.error("Error approving place:", err.response || err.message);
      });
  };

  const handleReject = (id) => {
    axios
      .put('http://localhost:8000/api/admin/update_request_status', {
        placeId: id,
        isApprove: 2,
      })
      .then((response) => {
        console.log(response.data);
        setPlacesData(placesData.filter((place) => place.id !== id));
      })
      .catch((err) => {
        console.error("Error rejecting place:", err.response || err.message);
      });
  };

  return (
    <div className="admin-request-container">
      <div className="filter-buttons">
        <button onClick={handleFetchAllRequests}>All Requests</button>
        <button onClick={handleFetchRejected}>Rejected</button>
        <button onClick={handleFetchApproved}>Approved</button>
      </div>

      {loading ? <p>Loading...</p> : error ? <p>{error}</p> :
        <div>
          <h3>Request List</h3>
          {placesData.length > 0 ? (
            <table className="admin-request-table">
              <thead>
                <tr>
                  <th>Place Name</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Owner</th>
                  <th>City</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {placesData.map((place) => (
                  <tr key={place.id}>
                    <td>{place.place_name}</td>
                    <td>{place.location}</td>
                    <td>₹{place.price}</td>
                    <td>{place.owner_name}</td>
                    <td>{place.city || 'Not Available'}</td>
                    <td>{new Date(place.created_at).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleApprove(place.id)} className="approve-btn">
                        Approve
                      </button>
                      <button onClick={() => handleReject(place.id)} className="reject-btn">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No places available</p>
          )}
        </div>
      }
    </div>
  );
}

export default AdminRequestList;