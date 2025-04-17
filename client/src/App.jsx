import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import BusPass from "./BusPass";
import OtpForm from "./OtpForm";
import Profile from "./Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import AboutUs from "./AboutUs";
import GeneratedPass from "./GeneratedPass";

import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-form/:email" element={<OtpForm />} />
        <Route path="/buspass" element={<BusPass />} />
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/navbar" element={<NavBar/>}/>
        <Route path="/generated-pass" element={<GeneratedPass/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      </Routes>
      

      {/* ToastContainer must be included once in the App */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;