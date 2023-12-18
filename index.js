/**
 * import needed libraries
 */
const express = require("express");
const moment = require("moment");
const mysql = require("mysql2");
const ejs = require("ejs");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);


/**
 * set database connection
 */
const { query } = require("./db/database");
const dbConfig = require('./db/config').db;
const sessionStore = new MySQLStore(dbConfig);
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
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: !true }
}));

/**
 * Server and Routes Setup
 */


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
// app.use('/api/users', userRoute);
app.use(userRoute);

const loginRoute = require('./routes/loginAuthRoute');
const { getUserDetails } = require("./services/authService");
const { getBooks,searchBooksByTitle} = require("./services/booksService");
app.use(loginRoute);


app.get('/dashboard', async (req, res) => {
    const limit = 9;
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
        };

        res.render("dashboard", data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


app.get('/login', (req, res) => {
    res.render('loginPage', { errorMessage: '' });
});


app.get('/register', (req, res) => {
    res.render('registerPage', { errors: [] });
});

app.get('/home', (req, res) => {
    res.render('homePage');
});

app.get('/books', async (req, res) => {
    try {
        const books = await getBooks();
        res.render('booksPage', {
            booksList: books 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving books');
    }
});

app.get('/books/search', async (req, res) => {
    const searchQuery = req.query.search;
    try {
        const searchResult = await searchBooksByTitle(searchQuery);
        res.render('booksPage', {
            booksList: searchResult
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error performing the search');
    }
});


app.get('/recommendations', (req, res) => {
    res.render('recommendationsPage');
});

app.get('/reviews', (req, res) => {
    res.render('reviewsPage');
});

app.get('/account', async (req, res) => {

    if (req.session.userID) {
        try {

            const userDetails = await getUserDetails(req.session.userID);
            if (userDetails) {
                const formattedDate = moment(userDetails.dob).format('ddd, MMM DD YYYY');
                res.render('accountPage', {
                    userName: userDetails.userName,
                    userEmail: userDetails.userEmail,
                    dob: formattedDate,
                });
            } else {
                res.status(404).send('User not found');
            }

        } catch (error) {
            console.log(error);
            res.status(500).send('Error retrieving account details');
        }

    } else {
        res.redirect('/login');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});


/**
 * Server Initialization
 */

app.listen(port, () => {
    console.log(`my app is listening on port : ${port}`);
})

