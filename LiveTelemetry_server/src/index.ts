import express from "express";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import mysql, { QueryError, RowDataPacket } from "mysql2";
import fs from "fs";
import mqtt from "mqtt";
import { hostname } from "os";

const app = express();
app.use(cors())
app.use(express.json());
var router = express.Router();
const __filename = import.meta.url;
const __dirname = path.dirname(__filename); 
app.use(express.static(path.join(__dirname + "/src")))
dotenv.config();


const client = mqtt.connect("mqtts://srv-uniracing-01.unipr.it", {
  username: "RacingTeam",
  password: "Raspberry",
  port: 8883,
  host: "localhost",
  keepalive: 20,
  key: fs.readFileSync("/opt/ssl/client.key"),
  cert: fs.readFileSync("/opt/ssl/client.crt"),
  ca: fs.readFileSync("/opt/ssl/ca.crt")
});

client.on('connect', () =>{
  console.log("Connected to mqtt server");
});


const db = mysql.createPool({
  host: "mysql",
  user: "admin",
  password: "SkillIssue!2023",
  database: "liveTelemetry_db"
});

app.listen(3002, () => {
  console.log("Server is running on port 3002")
  console.log(process.env.DB_HOST)
})

app.get('/checkLogin', async (req, res) => {
  const user = req.query.usr
  const password = req.query.psw

  console.log("called by the client")

  db.query('SELECT * FROM users WHERE email=? AND password=?', [user, password], (err, data: RowDataPacket[]) => {
    if (err) {
      console.log(err)
    } else {
      if (data.length > 0) {
        const firstResult = data[0];
        const id = firstResult.id;
        const email = firstResult.email;
        const password = firstResult.password;
        console.log(`ID: ${id}, Email: ${email}, Password: ${password}`);
        res.send("OK")
      } else {
        res.send("Email e/o password errati")
        console.log("errore di login")
      }
    }
  });

});