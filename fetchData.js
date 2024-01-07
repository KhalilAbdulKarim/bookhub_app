require('dotenv').config();
const express = require('express');
const axios = require('axios');
const mysql = require('mysql2/promise');
const app = express();
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const port = 3005;



// Database pool setup
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// Constants
const keywords = ['fiction', 'history', 'science', 'biography', 'technology', 'philosophy', 'literature'];
const apiKey = process.env.API_KEY;
const maxBooks = 50;



const generateShortUniqueId = () => {
    // This creates a hash from a new UUID and takes the first 13 characters
    return crypto.createHash('sha256').update(uuidv4()).digest('hex').substring(0, 13);
};


// Function to process book data from API response
const processBookData = (apiResponse) => {
    const book = apiResponse.volumeInfo;
    let publishedDate = book.publishedDate;
    let ISBN = book.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier;
    if (!ISBN) {
        ISBN = generateShortUniqueId();
    }

    if (publishedDate) {
        if (publishedDate.match(/^\d{4}$/)) {
            // if only year is provided, set to January 1st of that year
            publishedDate = `${publishedDate}-01-01`;
        } else if (publishedDate.match(/^\d{4}-\d{2}$/)) {
            // if year and month are provided, set to the first of that month
            publishedDate = `${publishedDate}-01`;
        }
    }

    return {
        title: book.title,
        publishedDate: publishedDate,
        ISBN: ISBN,
        authors: book.authors || [],
        genres: book.categories || [],
        synopsis: book.description
    };
};

const getAuthorId = async (authorName) => {
    let authorId;

    // If author name is not provided, use 'Unknown'
    authorName = authorName || 'Unknown';

    try {
        // Check if the author exists in the database
        const [authorRows] = await pool.query('SELECT authorID FROM AUTHORS WHERE authorName = ?', [authorName]);
        if (authorRows.length > 0) {
            // Author exists, return the existing ID
            authorId = authorRows[0].authorID;
        } else {
            // Insert the new author and return the new ID
            const [insertResult] = await pool.query('INSERT INTO AUTHORS (authorName, authorEmail) VALUES (?, ?)', [authorName, `${authorName.replace(/\s+/g, '').toLowerCase()}@unknown.com`]);
            authorId = insertResult.insertId;
        }
    } catch (error) {
        console.error('Error in getAuthorId:', error);
        throw error;
    }
    return authorId;
};




const getGenreId = async (genreName) => {
    let genreId;
    genreName = genreName || 'Unknown';
    try {
        // Check if the genre exists in the database
        const [genreRows] = await pool.query('SELECT genreID FROM GENRE WHERE genreName = ?', [genreName]);
        if (genreRows.length > 0) {
            // Genre exists, return the existing ID
            genreId = genreRows[0].genreID;
        } else {
            // Insert the new genre and return the new ID
            const [insertResult] = await pool.query('INSERT INTO GENRE (genreName) VALUES (?)', [genreName]);
            genreId = insertResult.insertId;
        }
    } catch (error) {
        console.error('Error in getGenreId:', error);
        throw error;
    }
    return genreId;
};

const insertBookIntoDatabase = async (processedBook) => {
    // If there are no authors, use the default 'Unknown' author
    const authorID = processedBook.authors.length > 0
        ? await getAuthorId(processedBook.authors[0])
        : await getAuthorId('Unknown');

    // If there are no genres, use the default 'Unknown' genre
    const genreID = processedBook.genres.length > 0
        ? await getGenreId(processedBook.genres[0])
        : await getGenreId('Unknown');

    await pool.query(
        'INSERT INTO BOOKS (title, publishedDate, ISBN, authorID, genreID, synopsis) VALUES (?, ?, ?, ?, ?, ?)',
        [processedBook.title, processedBook.publishedDate, processedBook.ISBN, authorID, genreID, processedBook.synopsis]
    );
};



const fetchAndStoreBooks = async () => {
    let fetchedBooks = 0;
    while (fetchedBooks < maxBooks) {
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        const startIndex = Math.floor(Math.random() * 100);
        const url = `https://www.googleapis.com/books/v1/volumes?q=${randomKeyword}&startIndex=${startIndex}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const books = response.data.items || [];

            for (const book of books) {
                if (fetchedBooks >= maxBooks) break;
                const processedBook = processBookData(book);
                await insertBookIntoDatabase(processedBook);
                fetchedBooks++;
            }
        } catch (error) {
            console.error('Error fetching data from Google Books API:', error);
            break;
        }
    }
    return fetchedBooks;
};

app.get('/fetch-books', async (req, res) => {
    try {
        const numFetchedBooks = await fetchAndStoreBooks();
        res.send(`${numFetchedBooks} books fetched and stored successfully`);
    } catch (error) {
        console.error('Error during fetching and storing books:', error);
        res.status(500).send('An error occurred while fetching and storing books');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
