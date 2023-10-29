const { query } = require("../db/database");
const moment = require("moment");

const getGenres = async () => {
    try {
        let sql = `SELECT * FROM GENRE`;
        const genres= await query(sql);
        return genres;
    } catch (error) {
        throw new Error(error);
    }
}

const getGenreByID = async (id) => {
    try {
        let sql = `SELECT * FROM GENRE WHERE genreID = ? `;
        const genre = await query(sql, [id]);
        return genre;
    } catch (error) {
        throw new Error(error);

    }
}

const createGenre = async (genreName) => {
    try{
        let sql = `INSERT INTO GENRE (genreName)
        VALUES (?);`;

        const result = await query (sql,genreName);

        let insertedGenre = await query (`SELECT * FROM GENRE WHERE genreID = ? `,[result?.insertID]);
        return insertedGenre;

    } catch(error){
        throw new Error(error);
    }
}

module.exports = {
    getGenres,
    getGenreByID,
    createGenre,
}