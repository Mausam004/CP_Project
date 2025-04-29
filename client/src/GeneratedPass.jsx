import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GeneratedPass.css";
import axios from "axios";

const GeneratedPass = () => {
    const location = useLocation();
    const { state } = location;
    ;
const { formData, } = location.state || {};
const [status, setStatus] = useState("pending");

useEffect(() => {
    console.log("Formdata",formData)
    if (formData?.enrollmentNumber) {
      axios
        .get(`http://localhost:8000/api/adminroutes/buspass/${formData?.enrollmentNumber}`)
        .then((res) => {
          setStatus(res.data.status);
        })
        .catch((err) => {
          console.error("Error fetching status:", err);
        });
    } else {
      console.warn("Enrollment number missing in formData!");
    }
  }, []);
    if (!state) {
        return <h2 className="text-center mt-5 text-danger">No Pass generated</h2>;
    }
   
    console.log(state);
    const {
        studentName,
        email,
        enrollmentNumber,
        contactNumber,
        parentNumber,
        semester,
        branch,
        college,
        shift,
        city,
        pickupStand,
        fees,
        residentialAddress,
        photo,
    } = state.formData;
 console.log(photo);
 console.log("Form Data",formData)
    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="bus-pass-card card p-4 shadow-lg">
                <h2 className="text-center text-primary">Student Bus Pass</h2>
                <div className="row mt-3">
                    <div className="col-md-4 d-flex justify-content-center">
                    {photo && (
 <img
 src={
   typeof photo === "string"
     ? `http://localhost:8000/uploads/${photo}` // coming from backend
     : URL.createObjectURL(photo) // when from File input
 }
 alt="Student Photo"
 className="pass-photo"
/>
)}
                    </div>
                    <div className="col-md-8">
                        <p><strong>Name:</strong> {studentName}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Enrollment No:</strong> {enrollmentNumber}</p>
                        <p><strong>Contact:</strong> {contactNumber}</p>
                        <p><strong>Parent:</strong> {parentNumber}</p>
                        <p><strong>Semester:</strong> {semester}</p>
                        <p><strong>Branch:</strong> {branch}</p>
                        <p><strong>College:</strong> {college}</p>
                        <p><strong>Shift:</strong> {shift}</p>
                        <p><strong>City:</strong> {city}</p>
                        <p><strong>PickupStand:</strong> {pickupStand}</p>
                        <p><strong>Fees Paid:</strong> ₹{fees}</p>
                        <p><strong>Address:</strong> {residentialAddress}</p>
                        <p className={`text-center fw-bold ${status}`}>
  Status: {status.charAt(0).toUpperCase() + status.slice(1)}
</p>
                    </div>
                </div>
                <button
                    className="btn btn-success mt-3 w-100"
                    onClick={() => window.print()}
                >
                    Download Pass
                </button>
            </div>
        </div>
    );
};
export default GeneratedPass;