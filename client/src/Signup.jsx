import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from './SignupValidation';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleBlur = (e) => {
    // If the input is invalid when the user leaves the field, show a toast
    if (!e.target.validity.valid) {
      toast.error("Please enter a valid email address");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newValues = { name, email, password };
    const validationErrors = Validation("", newValues);
    console.log("Validation Errors on submit:", validationErrors);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please enter valid values");
      return;
    }
    try{
    const response = await axios.post('http://localhost:8000/api/auth/register', { name, email, password })
     
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000
        });
        if(response.data.success){
          navigate("/login");}
      }
      catch(error){
          toast.error(error?.response?.data?.message);
        }
      }

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "white", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
     
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      ></div>

      {/* Signup Card */}
      <div
        className="card p-4"
        style={{
          width: "350px",
          zIndex: 1, // Ensure card appears above overlay
          borderRadius: "8px",
        }}
      >
        <h2 className="text-center mb-4">📝 Register</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label"><strong>Name</strong></label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                const error1 = Validation("checkName", { name: e.target.value, email, password });
                setErrors((prev) => {
                  const updatedErrors = { ...prev, ...error1 };
            
                  // Remove email error if email is now valid
                  if (!error1.name) {
                    delete updatedErrors.name;
                  }
            
                  return updatedErrors;
                });
              }}
              required
            />
            {errors?.name && <span className="text-danger">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                const error1 = Validation("checkEmail", { name, email: e.target.value, password });
            
                setErrors((prev) => {
                  const updatedErrors = { ...prev, ...error1 };
            
                  // Remove email error if email is now valid
                  if (!error1.email) {
                    delete updatedErrors.email;
                  }
            
                  return updatedErrors;
                });
              }}
              onBlur={handleBlur}
              required
            />
            {errors?.email && <span className="text-danger">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                const error1 = Validation("checkPassword", { name, email, password: e.target.value });
                setErrors(prev => ({ ...prev, ...error1 }));
              }}
              required
            />
            {errors?.password && <span className="text-danger">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#0D47A1", // Navy Blue for consistency
              color: "#fff",
              borderRadius: "0",
            }}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-3">Already have an account?</p>
        <Link to="/login" className="btn btn-outline-success w-100">
          Login
        </Link>
      </div>
      <ToastContainer/>
    </div>
  );
}
