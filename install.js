const mysql = require("mysql");
require("dotenv").config();

// Skapa anslutningen till MySQL-servern utan att specificera en databas
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    PORT: process.env.PORT || 3000
});

// Anslut till MySQL-servern
connection.connect((err) => {
    if (err) {
        console.error("Fel vid anslutning till MySQL-servern:", err);
        return;
    }
    console.log("Ansluten till MySQL-servern");

    // Skapa databasen om den inte redan finns
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`, (err, results) => {
        if (err) {
            console.error("Fel vid skapande av databas:", err);
            return;
        }
        console.log("Databasen skapades framgångsrikt");

        // Anslut till den skapade databasen
        connection.changeUser({ database: process.env.DB_DATABASE }, (err) => {
            if (err) {
                console.error("Fel vid byte till den skapade databasen:", err);
                return;
            }
            console.log("Ansluten till databasen:", process.env.DB_DATABASE);

            // Skapa tabellen "workExperience" om den inte redan finns
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
                    console.error("Fel vid skapande av workExperience-tabellen:", err);
                    return;
                }
                console.log("workExperience-tabellen skapades framgångsrikt");

                // Stäng anslutningen till MySQL-servern
                connection.end((err) => {
                    if (err) {
                        console.error("Fel vid stängning av anslutning till MySQL-servern:", err);
                        return;
                    }
                    console.log("Anslutning till MySQL-servern stängd");
                });
            });
        });
    });
});