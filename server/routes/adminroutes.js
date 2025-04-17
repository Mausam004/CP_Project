import express from "express";
import { getBusPasses } from "../models/BusPass.js";
import { addBusPass } from "../controllers/adminController.js"; // Correct import
import multer from "multer";
import path from "path";
import { getAllRequests, approveRequest, rejectRequest } from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import db from "../config/db.js";
const router = express.Router();

const storage = multer.diskStorage({
    destination: "./uploads/", // Folder to store uploaded images
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});


const upload = multer({ storage });

// Routes for Bus Pass
router.get("/buspass/:enrollment", (req, res) => {
    const { enrollment } = req.params;
    const sql = "SELECT * FROM bus_passes WHERE enrollment_number = ?";
  
    db.query(sql, [enrollment], (err, result) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (result.length === 0) return res.status(404).json({ message: "Not found" });
  
      res.json(result[0]); // return single record
    });
  });
  router.get("/check-pass/:enrollment", (req, res) => {
    const { enrollment } = req.params;
  
    const sql = "SELECT * FROM bus_passes WHERE enrollment_number = ?";
  
    db.query(sql, [enrollment], (err, result) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (result.length === 0) return res.json({ exists: false });
  
      res.json({ exists: true, pass: result[0] });
    });
  });
router.post("/create-buspass", upload.single("photo"), addBusPass);
router.get("/buspasses", getBusPasses);
router.get("/requests", verifyToken, verifyAdmin, getAllRequests);
router.post("/approve/:id", verifyToken, verifyAdmin, approveRequest);
router.post("/reject/:id", verifyToken, verifyAdmin, rejectRequest);

export default router;
