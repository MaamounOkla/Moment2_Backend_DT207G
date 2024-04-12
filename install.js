/**
 * Anslutning till Database "cv" 
 * By Maamoun Okla
 */
const mysql = require("mysql");

//
require("dotenv").config();

// Skapa anslutningen till "cv" med env.variabler
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Anslutning till MySQL Database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database:", err);
        return;
    }
    console.log("Connected to MySQL database");
  
    // Skapa workExperience Tabellen
    connection.query(`
        CREATE TABLE IF NOT EXISTS workExperience (
            id INT AUTO_INCREMENT PRIMARY KEY,
            companyname VARCHAR(255) NOT NULL,
            jobtitle VARCHAR(255) NOT NULL,
            location TEXT NOT NULL,
            startdate DATE NOT NULL,
            enddate DATE NOT NULL,
            description TEXT NOT NULL
        )
    `, (err, results) => {
        if (err) {
            console.error("Error creating workExperience table:", err);
            return;
        }
        console.log("workExperience table created successfully");
      
        // Stäng MySQL anslutning
        connection.end((err) => {
            if (err) {
                console.error("Error closing MySQL connection:", err);
                return;
            }
            console.log("MySQL connection closed");
        });
    });
});
