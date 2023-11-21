const { getReviews, getReviewByID, createReview, updateReview, deleteReview } = require("../services/reviewService");
const { validationResult } = require("express-validator");


/**
 * Purpose: Retrieves all Reviews from the database
 * @param {object} req 
 * @param {object} res
 * HTTP Method: GET
 * 200 OK: On success, returns an array of Reviews objects.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getAllReviewsController = async (req, res) => {
    try {
        const reviews = await getReviews();
        res.status(200).json({ reviews });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Retrieves a Review from the database based on URL param id 
 * HTTP Method: GET
 * @param {object} req 
 * @param {object} res 
 * 200 OK: On success, returns an Review object.
 * 500 Internal Server Error: On failure, returns an error message.
 */


const getReviewByIDController = async (req, res) => {
    try {
        const reviewID = req.params.id;
        const review = await getReviewByID(reviewID);
        res.status(200).json({ review });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Creates a new Review in the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: POST
 * 201 Created: On successful creation, returns the created Review object.
 * 400 Bad Request: If validation fails or required data is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const createReviewController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userID, bookID, rating, datePosted, reviewText } = req.body;

    try {
        const response = await createReview(userID, bookID, rating, datePosted, reviewText);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }

}

/**
 * Purpose: Updates an existing Review information.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: PUT
 * 201 Created: On successful update, returns the updated Review object.
 * 400 Bad Request: If the ID is missing, or validation fails.
 * 500 Internal Server Error: On failure, returns an error message
 */

const updateReviewController = async (req, res) => {
    const reviewID = req.params.reviewID;
    const { userID, bookID, rating, datePosted, reviewText } = req.body;
    if (!reviewID) {
        return res.status(400).json({ message: "missing data" })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await updateReview(reviewID, userID, bookID, rating, datePosted, reviewText);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

/**
 * Purpose: Deletes a Review from the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: DELETE
 * 200 OK: On successful deletion, returns a success message.
 * 400 Bad Request: If the ID is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 * 
 */

const deleteReviewController = async (req, res) => {
    const reviewID  = req.params.id;

    if (!reviewID) {
        return res.status(400).json({ message: "missing review id" });
    }
    try {
        const result = await deleteReview(reviewID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getAllReviewsController,
    getReviewByIDController,
    createReviewController,
    updateReviewController,
    deleteReviewController
}