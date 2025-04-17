import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Validation from "./LoginValidation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newValues = { email, password };
    const validationErrors = Validation(newValues);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please enter valid values");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
  
      console.log("Response received:", response?.data?.message);
      
  
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success(response?.data?.message);
        
          navigate("/"); // ✅ or stay on same page if you prefer
        
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url("/images/image.png")`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Dark overlay for readability */}
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

      {/* Login Card */}
      <div
        className="card p-4"
        style={{
          width: "350px",
          zIndex: 1, // Ensure card is above overlay
          borderRadius: "8px",
        }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#0D47A1", 
              color: "#fff",
              borderRadius: "0",
            }}
          >
            Login
          </button>
        </form>

        <div className="mt-3">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-2">
          <Link to="/register" className="btn btn-outline-success w-100">
            Signup
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
