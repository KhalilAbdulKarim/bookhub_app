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
const { getBooks, searchBooksByTitle ,getBooksWithReviewsCount,getReviewsForBook} = require("./services/booksService");
const { getUserByID, updateUser, deleteUser } = require("./services/usersService");
const { createReview,getUserReviewsWithBookDetails} = require("./services/reviewService");
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
    const limit = 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    try {
        const allBooks = await getBooksWithReviewsCount();
        const totalRows = allBooks.length;
        const totalPages = Math.ceil(totalRows / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const booksPerPage = allBooks.slice(startIndex, endIndex);

        res.render('booksPage', {
            booksList: booksPerPage,
            currentPage: page,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving books');
    }
});

app.get('/books/search', async (req, res) => {
    const searchQuery = req.query.search;
    const limit = 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;


    try {
        const allSearchResults = await searchBooksByTitle(searchQuery);
        const totalRows = allSearchResults.length;
        const totalPages = Math.ceil(totalRows / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const booksPerPage = allSearchResults.slice(startIndex, endIndex);

        res.render('booksPage', {
            booksList: booksPerPage,
            currentPage: page,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            searchQuery: searchQuery,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error performing the search');
    }
});



app.get('/recommendations', (req, res) => {
    res.render('recommendationsPage');
});

app.get('/reviews', async (req, res) => {
    if (!req.session.userID) {
        return res.redirect('/login');
    }
    try {
        const userID = req.session.userID;
        const reviews = await getUserReviewsWithBookDetails(userID);
        res.render('reviewsPage', { reviews: reviews });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving reviews');
    }
});


app.get('/bookReviews/:bookID', async (req, res) => {
    const bookID = req.params.bookID;
    try {
        const reviews = await getReviewsForBook(bookID);
        res.render('bookReviewsPage', { reviews: reviews });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving reviews');
    }
});




app.get('/addReview', async (req, res) => {
    if (!req.session.userID) {
        return res.redirect('/login');
    }

    const bookID = req.query.bookID;
    const userID = req.session.userID;

    console.log("Received bookID for review page:", bookID);

    res.render('addReviewPage', { bookID, userID });
});


app.post('/submitReview', async (req, res) => {
    const { userID, bookID, rating, reviewText } = req.body;

    console.log('Received Review Data:', { userID, bookID, rating, reviewText });

    try {
        const review = await createReview(userID, bookID, rating, reviewText);
        console.log('Review Created:', review);
        res.redirect('/books');
    } catch (error) {
        console.error('Error in submitting review:', error.message);
        res.status(500).send('Error in submitting review: ' + error.message);
    }
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


app.post('/updateAccount', async (req, res) => {
    if (!req.session.userID) {
        return res.redirect('/login');
    }

    const userID = req.session.userID;
    const { userName, userEmail, userPassword, dob } = req.body;

    try {
        await updateUser(userID, userName, userPassword, userEmail, dob);
        res.redirect('/account');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error occurred.');
    }
});

app.get('/updateAccount', async (req, res) => {
    if (!req.session.userID) {
        return res.redirect('/login');
    }

    try {
        const userDetails = await getUserDetails(req.session.userID);
        res.render('updateAccountPage', {
            userName: userDetails.userName,
            userEmail: userDetails.userEmail,
            dob: userDetails.dob,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error occurred.');
    }
});

app.post('/deleteAccount', async (req, res) => {
    const { passwordToDelete } = req.body;

    if (!req.session.userID) {
        return res.status(401).send('User not logged in');
    }

    try {
        const userDetails = await getUserByID(req.session.userID);

        if (userDetails && userDetails.userPassword === passwordToDelete) {
            await deleteUser(req.session.userID);
            req.session.destroy();
            res.redirect('/login');
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});



/**
 * Server Initialization
 */

app.listen(port, () => {
    console.log(`my app is listening on port : ${port}`);
})

