import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrors({ email: "Email is required" });
            return;
        }

        try {
            const result = await axios.post('http://localhost:8000/api/auth/forgot-password', { email });

            console.log(result.data);
            toast.success('OTP sent successfully!');
            setTimeout(() => navigate(`/otp-form/${email}`), 1000);
        } catch (err) {
            console.error(err);

            // Show error message
            toast.error('Something went wrong. Please try again.');
        }

        console.log("Submitting email:", email);
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-4 rounded w-25'>
                <h3 className="text-center mb-3">Forgot Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter email'
                            autoComplete='off'
                            className='form-control rounded-0'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
