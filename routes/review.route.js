const express = require("express");
const { getAllReviewsController, getReviewByIDController, createReviewController, updateReviewController, deleteReviewController } = require("../controllers/reviewController");
const { getReviews, getReviewByID, createReview, updateReview, deleteReview } = require("../services/reviewService");
const { createReviewValidator, updateReviewValidator } = require("../validations/review-validator");

const router = express.Router();

router.get('/reviews', getAllReviewsController, getReviews);
router.get('/review/:id', getReviewByIDController, getReviewByID);
router.post('/review', createReviewValidator, createReviewController, createReview);
router.put('/review/:reviewID', updateReviewValidator, updateReviewController, updateReview);
router.delete('/review/:id', deleteReviewController, deleteReview);

module.exports = router;