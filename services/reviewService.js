const { query } = require("../db/database");
const moment = require("moment");

/**
 * Read All Reviews From Database
 * @returns a promise that is an array of Reviews objects. 
 */
const getReviews = async () => {
    try {
        let sql = `SELECT * FROM REVIEWS`;
        const reviews = await query(sql);
        return reviews;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} id review id to retreive
 * @returns Promise that resolves to a review object
 * Read an review from database based on review id
 */

const getReviewByID = async (id) => {
    try {
        let sql = `SELECT * FROM REVIEWS WHERE reviewID = ? `;
        const review = await query(sql, [id]);
        return review;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} userID 
 * @param {int} bookID 
 * @param {int} rating 
 * @param {Date} datePosted 
 * @param {String} reviewText 
 * Inserts a new Review in the database.
 * @returns A Promise that resolves to the newly created Review object
 */

const createReview = async (userID, bookID, rating, reviewText) => {
    try {

        console.log('Creating review for BookID:', bookID);
        
        if (!bookID) {
            throw new Error('Book ID is undefined.');
        }
        // Check if userID exists in the users table
        const userExists = await query(`SELECT 1 FROM USERS WHERE userID = ?`, [userID]);
        if (!userExists.length) {
            throw new Error('Provided userID does not exist in the users table.');
        }

        // Check if bookID exists in the books table
        const bookExists = await query(`SELECT 1 FROM BOOKS WHERE bookID = ?`, [bookID]);
        if (!bookExists.length) {
            throw new Error('Provided bookID does not exist in the books table.');
        }

        // Insert the new review
        let sql = `
            INSERT INTO REVIEWS (userID, bookID, rating, datePosted, reviewText)
            VALUES (?, ?, ?,NOW(), ?);
        `;

        const result = await query(sql, [userID, bookID, rating, reviewText]);


        let insertedReview = await query(`SELECT * FROM REVIEWS WHERE reviewID = ?`, [result?.insertId]);
        return insertedReview[0];

    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} reviewID 
 * @param {int} userID 
 * @param {int} bookID 
 * @param {int} rating 
 * @param {Date} datePosted 
 * @param {string} reviewText 
 * Updates an existing review in the database.
 * @returns A Promise that resolves to the result of the update operation.
 */

const updateReview = async (reviewID, userID, bookID, rating, datePosted, reviewText) => {
    try {
        // Check if the review exists
        const reviewExists = await query(`SELECT 1 FROM REVIEWS WHERE reviewID = ?`, [reviewID]);
        if (!reviewExists.length) {
            throw new Error('Provided reviewID does not exist.');
        }

        // Check if userID exists in the users table (if updating)
        const userExists = await query(`SELECT 1 FROM USERS WHERE userID = ?`, [userID]);
        if (!userExists.length) {
            throw new Error('Provided userID does not exist in the users table.');
        }

        // Check if bookID exists in the books table (if updating)
        const bookExists = await query(`SELECT 1 FROM BOOKS WHERE bookID = ?`, [bookID]);
        if (!bookExists.length) {
            throw new Error('Provided bookID does not exist in the books table.');
        }


        let sql = `
            UPDATE reviews SET
            userID = ?,
            bookID = ?,
            rating = ?,
            datePosted = ?,
            reviewText = ?
            WHERE reviewID = ?;
        `;

        const result = await query(sql, [userID, bookID, rating, moment(datePosted).format("YYYY-MM-DD"), reviewText, reviewID]);
        return result;

    } catch (error) {
        throw new Error(error);
    }
}



const getUserReviewsWithBookDetails = async (userID) => {
    try {
        let sql = 
        `
            SELECT 
                R.*, 
                B.title, 
                B.publishedDate, 
                B.ISBN, 
                A.authorName, 
                G.genreName
            FROM 
                REVIEWS R
            JOIN 
                BOOKS B ON R.bookID = B.bookID
            JOIN 
                AUTHORS A ON B.authorID = A.authorID
            JOIN 
                GENRE G ON B.genreID = G.genreID
            WHERE 
                R.userID = ?
        `;
        const reviews = await query(sql, [userID]);
        return reviews;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} id The ID of the review to delete passed as parameter
 * @returns A Promise that resolves to the result of the delete operation.
 * Deletes an review from database.
 */

const deleteReview = async (id) => {
    try {
        return await query("DELETE FROM REVIEWS WHERE reviewID = ?", [id]);
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    getReviews,
    getReviewByID,
    createReview,
    updateReview,
    deleteReview,
    getUserReviewsWithBookDetails,
}
