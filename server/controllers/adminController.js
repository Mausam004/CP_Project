import db from "../config/db.js"; // Import database connection

export const addBusPass = async (req, res) => {
    console.log("Received Data:", req.body);
    
    // Extract form data from request
    const { studentName, enrollmentNumber, contactNumber, semester, branch, college, shift, city, fees, residentialAddress } = req.body;
    const photo = req.file ? req.file.filename : null;  // Handle uploaded photo

    // Check if required fields are missing
    if (!studentName || !enrollmentNumber || !contactNumber || !semester || !branch || !college || !shift || !city || !fees || !residentialAddress) {
        return res.status(400).json({ error: "All fields are required" });
    }

    console.log("Creating bus pass...");

    try {
        // Insert data into the database
        const sqlBusPass = `
            INSERT INTO bus_passes (student_name, enrollment_number, contact_number, semester, branch, college, shift, city, fees, residential_address, photo, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

        db.query(sqlBusPass, [studentName, enrollmentNumber, contactNumber, semester, branch, college, shift, city, fees, residentialAddress, photo], 
        (err, result) => {
            if (err) {
                console.error("Error inserting bus pass data:", err);
                return res.status(500).json({ error: "Error inserting bus pass data", details: err.message });
            }

            return res.status(201).json({
                message: "Bus pass successfully created",
                photoUrl: photo ? `/uploads/${photo}` : null,
            });
        });

    } catch (error) {
        console.error("Error creating bus pass:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getPlacedForAdminApproval = async (req, res) => {
    const { status } = req.body;
    const sql = "SELECT * FROM bus_passes WHERE is_approve = ? ORDER BY created_at DESC";

    db.query(sql, [status], (err, result) => {
      if (err) {
          return res.status(400).json({ error: "No Place Found" });
      }

      return res.status(201).json({ message: "Request List", data: result });
    });
};

export const updatePlaceApplication = async (req, res) => {
    const { placeId, isApprove } = req.body;

    if (typeof placeId === 'undefined' || (isApprove !== 1 && isApprove !== 2)) {
      return res.status(400).json({ error: "Invalid input" });
    }
  
    const sql = "UPDATE bus_passes SET is_approve = ? WHERE id = ?";
  
    db.query(sql, [isApprove, placeId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
  
      return res.status(200).json({
        message: isApprove === 1 ? "Place approved successfully" : "Place rejected successfully",
      });
    });
  };
