/**
 * import needed libraries
 */
const express = require("express");
const moment = require("moment");
const mysql = require("mysql2");

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

/**
 * Server and Routes Setup
 */

app.get("/", (req, res) => {
    res.status(200).json({ message: "Index Page ..." })
});

const userRoute = require('./routes/user.route');
app.use('/api/users', userRoute);

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

/**
 * Server Initialization
 */

app.listen(port, () => {
    console.log(`my app is listening on port : ${port}`);
})

