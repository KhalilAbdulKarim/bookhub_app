const { query } = require("../db/database");
const moment = require("moment");

const getAuthors = async () => {
    try {
        let sql = `SELECT * FROM AUTHORS`;
        const authors = await query(sql);
        return authors;
    } catch (error) {
        throw new Error(error);
    }
}

const getAuthorByID = async (id) => {
    try {
        let sql = `SELECT * FROM AUTHORS WHERE authorID = ? `;
        const author = await query(sql, [id]);
        return author;
    } catch (error) {
        throw new Error(error);

    }
}

const createAuthor = async (authorName,authorEmail,authorPassword,dob,bio) => {
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

        let insertedAuthor = await query(`SELECT * FROM AUTHORS WHERE authorID = ? `, [result?.insertID]);
        return insertedAuthor;

    } catch (error) {
        throw new Error(error);
    }
}

    const updateAuthor = async (authors) => {
        try {
            const { authorID,authorName,authorEmail,authorPassword,dob,bio } = authors;
    
            let sql = `UPDATE AUTHORS SET
            authorName = ?,
            authorPassword = ?,
            authorEmail = ?,
            dob = ?
            bio = ?
            WHERE authorID = ?; 
            `;
            const result = await query(sql, [authorID,authorName,authorEmail,authorPassword, moment(dob).format(YYYY - MM - DD),bio]);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    const deleteAuthor = async (id) =>{
        try{
            return await query("DELETE FROM AUTHORS WHERE authorID = ?", [id]);
        }catch(error){
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