import bcrypt from "bcrypt";
import db from "../config/db.js";
import { Mail } from "../config/mailer.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const sql = "SELECT * FROM register WHERE email = ?";

//   db.query(sql, [email], async (err, data) => {
//     if (err) return res.status(500).json({ error: "Database error" });
//      console.log(password,data[0]?.password);
//     if (data.length > 0) {
//       const result = await bcrypt.compare(password, data[0]?.password);
//       console.log(result)
//       if (result) {
//         res.json({ Login: true, message: "Login successful", success:true });
//       } else {
//         res.json({ Login: false, message: "Invalid email or password",error:true });
//       }
//     } else {
//       res.json({ Login: false, message: "User not found",error:true });
//     }
//   });
// };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM register WHERE email = ?";

  db.query(sql, [email], async (err, data) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (data.length > 0) {
      console.log("Entered Password:", password);
      console.log("Stored Hashed Password:", data[0]?.password);
      const result = await bcrypt.compare(password, data[0]?.password);
      console.log("Password Match:", result);
      console.log("result",result)
      if (result) {

        const user = { id: data[0].id, role: data[0].role, email: data[0].email };
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.json({ Login:true, message: "Login successful", success: true,token,user });
      } else {
        return res.json({ Login:false, message: "Invalid email or password", error: true });
      }
    } else {
      return res.json({ Login:false, message: "User not found", error: true });
    }
  });
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkQuery = "SELECT COUNT(*) as count FROM register WHERE email = ?";
    db.query(checkQuery, [email], (checkErr, checkResult) => {
      if (checkErr) {
        return res.status(500).json({ message: "Database error", error: true });
      }

      if (checkResult[0].count > 0) {
        return res.status(400).json({ message: "Email already exists", error: true });
      }

      const insertQuery = "INSERT INTO register (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(insertQuery, [name, email, hashedPassword, "user"], (insertErr, result) => {
        if (insertErr) {
          console.error("Insert Error:", insertErr);
          return res.status(500).json({ message: "Failed to register user", error: true });
        }

        return res.status(201).json({ message: "User registered successfully", success: true });
      });
    });

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", details: error.message, error: true });
  }
};


export const verifyOtp = async (req, res) => {
 const {enteredOTP, email} = req.body;
 const otp_expire = new Date(Date.now());
 console.log("current ",otp_expire)

 const sql = "SELECT * FROM register WHERE email = ? and otp = ? and otp_expire > ? ";

 db.query(sql, [email, enteredOTP, otp_expire], (err, result) => {
  // console.log(result[0].otp_expire.getTime());
  if(err) return res.status(400).json({ error: "something went wrong" });
  // console.log(result)

  if(!result.length) return res.status(200).json({error : "incorrect otp"})

  return res.status(200).json({message : "successfully verify"})
 })
  return 
}

export const sendResetPasswordMail = async (req, res) => {
  try {
    const email = req.body.email;
    console.log("Email received from frontend:", email);

    if (!email) {
      console.log("No email provided");
      return res.status(400).json({ error: "Email is required" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const otp_expire = new Date(Date.now() + 60 * 1000); // 1 min expiry

    const sql = "UPDATE register SET otp = ?, otp_expire = ? WHERE email = ?";

    // console.log("Executing SQL:", sql, "Values:", [otp, otp_expire, email]);
    // db.query("SHOW COLUMNS FROM register", (err, results) => {
    //   if (err) console.error("Error fetching columns:", err);
    //   else console.log("Table structure:", results);
    // });
    

    db.query(sql, [otp, otp_expire, email], (err, result) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.affectedRows === 0) {
        console.log("Email not found in register table:", email);
        return res.status(400).json({ error: "Email not found" });
      }
      
      // If successful, send OTP mail
      const mail = new Mail();
      mail.setTo(email);
      mail.setSubject("Password Reset OTP");
      mail.setText(`Your OTP is: ${otp}`);

      try {
        mail.send();
        console.log("OTP email sent successfully to:", email);
        return res.status(200).json({ message: "OTP sent successfully" });
      } catch (mailError) {
        console.error("Mail send error:", mailError.message);
        return res.status(500).json({ error: "Failed to send OTP email" });
      }

      
    });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

// export const resetPassword = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql = "SELECT * FROM register WHERE email = ?";
//   db.query(sql, [email], (err, results) => {
//       if (err) {
//           console.error("Database error:", err);
//           return res.status(500).json({ message: "Database error" });
//       }

//       if (results.length === 0) {
//           return res.status(400).json({ message: "Invalid email or OTP" });
//       }

//       // Optionally: hash the password before saving
//       const hashedPassword = password; // Should use bcrypt.hash(password, saltRounds)

//       const updateSql = "UPDATE register SET password = ?, otp = NULL, otp_expire = NULL WHERE email = ?";
//       db.query(updateSql, [hashedPassword, email], (err, updateResult) => {
//           if (err) {
//               console.error("Failed to update password:", err);
//               return res.status(500).json({ message: "Failed to update password" });
//           }

//           return res.status(200).json({ status: "Success", message: "Password reset successfully" });
//       });
//   });
// };

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM register WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Email not registered" });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const updateSql = "UPDATE register SET password = ? WHERE email = ?";
    db.query(updateSql, [hashedPassword, email], (err, updateResult) => {
      if (err) {
        console.error("Failed to update password:", err);
        return res.status(500).json({ message: "Failed to update password" });
      }

      return res.status(200).json({ status: "Success", message: "Password reset successfully" });
    });
  });
};

// export const resetPassword = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql = "SELECT * FROM register WHERE email = ?";
//   db.query(sql, [email], async (err, results) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (results.length === 0) {
//       return res.status(400).json({ message: "Email not registered" });
//     }

//     // Hash the new password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const updateSql = "UPDATE register SET password = ? WHERE email = ?";
//     db.query(updateSql, [hashedPassword, email], (err, updateResult) => {
//       if (err) {
//         console.error("Failed to update password:", err);
//         return res.status(500).json({ message: "Failed to update password" });
//       }

//       return res.status(200).json({ status: "Success", message: "Password reset successfully" });
//     });
//   });
// };

// export const resetPassword = async (req, res) => {
//   const { email, otp, password } = req.body;

//   if (!email || !otp || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql = "SELECT * FROM register WHERE email = ? AND otp = ?";
//   db.query(sql, [email, otp], (err, results) => {
//       if (err) {
//           console.error("Database error:", err);
//           return res.status(500).json({ message: "Database error" });
//       }

//       if (results.length === 0) {
//           return res.status(400).json({ message: "Invalid email or OTP" });
//       }

//       // Optionally: hash the password before saving
//       const hashedPassword = password; // Should use bcrypt.hash(password, saltRounds)

//       const updateSql = "UPDATE register SET password = ?, otp = NULL, otp_expire = NULL WHERE email = ?";
//       db.query(updateSql, [hashedPassword, email], (err, updateResult) => {
//           if (err) {
//               console.error("Failed to update password:", err);
//               return res.status(500).json({ message: "Failed to update password" });
//           }

//           return res.status(200).json({ status: "Success", message: "Password reset successfully" });
//       });
//   });
// };