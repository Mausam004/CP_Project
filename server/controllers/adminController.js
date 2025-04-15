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

