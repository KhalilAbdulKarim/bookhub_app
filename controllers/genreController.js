const { getGenres, getGenreByID } = require("../services/genreService");

/**
 * Purpose: Retrieves all genres types from the database
 * @param {object} req 
 * @param {object} res
 * HTTP Method: GET
 * 200 OK: On success, returns an array of genres objects.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getGenresControllers = async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).json({ genres });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }

}

/**
 * Purpose: Retrieves a genre from the database based on URL param id 
 * HTTP Method: GET
 * @param {object} req 
 * @param {object} res 
 * 200 OK: On success, returns an genre object.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getGenreByIDController = async (req, res) => {
    try {
        const genreID = req.params.id;
        const genre = await getGenreByID(genreID);
        res.status(200).json({ genre });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}



module.exports = {
    getGenresControllers,
    getGenreByIDController
}