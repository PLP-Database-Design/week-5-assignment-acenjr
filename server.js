// Import required dependencies
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();
app.use(express.json()); // To parse JSON request bodies

// Create a MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// Question 1: Retrieve all patients
app.get("/patients", (req, res) => {
  const query =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

// Question 2: Retrieve all providers
app.get("/providers", (req, res) => {
  const query =
    "SELECT first_name, last_name, provider_specialty FROM providers";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

// Question 3: Filter patients by first name
app.get("/patients/:first_name", (req, res) => {
  const firstName = req.params.first_name;
  const query =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?";
  db.query(query, [firstName], (err, results) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

// Question 4: Retrieve providers by specialty
app.get("/providers/:specialty", (req, res) => {
  const specialty = req.params.specialty;
  const query =
    "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";
  db.query(query, [specialty], (err, results) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
