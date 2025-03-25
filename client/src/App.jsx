import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
import OtpFrom from './OtpForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path ='/forgot-password' element={<ForgotPassword/>}/>
                <Route path ='/reset-password' element={<ResetPassword/>}/>
                <Route path='/otp-form/:email' element={<OtpFrom/>}/>
            </Routes>
            {/* ToastContainer must be included once in the App */}
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;