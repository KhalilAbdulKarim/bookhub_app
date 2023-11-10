const express = require("express");
const {getAllBooksController,getBookByIDController,createBookController,updateBookController,deleteBookController} = require("../controllers/booksController");
const {getBooks,getBookByID,createBook,updateBook,deleteBook} = require("../services/booksService");
const {createBookValidation,updateBookValidation} = require("../validations/book-validator");
const router = express.Router();

router.get('/books',getAllBooksController,getBooks);
router.get('/book/:id',getBookByIDController,getBookByID);
router.post('/book',createBookController,createBookValidation,createBook);
router.put('/book',updateBook,updateBookController,updateBookValidation);
router.delete('/book',deleteBook,deleteBookController);

module.exports = router;