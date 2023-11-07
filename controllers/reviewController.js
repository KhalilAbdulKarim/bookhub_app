const {getReviews,getReviewByID,createReview,updateReview,deleteReview} = require("../services/reviewService");
const { validationResult } = require("express-validator");


const getAllReviewsController = async (req,res) => {
    try{
        const reviews = await getReviews();
        res.status(200).json({reviews});

    } catch(error){
        res.status(500).json({message:error?.message});
    }
}

const getReviewByIDController = async (req,res)=>{
    try {
        const reviewID = req.params.id;
        const review = await getReviewByID(reviewID);
        res.status(200).json({ review });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const createReviewController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {userID, bookID, rating, datePosted, reviewText} = req.body;

    try {
        const response = await createReview (userID,bookID,rating,datePosted,reviewText);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }

}

const updateReviewController = async (req, res) => {
    const { reviewID, userID, bookID, rating, datePosted, reviewText } = req.body;
    if (!reviewID) {
        return res.status(400).json({ message: "missing data" })
    }

    try {
        const response = await updateReview(reviewID,userID,bookID,rating,datePosted,reviewText);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteReviewController = async (req, res) => {
    const { reviewID } = req.body;

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