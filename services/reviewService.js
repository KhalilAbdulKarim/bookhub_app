const { query } = require("../db/database");
const moment = require("moment");

const getReviews = async () => {
    try {
        let sql = `SELECT * FROM REVIEWS`;
        const reviews = await query(sql);
        return reviews;
    } catch (error) {
        throw new Error(error);
    }
}

const getReviewByID = async (id) => {
    try {
        let sql = `SELECT * FROM REVIEWS WHERE reviewID = ? `;
        const review = await query(sql);
        return review;
    } catch (error) {
        throw new Error(error);
    }
}
const createReview = async (userID, bookID, rating, datePosted, reviewText) => {
    try {
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
            VALUES (?, ?, ?, ?, ?);
        `;

        const result = await query(sql, [userID, bookID, rating, moment(datePosted).format(YYYY - MM - DD), reviewText]);

        // Optionally: Retrieve the newly inserted review
        let insertedReview = await query(`SELECT * FROM REVIEWS WHERE reviewID = ?`, [result?.insertID]);
        return insertedReview[0];

    } catch (error) {
        throw new Error(error);
    }
}

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

        const result = await query(sql, [userID, bookID, rating, moment(datePosted).format(YYYY - MM - DD), reviewText, reviewID]);
        return result;

    } catch (error) {
        throw new Error(error);
    }
}

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

}
