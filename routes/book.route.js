const express = require("express");
const {getAllBooksController,getBookByIDController,createBookController,updateBookController,deleteBookController} = require("../controllers/booksController");
const {getBooks,getBookByID,createBook,updateBook,deleteBook} = require("../services/booksService");
const {createBookValidation,updateBookValidation} = require("../validations/book-validator");
const router = express.Router();

router.get('/books',getAllBooksController,getBooks);
router.get('/book/:id',getBookByIDController,getBookByID);
router.post('/book',createBookValidation,createBookController,createBook);
router.put('/book/:id',updateBookValidation,updateBookController,updateBook);
router.delete('/book/:id',deleteBookController);

module.exports = router;