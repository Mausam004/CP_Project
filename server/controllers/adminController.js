import db from "../config/db.js";

// ✅ 1. Add new bus pass (status = 'pending')
export const addBusPass = async (req, res) => {
    const {
        studentName,
        enrollmentNumber,
        contactNumber,
        semester,
        branch,
        college,
        shift,
        city,
        fees,
        residentialAddress
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    if (
        !studentName || !enrollmentNumber || !contactNumber || !semester || !branch ||
        !college || !shift || !city || !fees || !residentialAddress
    ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
        INSERT INTO bus_passes (
            student_name, enrollment_number, contact_number, semester, branch,
            college, shift, city, fees, residential_address, photo, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    db.query(sql, [
        studentName, enrollmentNumber, contactNumber, semester, branch,
        college, shift, city, fees, residentialAddress, photo
    ], (err) => {
        if (err) {
            console.error("Error inserting pass:", err);
            return res.status(500).json({ error: "Failed to submit pass request" });
        }

        res.status(201).json({
            message: "Bus pass request submitted and is pending admin approval",
            photoUrl: photo ? `/uploads/${photo}` : null
        });
    });
};



// ✅ 2. Get all pass requests
export const getAllRequests = (req, res) => {
    const sql = "SELECT * FROM bus_passes ORDER BY created_at DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching requests:", err);
            return res.status(500).json({ error: "Failed to fetch requests" });
        }

        res.status(200).json(results);
    });
};


// ✅ 3. Approve a pass
export const approveRequest = (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE bus_passes SET status = 'approved' WHERE id = ?";

    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Error approving request:", err);
            return res.status(500).json({ error: "Failed to approve request" });
        }

        res.status(200).json({ message: "Pass request approved" });
    });
};


// ✅ 4. Reject a pass
export const rejectRequest = (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE bus_passes SET status = 'rejected' WHERE id = ?";

    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Error rejecting request:", err);
            return res.status(500).json({ error: "Failed to reject request" });
        }

        res.status(200).json({ message: "Pass request rejected" });
    });
};
