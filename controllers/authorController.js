const { getAuthors, createAuthor, updateAuthor, deleteAuthor } = require("../services/authorsService");
const { validationResult } = require("express-validator");

const getAllAuthorsController = async (req, res) => {
    try {
        const authors = await getAuthors();
        res.status(200).json({ authors });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const createAuthorController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { authorName, authorPassword, authorEmail, dob, bio } = req.body;
    try {
        const response = await createAuthor(authorName, authorPassword, authorEmail, dob, bio)
        res.status(201).json({ response });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const updateAuthorController = async (req, res) => {
    const { authorID, authorName, authorEmail, authorPassword, dob, bio } = req.body;
    if (!authorID) {
        return res.status(400).json({ message: "missing data" })
    }

    try {
        const response = await updateAuthor(authorID, authorName, authorEmail, authorPassword, dob, bio);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteAuthorController = async (req, res) => {
    const { authorID } = req.body;

    if (!authorID) {
        return res.status(400).json({ message: "missing author id" });
    }
    try {
        const result = await deleteAuthor(authorID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}





module.exports = {
    getAllAuthorsController,
    createAuthorController,
    updateAuthorController,
    deleteAuthorController
}