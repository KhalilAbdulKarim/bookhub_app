const express = require("express");
const { getRecommendationsController, getRecommendationsByIDController,
    createRecommendationController, updateRecommendationController,
    deleteRecommendationController }= require("../controllers/recommendationController");

const { getRecommendations,
    getRecommendationsByID,
    createRecommendation,
    updateRecommendation,
    deleteRecommendation } = require("../services/recommendationService");

const { createRecommendationValidator,
    updateRecommendationValidator } = require("../validations/recommendation-validator");

const router = express.Router();

router.get('/recommendations',getRecommendationsController,getRecommendations);
router.get('/recommendation/:id',getRecommendationsByIDController,getRecommendationsByID);
router.post('/recommendation',createRecommendationController,createRecommendation,createRecommendationValidator);
router.put('/recommendation/:id',updateRecommendationController,updateRecommendation,updateRecommendationValidator);
router.delete('/recommendation/:id',deleteRecommendationController,deleteRecommendation);




module.exports = router;