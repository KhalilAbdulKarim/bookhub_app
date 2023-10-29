const { query } = require("../db/database");
const moment = require("moment");

const getBooks = async () => {
    try {
        let sql = `SELECT * FROM BOOKS`;
        const books = await query(sql);
        return books;
    } catch (error) {
        throw new Error(error);
    }
}

const getBookByID = async (id) => {
    try {
        let sql = `SELECT * FROM BOOKS WHERE bookID = ? `;
        const book = await query(sql, [id]);
        return book;
    } catch (error) {
        throw new Error(error);

    }
}

const createBook = async (title, publishedDate, ISBN, genreName, authorID) => {
    try {
        // Check if authorID exists in the author table
        const authorExists = await query(`SELECT 1 FROM AUTHOR WHERE authorID = ?`, [authorID]);
        if (!authorExists.length) {
            throw new Error('Provided author ID does not exist in the author table.');
        }

        // Check if genreName exists in the genre table
        const genreExists = await query(`SELECT 1 FROM GENRE WHERE genreName = ?`, [genreName]);

        if (!genreExists.length) {
            throw new Error('Provided genreName does not exist in the genre table.');
        }
       
        let sql = `INSERT INTO BOOKS(title, publishedDate, ISBN, genreName, authorID)
        VALUES (?, ?, ?, ?, ?);`;

        const result = await query(sql, [
            title,
            moment(publishedDate).format("YYYY-MM-DD"),
            ISBN,
            genreName,
            authorID
        ]);

        
        let insertedBook = await query(`SELECT * FROM BOOKS WHERE bookID = ?`, [result?.insertID]);
        return insertedBook;

    } catch (error) {
        throw new Error(error);
    }
}


    const updateBook = async (books) => {
        try {
            const { bookID,title,publishedDate,ISBN,genreName} = books;
    
            let sql = `UPDATE BOOKS SET
            title = ?,
            publishedDate = ?,
            ISBN = ?,
            genreName = ?
            WHERE bookID = ?; 
            `;
            const result = await query(sql, [ bookID,title,ISBN,genreName, moment(publishedDate).format(YYYY - MM - DD)]);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    const deleteBook = async (id) =>{
        try{
            return await query("DELETE FROM BOOKS WHERE bookID = ?", [id]);
        }catch(error){
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