import express from "express";
import { getBusPasses } from "../models/BusPass.js";
import { addBusPass, getPlacedForAdminApproval, updatePlaceApplication } from "../controllers/adminController.js"; // Correct import
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "./uploads/", // Folder to store uploaded images
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});


const upload = multer({ storage });

// Routes for Bus Pass

router.post("/create-buspass", upload.single("photo"), addBusPass);
router.get("/buspasses", getBusPasses);

router.post('/get_request', getPlacedForAdminApproval);
router.put('/update_request_status', updatePlaceApplication);

export default router;
