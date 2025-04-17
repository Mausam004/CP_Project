import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GeneratedPass.css";

const GeneratedPass = () => {
    const location = useLocation();
    const { state } = location;

    if (!state) {
        return <h2 className="text-center mt-5 text-danger">No Pass generated</h2>;
    }
    console.log(state);
    const {
        studentName,
        enrollmentNumber,
        contactNumber,
        semester,
        branch,
        college,
        shift,
        city,
        fees,
        residentialAddress,
        photo,
    } = state.formData;
 console.log(photo);
    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="bus-pass-card card p-4 shadow-lg">
                <h2 className="text-center text-primary">Student Bus Pass</h2>
                <div className="row mt-3">
                    <div className="col-md-4 d-flex justify-content-center">
                    {photo && (
  <img 
    src={URL.createObjectURL(photo)} 
    alt="Student Photo" 
    className="pass-photo"
  />
)}
                    </div>
                    <div className="col-md-8">
                        <p><strong>Name:</strong> {studentName}</p>
                        <p><strong>Enrollment No:</strong> {enrollmentNumber}</p>
                        <p><strong>Contact:</strong> {contactNumber}</p>
                        <p><strong>Semester:</strong> {semester}</p>
                        <p><strong>Branch:</strong> {branch}</p>
                        <p><strong>College:</strong> {college}</p>
                        <p><strong>Shift:</strong> {shift}</p>
                        <p><strong>City:</strong> {city}</p>
                        <p><strong>Fees Paid:</strong> ₹{fees}</p>
                        <p><strong>Address:</strong> {residentialAddress}</p>
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


