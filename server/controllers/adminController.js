import db from "../config/db.js";
import { Mail } from "../config/mailer.js";
import Razorpay from "razorpay";



// ✅ 1. Add new bus pass (status = 'pending')
export const addBusPass = async (req, res) => {
    const {
        studentName,
        email,
        enrollmentNumber,
        contactNumber,
        parentNumber,
        semester,
        branch,
        college,
        shift,
        city,
        pickupStand,
        fees,
        residentialAddress
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    if (
        !studentName || !email|| !enrollmentNumber || !contactNumber || !parentNumber || !semester || !branch ||
        !college || !shift || !city || !pickupStand ||!fees || !residentialAddress
    ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
        INSERT INTO bus_passes (
            student_name,email, enrollment_number, contact_number,parent_number, semester, branch,
            college, shift, city,pickup_stand,fees, residential_address, photo, status, created_at
        ) VALUES (?,?, ?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    db.query(sql, [
        studentName,email, enrollmentNumber, contactNumber,parentNumber, semester, branch,
        college, shift, city,pickupStand, fees, residentialAddress, photo
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

    // First, get the email of the user from the bus_passes table
    const getEmailSql = "SELECT email FROM bus_passes WHERE id = ?";
    db.query(getEmailSql, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error("Error fetching email:", err);
            return res.status(500).json({ error: "Failed to fetch email" });
        }

        const email = results[0].email;

        // Then, approve the request
        const updateSql = "UPDATE bus_passes SET status = 'approved' WHERE id = ?";
        db.query(updateSql, [id], (err) => {
            if (err) {
                console.error("Error approving request:", err);
                return res.status(500).json({ error: "Failed to approve request" });
            }

            const mail = new Mail();
            mail.setTo(email);
            mail.setSubject("Bus Pass Approved");
            mail.setText("Your bus pass request has been approved.");

            try {
                mail.send();
                res.status(200).json({ message: "Pass request approved and email sent" });
            } catch (mailError) {
                console.error("Mail error:", mailError.message);
                res.status(500).json({ message: "Pass approved but failed to send email" });
            }
        });
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

const razorpay = new Razorpay({
    key_id: "YOUR_KEY_ID",
    key_secret: "YOUR_SECRET_KEY",
  });