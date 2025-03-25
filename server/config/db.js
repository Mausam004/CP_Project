import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'user',
  port: process.env.DB_PORT || 3306,  // Must match XAMPP MySQL port!
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Database connected successfully!");
  connection.release();
});

export default pool;
