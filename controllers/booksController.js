const { getBooks, createBook, updateBook, deleteBook } = require("../services/booksService");
const { validationResult } = require("express-validator");

const getAllBooksController = async (req, res) => {
    try {
        const books = await getBooks();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const createBookController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, publishedDate, ISBN, genreName, authorID } = req.body;

    try {
        const response = await createBook(title, publishedDate, ISBN, genreName, authorID)
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }

}

const updateBookController = async (req, res) => {
    const { bookID, title, publishedDate, ISBN, genreName } = req.body;
    if (!bookID) {
        return res.status(400).json({ message: "missing data" })
    }

    try {
        const response = await updateBook(bookID, title, publishedDate, ISBN, genreName);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteBookController = async (req, res) => {
    const { bookID } = req.body;

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
    createBookController,
    updateBookController,
}
