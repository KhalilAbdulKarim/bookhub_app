const express = require("express");
const {getAllAuthorsController,getAuthorByIDController,createAuthorController,updateAuthorController,deleteAuthorController} = require('../controllers/authorController');
const {getAuthorByID,deleteAuthor} = require('../services/authorsService');
const {createAuthorValidation,updateAuthorValidation} = require('../validations/author-validator');
const router = express.Router();

router.get('/authors',getAllAuthorsController); // read
router.get('/author/:id',getAuthorByIDController); // read
router.post('/author', createAuthorValidation, createAuthorController); // create 
router.put('/author/:id', updateAuthorValidation,updateAuthorController); // update
router.delete('/author/:id',deleteAuthorController,deleteAuthor);// delete


module.exports = router;