import db from "../config/db.js";
import express from "express";
const app = express();
app.use(express.json());

export const createBusPass = (req, res) => {
    try {
      console.log("File received:", req.file);
      console.log("Form Data:", req.body);

      const { studentName, enrollmentNumber, contactNumber, semester, branch, college, shift, city, fees, residentialAddress } = req.body;
      const photo = req.file ? req.file.filename : null;

      if (!studentName || !enrollmentNumber || !contactNumber || !semester || !branch || !college || !shift || !city || !fees || !residentialAddress) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const sqlBusPass = 
      ` INSERT INTO bus_passes (student_name, enrollment_number, contact_number, semester, branch, college, shift, city, fees, residential_address, photo, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,Now())`;

      db.query(sqlBusPass, [studentName, enrollmentNumber, contactNumber, semester, branch, college, shift, city, fees, residentialAddress, photo], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error inserting bus pass data", details: err.message });
        }

        return res.status(201).json({
          message: "Bus Pass created successfully",
          photoUrl: `/uploads/${photo}`,
        });
      });
    } catch (error) {
      console.error("Error adding bus pass:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


export const getBusPasses = (req, res) => {
  const sqlGetBusPasses = "SELECT * FROM bus_passes ORDER BY created_at DESC";

  db.query(sqlGetBusPasses, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching bus passes", details: err.message });
    }

    return res.status(200).json(results);
  });
};
