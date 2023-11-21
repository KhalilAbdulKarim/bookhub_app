const { getRecommendations, getRecommendationsByID, createRecommendation, updateRecommendation, deleteRecommendation } = require("../services/recommendationService");
const { validationResult } = require("express-validator");

/**
 * Purpose: Retrieves all Recommendations from the database
 * @param {object} req 
 * @param {object} res
 * HTTP Method: GET
 * 200 OK: On success, returns an array of Recommendations objects.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getRecommendationsController = async (req, res) => {
    try {
        const recommendations = await getRecommendations();
        res.status(200).json({ recommendations });
    } catch (error) {
        res.status(200).json({ message: error?.message })
    }
}

/**
 * Purpose: Retrieves a Recommendation from the database based on URL param id 
 * HTTP Method: GET
 * @param {object} req 
 * @param {object} res 
 * 200 OK: On success, returns an Recommendation object.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getRecommendationsByIDController = async (req, res) => {
    try {
        const recommendationID = req.params.id;
        const recommendation = await getRecommendationsByID(recommendationID);
        res.status(200).json({ recommendation });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Creates a new Recommendation in the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: POST
 * 201 Created: On successful creation, returns the created Recommendation object.
 * 400 Bad Request: If validation fails or required data is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const createRecommendationController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { bookID, recommenderUserID, recipientUserID } = req.body;

    try {
        const recommendation = await createRecommendation(bookID, recommenderUserID, recipientUserID);
        res.status(201).json({ recommendation });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

/**
 * Purpose: Updates an existing recommendation.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: PUT
 * 201 Created: On successful update, returns the updated Recommendation object.
 * 400 Bad Request: If the ID is missing, or validation fails.
 * 500 Internal Server Error: On failure, returns an error message
 */

const updateRecommendationController = async (req, res) => {
    const recommendationID = req.params.id;
    const { bookID, recommenderUserID, recipientUserID } = req.body;
    
    if (!recommendationID) {
        return res.status(400).json({ message: "Missing data" })
    }
    try {
        const updatedRecommendation = await updateRecommendation(recommendationID, bookID, recommenderUserID, recipientUserID);
        res.status(201).json({ updatedRecommendation });

    } catch (error) {
        res.status(500).json({ error: error?.message });
    }

}

/**
 * Purpose: Deletes a Recommendations from the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: DELETE
 * 200 OK: On successful deletion, returns a success message.
 * 400 Bad Request: If the ID is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 * 
 */

const deleteRecommendationController = async (req, res) => {
    const  recommendationID  = req.params.id;
    if (!recommendationID) {
        return res.status(400).json({ message: "Missing recommendation id" });
    }
    try {
        const result = await deleteRecommendation(recommendationID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}



module.exports = {
    getRecommendationsController,
    getRecommendationsByIDController,
    createRecommendationController,
    updateRecommendationController,
    deleteRecommendationController
}

