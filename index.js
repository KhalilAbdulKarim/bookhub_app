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


app.get("/", async (req, res) => {
    try {
        const users = await query("select * from USERS");
        const data = {
            user: "User001",
            title: "Manager",
            content: "User001 is an HR manager",
            users: users,
        }
        
        res.render("homePage", data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});



const userRoute = require('./routes/user.route');
app.use('/api/users', userRoute);

/**
 * Server Initialization
 */

app.listen(port, () => {
    console.log(`my app is listening on port : ${port}`);
})

