const { getGenres, getGenreByID } = require("../services/genreService");

const getGenresControllers = async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).json({ genres });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }

}


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