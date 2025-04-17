import express from "express";
import { loginUser, registerUser, sendResetPasswordMail, verifyOtp, resetPassword} from "../controllers/authController.js";


const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", sendResetPasswordMail);
router.post("/reset-password", resetPassword);
export default router;