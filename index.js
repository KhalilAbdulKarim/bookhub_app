const express = require("express");
const moment = require("moment");
const mysql = require("mysql2");
const bodyParser = require('body-parser');

const app = express();

const port = process.env.APP_PORT;

app.get("/",(req,res)=>{
    res.status(200).json({message: "Index Page ..."})
});


