/**
 * Databas "cv" install 
 * Av Maamoun Okla
 */
const mysql = require("mysql");

//include the dotenv to read .env-files
require("dotenv").config();

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});


// Create the table workExperience in the MySQL "cv" database
// -------------------------------------------------------------------------------------
// | id | companyname | jobtitle | location | extra: startdate | enddate | description |  
// -------------------------------------------------------------------------------------

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
});

// Close the MySQL connection
connection.end();