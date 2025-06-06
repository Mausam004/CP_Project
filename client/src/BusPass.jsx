import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BusPass.css"; 
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


function BusPass() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    enrollmentNumber: "",
    contactNumber: "",
    parentNumber: "",
    semester: "",
    branch: "",
    college: "",
    shift: "",
    city: "",
    pickupStand: "",
    fees: "",
    residentialAddress: "",
    photo: null,
  });
  
  const cityFees = {
    Ahmedabad: 15000,
    Gandhinagar: 14000,
    Mehsana: 5000,
    Himmatnagar: 7000,
    Vijapur: 8000,
    Unjha: 1000,
    Siddhpur: 12500,
    Patan: 11000,
    Palanpur: 13500,
  };

  const pickupStands = {
    Ahmedabad: [
      "Isanpur", "Godasar", "Jasodanagar", "Baroda Express", "CTM", "Wonder Point", "Rabari Colony",
      "Rajendra Nagar", "Soni-ni-Chali", "Virat Nagar", "Khodiyarnagar", "Thakkarnagar",
      "Bajrang Ashram", "Vijaypark", "Krishnanagar", "Galaxy", "Kotarpur", "India Bridge",
      "Bhat Circle", "Koba", "Kamlam", "PDPU", "Raysan", "Raksha Shakti Cr.", "CH0 to GH7",
      "Charedi", "Pethapur"
    ],
    Gandhinagar: [
      "Shyamal", "Shivranjani", "Keshavbaug", "Andhjan Mandal", "Topa Circle", "AEC", "Pallav", 
      "Akhbarnagar", "RTO", "Sabarmati ST", "Vishat", "Chandkhda", "Zundal", "Gandhinagar GH (ઘ) Road"
    ],
    Patan: [
      "GEB", "GayatriMandir", "Bus Stand", "Uni.Road", "Balisana"
    ],
    Mehsana: [
      "Radhanpur Road", "Golden Circle Rajdhani township", "Radhanpur Char Rasta", "Gopinala", "Bus Stand", 
      "ZulelalChok", "Dhobighat", "Para Tower", "Saibaba-Mandir", "Modhera Road", "Man Pharma", 
      "Avsar Party Plot", "Nirma/FCI", "Rajkamal Petrol pump", "Gayatri Mandir", "Nagalpur", "Wide Angle", "Palavasna"
    ],
    Unjha: [ "Bus Stand", "Highway Circle" ],
    Vijapur : [ "Iskcon", "Pakvana", "Thaltej", "Zudas", "Highcourt", "Gota", "Vaishnav Devi", "Adalaj", "Kh0 To KH 6", "Radheja" ],
    Himmatnagar: [ "Gadhoda Circle", "Mahavir Nagar", "Post office", "Mehta Pura", "RTO", "Vijapur", "Dabhala" ],
    Siddhpur: [ "Kakoshi Chokadi", "Dethli char rasta","Bindu sarovar" ,"Khali chokadi" ],

    Palanpur: [
      "Gathaman Gate", "ST workshop", "Aroma Circle", "Kanodar", "Chhapi", "Dhethli Road", "BinduSarovar"
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      setFormData({ ...formData, city: value, fees: cityFees[value] || "",pickupStand:pickupStands[value] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // ✅ First check if pass already exists
      const check = await axios.get(`http://localhost:8000/api/adminroutes/check-pass/${formData.enrollmentNumber}`);
      
      if (check.data.exists) {
        toast.info("Bus pass already requested. Redirecting...");
        navigate('/generated-pass', {
          state: {
            formData: check.data.pass,
            status: check.data.pass.status
          }
        });
        return;
      }
  
      // ✅ If not exists, then proceed to submit
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "photo" && formData[key] instanceof File) {
          formDataToSend.append(key, formData[key]);
        } else if (key !== "photo") {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      const response = await axios.post("http://localhost:8000/api/adminroutes/create-buspass", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 201) {
        toast.success("Bus Pass Submitted Successfully!");
        navigate('/generated-pass', {
          state: {
            formData: formData,
            status: "pending"
          }
        });
  
        setFormData({
          studentName: "",
          email: "",
          enrollmentNumber: "",
          contactNumber: "",
          semester: "",
          branch: "",
          college: "",
          shift: "",
          city: "",
          fees: "",
          residentialAddress: "",
          photo: null,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 bg-light" style={{ width: "50%" }}>
        <h2 className="text-center text-primary mb-4">Bus Pass Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Student Name</label>
            <input type="text" name="studentName" className="form-control" value={formData.studentName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Student Email</label>
            <input type="text" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Enrollment Number</label>
            <input type="text" name="enrollmentNumber" className="form-control" value={formData.enrollmentNumber} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Contact Number</label>
            <input type="text" name="contactNumber" className="form-control" value={formData.contactNumber} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Parent Number</label>
            <input type="text" name="parentNumber" className="form-control" value={formData.parentNumber} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Semester</label>
              <input type="text" name="semester" className="form-control" value={formData.semester} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Branch</label>
              <input type="text" name="branch" className="form-control" value={formData.branch} onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">College</label>
            <input type="text" name="college" className="form-control" value={formData.college} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Shift</label>
            <select name="shift" className="form-control" value={formData.shift} onChange={handleChange} required>
              <option value="">Select Shift</option>
              <option value="1st">1st Shift</option>
              <option value="2nd">2nd Shift</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">City</label>
            <select name="city" className="form-control" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {Object.keys(cityFees).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Pickup Stand</label>
            <select name="pickupStand" className="form-control" onChange={handleChange} required>
              <option value="">Select Pickup Stand</option>
              {formData.city && pickupStands[formData.city]?.map((pickupStand) => (
                <option key={pickupStand} value={pickupStand}>{pickupStand}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Fees</label>
            <input type="text" name="fees" className="form-control" value={formData.fees} readOnly />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Residential Address</label>
            <textarea name="residentialAddress" className="form-control" rows="3" value={formData.residentialAddress} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Upload Photo</label>
            <input type="file" name="photo" className="form-control" onChange={handleFileChange} accept="image/*" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BusPass;