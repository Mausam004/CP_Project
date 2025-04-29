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
import Razorpay from "razorpay";

const storage = multer.diskStorage({
    destination: "./uploads/", // Folder to store uploaded images
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});


const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET_KEY",
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

import crypto from "crypto";

router.post("/verify-payment", (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    enrollment_number
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Save to DB
    const sql = `
      INSERT INTO payments (enrollment_number, payment_id, order_id, signature, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      enrollment_number,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      "success"
    ], (err, result) => {
      if (err) return res.status(500).json({ error: "DB error saving payment" });
      res.json({ success: true });
    });

  } else {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

router.post("/order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // in paise
    currency: "INR",
    receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});
export default router;