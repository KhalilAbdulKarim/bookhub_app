const express = require("express");
const {getAllAuthorsController,createAuthorController,updateAuthorController,deleteAuthorController} = require('../controllers/authorController');
const {getAuthorByID,deleteAuthor} = require('../services/authorsService');
const {createAuthorValidation,updateAuthorValidation} = require('../validations/author-validator');
const router = express.Router();

router.get('/authors',getAllAuthorsController); // read
// router.get('/author/:id', getUserByIDController); // read
router.post('/author', createAuthorValidation, createAuthorController); // create 
router.put('/author', updateAuthorController,updateAuthorValidation); // update
router.delete('/author',deleteAuthorController,deleteAuthor);// delete

module.exports = router;