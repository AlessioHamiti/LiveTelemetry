var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import mysql from "mysql2";
import fs from "fs";
import mqtt from "mqtt";
const app = express();
app.use(cors());
app.use(express.json());
var router = express.Router();
const __filename = import.meta.url;
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname + "/src")));
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
client.on('connect', () => {
    console.log("Connected to mqtt server");
});
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
app.listen(3002, () => {
    console.log("Server is running on port 3002");
});
app.get('/checkLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.query.usr;
    const password = req.query.psw;
    console.log("called by the client");
    const result = yield db.query("SELECT * FROM users WHERE email=? AND password=?", [user, password]);
    const [data] = result;
    /*
    const result = db.query("SELECT * FROM users WHERE email=? AND password=?", [user, password], (err, results) => {
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
    */
}));
//# sourceMappingURL=index.js.map