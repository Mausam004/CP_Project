import React, { useState, useEffect } from 'react';
import './AdminRequestList.css';
import axios from 'axios';

const AdminRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const fetchRequests = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/admin/requests", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        let data = res.data;
        if (statusFilter !== "all") {
          data = data.filter(item => item.status === statusFilter);
        }
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      });
  };

  const updateStatus = (id, newStatus) => {
    const token = localStorage.getItem("token");

    axios.post(`http://localhost:8000/api/admin/${newStatus}/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setRequests(prev => prev.filter(r => r.id !== id));
    }).catch(err => {
      console.error("Status update failed:", err);
    });
  };

  return (
    <div className="admin-request-container">
      <div className="filter-buttons">
        <button onClick={() => setStatusFilter("all")}>All</button>
        <button onClick={() => setStatusFilter("pending")}>Pending</button>
        <button onClick={() => setStatusFilter("approved")}>Approved</button>
        <button onClick={() => setStatusFilter("rejected")}>Rejected</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Bus Pass Requests</h3>
          {requests.length > 0 ? (
            <table className="admin-request-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Enrollment</th>
                  <th>Contact</th>
                  <th>College</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id}>
                    <td>{req.student_name}</td>
                    <td>{req.enrollment_number}</td>
                    <td>{req.contact_number}</td>
                    <td>{req.college}</td>
                    <td>{req.city}</td>
                    <td>{req.status}</td>
                    <td>
                      {req.status === "pending" && (
                        <>
                          <button className="approve-btn" onClick={() => updateStatus(req.id, "approve")}>Approve</button>
                          <button className="reject-btn" onClick={() => updateStatus(req.id, "reject")}>Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminRequestList;
