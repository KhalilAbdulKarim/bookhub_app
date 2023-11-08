const express = require("express");
const {getGenresControllers,getGenreByIDController} = require("../controllers/genreController");
const {getGenres,getGenreByID} = require("../services/genreService");


router.get('/genres',getGenres,getGenresControllers);
router.get('/genre/:id',getGenreByID,getGenreByIDController);

module.exports = router;

