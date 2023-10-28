const express = require("express");
const moment = require("moment");

const mysql = require("mysql2");
const {query} = require("./db/database");
require('dotenv').config();

const bodyParser = require('body-parser');

const port = process.env.APP_PORT;
const app = express();

app.listen(port,()=>{
    console.log(`my app is listening on port : ${port}`);
})

app.get("/",(req,res)=>{
    res.status(200).json({message: "Index Page ..."}) 
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const userRoute = require('./routes/user.route');
app.use('/api/users', userRoute);

