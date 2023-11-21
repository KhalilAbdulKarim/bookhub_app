const { getAuthors,getAuthorByID,createAuthor, updateAuthor, deleteAuthor } = require("../services/authorsService");
const { validationResult } = require("express-validator");

/**
 * Purpose: Retrieves all authors from the database
 * @param {object} req 
 * @param {object} res
 * HTTP Method: GET
 * 200 OK: On success, returns an array of author objects.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getAllAuthorsController = async (req, res) => {
    try {
        const authors = await getAuthors();
        res.status(200).json({ authors });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Retrieves an author from the database based on URL param id 
 * HTTP Method: GET
 * @param {object} req 
 * @param {object} res 
 * 200 OK: On success, returns an author object.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getAuthorByIDController = async (req, res) => {
    try {
        const authorID = req.params.id;
        const author = await getAuthorByID  (authorID);
        res.status(200).json({ author });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Creates a new author in the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: POST
 * 201 Created: On successful creation, returns the created author object.
 * 400 Bad Request: If validation fails or required data is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const createAuthorController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { authorName, authorPassword, authorEmail, dob, bio } = req.body;
    try {
        const response = await createAuthor(authorName, authorEmail,authorPassword,dob, bio)
        res.status(201).json({ response });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Updates an existing author's information.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: PUT
 * 201 Created: On successful update, returns the updated author object.
 * 400 Bad Request: If the ID is missing, or validation fails.
 * 500 Internal Server Error: On failure, returns an error message
 */

const updateAuthorController = async (req, res) => {
    const authorID = req.params.id;
    const { authorName, authorEmail, authorPassword, dob, bio } = req.body;
    if (!authorID) {
        return res.status(400).json({ message: "missing data" })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await updateAuthor(authorID, authorName, authorEmail, authorPassword, dob, bio);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}


/**
 * Purpose: Deletes an author from the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: DELETE
 * 200 OK: On successful deletion, returns a success message.
 * 400 Bad Request: If the ID is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 * 
 */

const deleteAuthorController = async (req, res) => {
    const authorID  = req.params.id;

    if (!authorID) {
        return res.status(400).json({ message: "missing author id" });
    }
    try {
        const result = await deleteAuthor(authorID);
        // res.status(200).json({ result });
        if(result.affectedRows === 0){
            return res.status(404).json({message:"Author not found."})
        }
        res.status(200).json({ message: "Author deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}





module.exports = {
    getAllAuthorsController,
    getAuthorByIDController,
    createAuthorController,
    updateAuthorController,
    deleteAuthorController
}