const express = require('express');
const mysql = require('mysql');
const cors =require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee",
    port : "3306"
});

db.getConnection((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

app.post('/login', (req,res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND  password = ?"

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Error");
        if(data.length > 0){
            return res.json("Login Successfully");
        }
        else{
            return res.json("No Record");
        }
    })
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const sql = "INSERT INTO register (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Error inserting user" });

        // Check if the insertion is successful
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "User registered successfully" });
        } else {
            return res.status(400).json({ message: "Error registering user" });
        }
    });
});

app.listen(8000, ()=>{
    console.log("Server Listning...");
})