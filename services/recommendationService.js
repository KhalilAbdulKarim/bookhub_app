const { query } = require("../db/database");


const getRecommendations = async () => {
    try {
        let sql = `SELECT * FROM RECOMMENDATIONS`;
        const recommendations = await query(sql);
        return recommendations;
    } catch (error) {
        throw new Error(error);
    }
}

const getRecommendationsByID = async (id) => {
    try {
        let sql = `SELECT * FROM RECOMMENDATIONS WHERE recommendationID = ?`;
        const recommendation = await query(sql,[id]);
        return recommendation;
    } catch (error) {
        throw new Error(error);
    }
}

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
   
        let sql = `INSERT INTO recommendation (bookID, recommenderUserID, recipientUserID)
                   VALUES (?, ?, ?);`;

        const result = await query(sql, [bookID, recommenderUserID, recipientUserID]);

        
        let insertedRecommendation = await query(`SELECT * FROM RECOMMENDATION WHERE recommendationID = ?`, [result?.insertId]);
        return insertedRecommendation; 
        //insertedRecommendation[0]
    } catch (error) {
        throw new Error(error);
    }
}

const updateRecommendation = async (recommendationID, bookID, recommenderUserID, recipientUserID) => {
    try {
        // Check if the recommendation exists
        const recommendationExists = await query(`SELECT 1 FROM RECOMMENDATION WHERE recommendationID = ?`, [recommendationID]);
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
            UPDATE RECOMMENDATION SET
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

const deleteRecommendation = async (id) =>{
    try{
        return await query("DELETE FROM RECOMMENDATION WHERE recommendationID = ?", [id]);
    }catch(error){
        throw new Error(error);
    }

}

module.export = {
    getRecommendations,
    getRecommendationsByID,
    createRecommendation,
    updateRecommendation,
    deleteRecommendation
}