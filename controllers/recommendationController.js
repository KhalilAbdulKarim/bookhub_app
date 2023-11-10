const { getRecommendations, getRecommendationsByID, createRecommendation, updateRecommendation, deleteRecommendation } = require("../services/recommendationService");
const { validationResult } = require("express-validator");

const getRecommendationsController = async (req, res) => {
    try {
        const recommendations = await getRecommendations();
        res.status(200).json({ recommendations });
    } catch (error) {
        res.status(200).json({ message: error?.message })
    }
}
const getRecommendationsByIDController = async (req, res) => {
    try {
        const recommendationID = req.params.id;
        const recommendation = await getRecommendationsByID(recommendationID);
        res.status(200).json({ recommendation });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

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

const updateRecommendationController = async (req, res) => {
    const { recommendationID, bookID, recommenderUserID, recipientUserID } = req.body;
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
const deleteRecommendationController = async (req, res) => {
    const { recommendationID } = req.body;
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

