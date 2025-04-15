import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast ,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
    const [email, setEmail] = useState("");      
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email  || !password) {
            toast.error("Please fill in all fields."); 
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/reset-password", {
                email,
                
                password
            });

            if (response.data.status === "Success") {
                toast.success("Password updated successfully!");
                navigate("/login");
            } else {
                toast.error(response.data.message || "Failed to reset password.");
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-4 rounded w-25'>
                <h3 className="text-center mb-3">Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            className='form-control rounded-0'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>


                    <div className='mb-3'>
                        <label htmlFor='password'><strong>New Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter new password'
                            className='form-control rounded-0'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'>Update Password</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ResetPassword;