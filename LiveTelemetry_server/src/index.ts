import express from "express";
import path from "path";
import cors from "cors";
import mysql from "mysql";
import fs from "fs";
import mqtt from "mqtt";
import { hostname } from "os";

const configPath = "./src/serverConfig.json";
const rawData = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(rawData);

const app = express();
app.listen(config.server.port, config.server.host);
app.use(cors())
app.use(express.json());
var router = express.Router();
const __filename = import.meta.url;
const __dirname = path.dirname(__filename); 
app.use(express.static(path.join(__dirname + "/src")))


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

const db = mysql.createConnection({
  user: config.db.user,
  host: config.db.host,
  port: config.db.port,
  password: config.db.password,
  database: config.db.database,
});

db.connect(function(err){
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});


app.get('/checkLogin', (req, res) => {
  const user = req.query.usr
  const password = req.query.psw

  db.query("SELECT * FROM users WHERE email=? AND password=?", [user, password], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result.length > 0) {
        const firstResult = result[0];
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
  })
});