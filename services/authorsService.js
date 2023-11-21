const { query } = require("../db/database");
const moment = require("moment");

/**
 * Read all Authors from database
 * @returns a promise that is an array of Authors objects
 */

const getAuthors = async () => {
    try {
        let sql = `SELECT * FROM AUTHORS`;
        const authors = await query(sql);
        return authors;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} id of the Author to retreive
 * @returns  Promise that resolves to a author object
 * Read an Author from database based on author id
 */

const getAuthorByID = async (id) => {
    try {
        let sql = `SELECT * FROM AUTHORS WHERE authorID = ? `;
        const author = await query(sql, [id]);
        return author;
    } catch (error) {
        throw new Error(error);

    }
}

/**
 * 
 * @param {string} authorName 
 * @param {string} authorEmail
 * @param {string} authorPassword 
 * @param {Date} dob 
 * @param {string} bio 
 * Inserts a new Author in the database.
 * @returns A Promise that resolves to the newly created Author object
 */

const createAuthor = async (authorName, authorEmail, authorPassword, dob, bio) => {
    try {
        let sql =
            `INSERT INTO AUTHORS (authorName,authorEmail,authorPassword,dob,bio)
        VALUES (?, ?, ?, ?,?);`;

        const result = await query(sql, [
            authorName,
            authorEmail,
            authorPassword,
            moment(dob).format("YYYY-MM-DD"),
            bio
        ]);

        let insertedAuthor = await query(`SELECT * FROM AUTHORS WHERE authorID = ? `, [result?.insertId]);
        return insertedAuthor;

    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} authorID 
 * @param {string} authorName 
 * @param {string} authorEmail 
 * @param {string} authorPassword 
 * @param {Date} dob 
 * @param {string} bio 
 * Updates an existing Author in the database.
 * @returns A Promise that resolves to the result of the update operation.
 */

const updateAuthor = async (authorID, authorName, authorEmail, authorPassword, dob, bio) => {
    try {
        let sql = `UPDATE AUTHORS SET
            authorName = ?,
            authorPassword = ?,
            authorEmail = ?,
            dob = ?,
            bio = ?
            WHERE authorID = ?; 
            `;
        const result = await query(sql, [authorName, authorPassword, authorEmail, moment(dob).format('YYYY-MM-DD'), bio, authorID]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} id The ID of the Author to delete passed as parameter
 * @returns A Promise that resolves to the result of the delete operation.
 * Deletes an Author from database.
 */

const deleteAuthor = async (id) => {
    try {
        return await query("DELETE FROM AUTHORS WHERE authorID = ?", [id]);
    } catch (error) {
        throw new Error(error);
    }

}


module.exports = {
    getAuthors,
    getAuthorByID,
    createAuthor,
    updateAuthor,
    deleteAuthor,
}