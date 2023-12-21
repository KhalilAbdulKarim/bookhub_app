const { query } = require("../db/database");

/**
 * Read All genres From Database
 * @returns a promise that is an array of genres.
 */

const getGenres = async () => {
    try {
        let sql = `SELECT * FROM GENRE`;
        const genres = await query(sql);
        return genres;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} id genre id to retreive
 * @returns Promise that resolves to a genre
 * Read an genre from database based on genre id
 */

const getGenreByID = async (id) => {
    try {
        let sql = `SELECT * FROM GENRE WHERE genreID = ? `;
        const genre = await query(sql, [id]);
        return genre;
    } catch (error) {
        throw new Error(error);

    }
}


module.exports = {
    getGenres,
    getGenreByID,
}