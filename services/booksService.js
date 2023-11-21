const { query } = require("../db/database");
const moment = require("moment");

/**
 * Read All Books From Database.
 * @returns a promise that is an array of Books objects. 
 */

const getBooks = async () => {
    try {
        let sql = `SELECT * FROM BOOKS`;
        const books = await query(sql);
        return books;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} bookID to retreive
 * @returns Promise that resolves to a book object
 * Read an Book from database based on book id
 */

const getBookByID = async (bookID) => {
    try {
        let sql = `SELECT * FROM BOOKS WHERE bookID = ? `;
        const book = await query(sql, [bookID]);
        return book;
    } catch (error) {
        throw new Error(error);

    }
}

/**
 * 
 * @param {string} title 
 * @param {Date} publishedDate 
 * @param {int} ISBN 
 * @param {int} genreID 
 * @param {int} authorID 
 * @param {string} synopsis 
 * Inserts a new Book in the database.
 * @returns A Promise that resolves to the newly created Book object
 */

const createBook = async (title, publishedDate, ISBN, genreID,authorID,synopsis) => {
    try {
        // Check if authorID exists in the author table
        const authorExists = await query(`SELECT 1 FROM AUTHORS WHERE authorID = ?`, [authorID]);
        if (!authorExists.length) {
            throw new Error('Provided author id does not exist in the author table.');
        }

        // Check if genreID exists in the genre table
        const genreExists = await query(`SELECT 1 FROM GENRE WHERE genreID = ?`, [genreID]);

        if (!genreExists.length) {
            throw new Error('Provided genre id does not exist in the genre table.');
        }

        let sql = `INSERT INTO BOOKS(title, publishedDate, ISBN, genreID, authorID,synopsis)
        VALUES (?, ?, ?, ?, ?, ?);`;

        const result = await query(sql, [
            title,
            moment(publishedDate).format("YYYY-MM-DD"),
            ISBN,
            genreID,
            authorID,
            synopsis
        ]);


        let insertedBook = await query(`SELECT * FROM BOOKS WHERE bookID = ?`, [result?.insertId]);
        return insertedBook;

    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} bookID 
 * @param {string} title 
 * @param {Date} publishedDate 
 * @param {int} genreID 
 * @param {int} authorID 
 * @param {string} synopsis 
 * Updates an existing book in the database.
 * @returns A Promise that resolves to the result of the update operation.
 */

const updateBook = async (bookID,title, publishedDate, genreID, authorID,synopsis) => {
    try {

        let sql = `UPDATE BOOKS SET
            title = ?,
            publishedDate = ?,
            genreID = ?,
            authorID = ?,
            synopsis = ?
            WHERE bookID = ?; `;

        const result = await query(sql, [title, moment(publishedDate).format("YYYY-MM-DD"), genreID, authorID,synopsis,bookID]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} id The ID of the book to delete passed as parameter
 * @returns A Promise that resolves to the result of the delete operation.
 * Deletes an book from database.
 */


const deleteBook = async (id) => {
    try {
        return await query("DELETE FROM BOOKS WHERE bookID = ?", [id]);
    } catch (error) {
        throw new Error(error);
    }

}


module.exports = {
    getBooks,
    getBookByID,
    createBook,
    updateBook,
    deleteBook
}