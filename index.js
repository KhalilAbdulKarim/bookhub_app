/**
 * import needed libraries
 */
const express = require("express");
const moment = require("moment");
const mysql = require("mysql2");
const ejs = require("ejs");


/**
 * set database connection
 */
const { query } = require("./db/database");
require('dotenv').config();

/**
 * middleware to handle JSON and URL encoded data
 */
const bodyParser = require('body-parser');
const port = process.env.APP_PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine','ejs');



/**
 * Server and Routes Setup
 */


// const userRoute = require('./routes/user.route');
// app.use('/api/users', userRoute);

const authorRoute = require('./routes/author.route');
app.use('/api/authors', authorRoute);

const bookRoute = require('./routes/book.route');
app.use('/api/books', bookRoute);

const genreRoute = require('./routes/genre.route');
app.use('/api/genre', genreRoute);

const reviewRoute = require('./routes/review.route');
app.use('/api/reviews', reviewRoute);

const recommendationRoute = require('./routes/recommendation.route');
app.use('/api/recommendations', recommendationRoute);

const userRoute = require('./routes/user.route');
app.use('/api/users', userRoute);


app.get("/", async (req, res) => {
    const limit = 5;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = (page - 1) * limit;

    try {
        const getUsers = await query(`SELECT * FROM USERS LIMIT ${limit} OFFSET ${offset}`);
        const countResult = await query(`SELECT COUNT(*) AS count FROM USERS`);
        const totalRows = countResult[0].count;
        const totalPages = Math.ceil(totalRows / limit);

        const data = {
            user: "User",
            title: "Manager",
            content: "User is an HR manager",
            users: getUsers,
            currentPage: page,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
        
        res.render("dashboard", data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});




app.get('/login',(req,res)=>{
    res.render('loginPage');
});

app.get('/register',(req,res)=>{
    res.render('registerPage');
});


/**
 * Server Initialization
 */

app.listen(port, () => {
    console.log(`my app is listening on port : ${port}`);
})

