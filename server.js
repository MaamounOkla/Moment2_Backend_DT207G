/**
 * Creating api/experiences
 * Av Maamoun Okla
 */

const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

//lägg till CORS
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Aktivera CORS middleware för alla rutter
app.use(cors());

//Ansluta till databasen
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.log("Connection failed" + err);
    }
    console.log("Connected to database");
});


//middleware
app.use(express.json());

//Routing
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to my REST API" });
});

app.get("/api/experiences", (req, res) => {
    //hämta work experience tabellen
    connection.query(`SELECT * FROM workExperience`, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Something went wrong" + err });
            return;
        }

        console.log(results);
        if (results.length === 0) {
            res.status(404).json({ error: "No experience found" + err });
        } else {
            res.json(results);
        }
    });
});

app.post("/api/experiences", (req, res) => {
    //Deklarera variablerna
    const companyname = req.body.name;
    const jobtitle = req.body.title;
    const location = req.body.location;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const description = req.body.description;

    //Kontrollera/Validera input

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        return res.status(400).json({
            message: "All fields are required",
            detail: "Please fill in all fields",
            http_response: {
                message: "Bad Request",
                code: 400
            }
        });
    }else{
        connection.query(`INSERT INTO workExperience(companyname, jobtitle,location, startdate, enddate, description) VALUES(?,?,?,?,?,?);`, [companyname, jobtitle, location, startdate, enddate, description], (err, results) => {
            if (err) {
                res.status(500).json({ error: "Something went wrong" + err });
                return;
            }
            console.log("Fråga skapat" + results);
            let experience = {
                companyname:  companyname,
                jobtitle : jobtitle,
                location : location,
                startdate :startdate,
                enddate : enddate,
                description : description,
            };
            
            res.json({ message: "Experience added", experience });
        });
    }
}
);

app.put("/api/experiences/:id", (req, res) => {
    const experienceId = req.params.id;
   //Hämta variablerna från request body 
   const { companyname, jobtitle, location, startdate, enddate, description } = req.body;


    //kontrollera om alla krävda fält har ett värde
    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        return res.status(400).json({
            message: "All fields are required",
            detail: "Please fill in all fields",
            http_response: {
                message: "Bad Request",
                code: 400
            }
        });
    }

    // uppdatera workexperience tabellen med nya input data
    connection.query(
        `UPDATE workExperience SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ? WHERE id = ?`,
        [companyname, jobtitle, location, startdate, enddate, description, experienceId],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Something went wrong" + err });
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ error: `No experience found with id ${experienceId}` });
                return;
            }
            res.json({ message: "Experience updated", id: experienceId });
        }
    );
});


app.delete("/api/experiences/:id", (req, res) => {
    const experienceId = req.params.id;

    // radera experience med rätt id från workExperience
    connection.query(`DELETE FROM workExperience WHERE id = ?`, [experienceId], (err, results) => {
        if (err) {
            // Om det uppstår ett fel, returnera ett felmeddelande
            res.status(500).json({ error: "Something went wrong" + err });
            return;
        }

        if (results.affectedRows === 0) {
             // returnera error om det inte finns någon erfarenhet att radera
            res.status(404).json({ error: `No experience found with id ${experienceId}` });
            return;
        }

        //visa vilken erfarenhet som raderades. 
        res.json({ message: "Experience deleted", id: experienceId });
    });
});

//Starta applikationen

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
