import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { Mail } from "./config/mailer.js"; // ✅ Import Mail class


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);

app.get("/",  (req, res) => {
  res.send("Hello");

  const mail = new Mail();
  mail.setTo(process.env.TO_EMAIL);
  mail.setSubject('Subject');
  mail.setText('hello form VR ${otp}')
  mail.send()
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);});