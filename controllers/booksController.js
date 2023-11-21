const { getBooks, getBookByID, createBook, updateBook, deleteBook } = require("../services/booksService");
const { validationResult } = require("express-validator");


/**
 * Purpose: Retrieves all books from the database
 * @param {object} req 
 * @param {object} res
 * HTTP Method: GET
 * 200 OK: On success, returns an array of books objects.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getAllBooksController = async (req, res) => {
    try {
        const books = await getBooks();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Retrieves a book from the database based on URL param id 
 * HTTP Method: GET
 * @param {object} req 
 * @param {object} res 
 * 200 OK: On success, returns an book object.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getBookByIDController = async (req, res) => {
    try {
        const bookID = req.params.id;
        const book = await getBookByID(bookID);
        res.status(200).json({ book });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Creates a new book in the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: POST
 * 201 Created: On successful creation, returns the created author object.
 * 400 Bad Request: If validation fails or required data is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const createBookController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, publishedDate, ISBN, genreID, synopsis, authorID } = req.body;

    try {
        const response = await createBook(title, publishedDate, ISBN, genreID, authorID, synopsis)
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }

}

/**
 * Purpose: Updates an existing book information.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: PUT
 * 201 Created: On successful update, returns the updated author object.
 * 400 Bad Request: If the ID is missing, or validation fails.
 * 500 Internal Server Error: On failure, returns an error message
 */

const updateBookController = async (req, res) => {
    //bookID comes from route parameter
    const bookID = req.params.id;
    const { title, publishedDate, genreID, authorID, synopsis } = req.body;

    if (!bookID) {
        return res.status(400).json({ message: "missing data" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await updateBook(bookID, title, publishedDate, genreID, authorID, synopsis);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

/**
 * Purpose: Deletes a book from the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: DELETE
 * 200 OK: On successful deletion, returns a success message.
 * 400 Bad Request: If the ID is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 * 
 */

const deleteBookController = async (req, res) => {
    const bookID = req.params.id;

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
