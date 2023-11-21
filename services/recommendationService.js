const { query } = require("../db/database");

/**
 * Read All Recommendations From Database
 * @returns a promise that is an array of Recommendations objects. 
 */

const getRecommendations = async () => {
    try {
        let sql = `SELECT * FROM RECOMMENDATIONS`;
        const recommendations = await query(sql);
        return recommendations;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} id Recommendation id to retreive
 * @returns Promise that resolves to a Recommendation object
 * Read an Recommendation from database based on Recommendation id
 */

const getRecommendationsByID = async (id) => {
    try {
        let sql = `SELECT * FROM RECOMMENDATIONS WHERE recommendationID = ?`;
        const recommendation = await query(sql, [id]);
        return recommendation;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} bookID 
 * @param {int} recommenderUserID 
 * @param {int} recipientUserID 
 * Inserts a new Recommendation in the database.
 * @returns A Promise that resolves to the newly created Recommendation object
 */

const createRecommendation = async (bookID, recommenderUserID, recipientUserID) => {
    try {
        // Check if bookID exists in the books table
        const bookExists = await query(`SELECT 1 FROM BOOKS WHERE bookID = ?`, [bookID]);
        if (!bookExists.length) {
            throw new Error('Provided bookID does not exist in the books table.');
        }

        // Check if recommenderUserID exists in the users table
        const recommenderExists = await query(`SELECT 1 FROM USERS WHERE userID = ?`, [recommenderUserID]);
        if (!recommenderExists.length) {
            throw new Error('Provided recommender User ID does not exist in the users table.');
        }

        // Check if recipientUserID exists in the users table
        const recipientExists = await query(`SELECT 1 FROM USERS WHERE userID = ?`, [recipientUserID]);
        if (!recipientExists.length) {
            throw new Error('Provided recipient User ID does not exist in the users table.');
        }

        let sql = `INSERT INTO RECOMMENDATIONS (bookID, recommenderUserID, recipientUserID)
                   VALUES (?, ?, ?);`;

        const result = await query(sql, [bookID, recommenderUserID, recipientUserID]);


        let insertedRecommendation = await query(`SELECT * FROM RECOMMENDATIONS WHERE recommendationID = ?`, [result?.insertId]);
        return insertedRecommendation;
        //insertedRecommendation[0]
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} recommendationID 
 * @param {int} bookID 
 * @param {int} recommenderUserID 
 * @param {int} recipientUserID 
 * Updates an existing recommendation in the database.
 * @returns A Promise that resolves to the result of the update operation
 */

const updateRecommendation = async (recommendationID, bookID, recommenderUserID, recipientUserID) => {
    try {
        // Check if the recommendation exists
        const recommendationExists = await query(`SELECT 1 FROM RECOMMENDATIONS WHERE recommendationID = ?`, [recommendationID]);
        if (!recommendationExists.length) {
            throw new Error('Provided recommendationID does not exist.');
        }

        // Check if bookID exists in the books table
        const bookExists = await query(`SELECT 1 FROM BOOKS WHERE bookID = ?`, [bookID]);
        if (!bookExists.length) {
            throw new Error('Provided bookID does not exist in the books table.');
        }

        // Check if recommenderUserID exists in the users table
        const recommenderExists = await query(`SELECT 1 FROM USERS WHERE userID = ?`, [recommenderUserID]);
        if (!recommenderExists.length) {
            throw new Error('Provided recommenderUserID does not exist in the users table.');
        }

        // Check if recipientUserID exists in the users table
        const recipientExists = await query(`SELECT 1 FROM USERS WHERE userID = ?`, [recipientUserID]);
        if (!recipientExists.length) {
            throw new Error('Provided recipientUserID does not exist in the users table.');
        }


        let sql = `
            UPDATE RECOMMENDATIONS SET
            bookID = ?,
            recommenderUserID = ?,
            recipientUserID = ?
            WHERE recommendationID = ?;
        `;

        const result = await query(sql, [bookID, recommenderUserID, recipientUserID, recommendationID]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} id The ID of the Recommendation to delete passed as parameter
 * @returns A Promise that resolves to the result of the delete operation.
 * Deletes an Recommendation from database.
 */

const deleteRecommendation = async (id) => {
    try {
        return await query("DELETE FROM RECOMMENDATIONS WHERE recommendationID = ?", [id]);
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    getRecommendations,
    getRecommendationsByID,
    createRecommendation,
    updateRecommendation,
    deleteRecommendation
}