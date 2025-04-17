import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // optional custom CSS

const AdminDashboard = () => {
  const [busPasses, setBusPasses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/adminroutes/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from server", res.data)
      setBusPasses(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch bus passes:", err);
      setLoading(false);
    }
  };

  const updatePassStatus = async (id, action) => {
    try {
      await axios.post(`http://localhost:8000/api/adminroutes/${action}/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from list after action
      setBusPasses(prev => prev.filter(pass => pass.id !== id));
    } catch (err) {
      console.error(`Failed to ${action} pass:`, err);
    }
  };

  const filteredPasses = busPasses.filter(pass => {
    if (filter === "all") return true;
    return pass.status === filter;
  });

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard - Bus Pass Requests</h2>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("approved")}>Approved</button>
        <button onClick={() => setFilter("rejected")}>Rejected</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredPasses.length === 0 ? (
            <p>No requests found.</p>
          ) : (
            <table className="admin-table">
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
                {filteredPasses.map((req) => (
                  <tr key={req.id}>
                    <td>{req.student_name}</td>
                    <td>{req.enrollment_number}</td>
                    <td>{req.contact_number}</td>
                    <td>{req.college}</td>
                    <td>{req.city}</td>
                    <td>{req.status}</td>
                    <td>
                      {req.status === "pending" ? (
                        <>
                          <button
                            className="approve-btn"
                            onClick={() => updatePassStatus(req.id, "approve")}
                          >
                            Approve
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => updatePassStatus(req.id, "reject")}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
