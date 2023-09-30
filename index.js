import express from "express";
import bodyParser from "body-parser";
import "./src/db/dbConnection.js";
import CombinedRouter from "./src/routes/index.js";
import cors from 'cors'
 const app = express();
const PORT = "https://tic-tac-toe-ey03.onrender.com" || 5001;

app.use(bodyParser.json())
app.use(cors('*'));
app.use('/', CombinedRouter);


app.listen(PORT, ()=>{
    console.log(`Server runing on port: localhost:${PORT}`)
})
