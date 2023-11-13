const { getBooks,getBookByID,createBook, updateBook, deleteBook } = require("../services/booksService");
const { validationResult } = require("express-validator");

const getAllBooksController = async (req, res) => {
    try {
        const books = await getBooks();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getBookByIDController = async (req,res)=>{
    try {
        const bookID = req.params.id;
        const book = await getBookByID(bookID);
        res.status(200).json({ book });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const createBookController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, publishedDate, ISBN, genreID,synopsis,authorID } = req.body;

    try {
        const response = await createBook(title, publishedDate, ISBN, genreID, authorID,synopsis)
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }

}

const updateBookController = async (req, res) => {
    //bookID comes from route parameter
    const bookID = req.params.id;
    const {title, publishedDate, ISBN, genreID,authorID,synopsis} = req.body;

    if (!bookID) {
        return res.status(400).json({ message: "missing data" })
    }

    try {
        const response = await updateBook(bookID,title, publishedDate, ISBN, genreID,authorID,synopsis);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteBookController = async (req, res) => {
    const  bookID  = req.params.id;

    if (!bookID) {
        return res.status(400).json({ message: "missing book id" });
    }
    try {
        const result = await deleteBook(bookID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getAllBooksController,
    getBookByIDController,
    createBookController,
    updateBookController,
    deleteBookController
}
