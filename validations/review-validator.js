const {check} = require("express-validator");

const createReviewValidator = [
    check('userID').notEmpty().withMessage('User id is required'),
    check('userID').isInt().withMessage('ID must be an integer number'),
    check('bookID').notEmpty().withMessage('Book id is required'),
    check('bookID').isInt().withMessage('ID must be an integer number'),
    check('rating').isInt({min: 0, max:5}).withMessage('Rating must be between 0 and 5'),
    check('datePosted').notEmpty('Date of post cannot be empty'),
    check('datePosted').isDate().withMessage('Date must be valid')
];


const updateReviewValidator = [
    check('reviewID').notEmpty().withMessage('Review ID is required'),
    check('reviewID').isInt().withMessage('ID must be an integer number'),
    check('userID').notEmpty().withMessage('User ID is required'),
    check('userID').isInt().withMessage('ID must be an integer number'),
    check('bookID').notEmpty().withMessage('Book ID is required'),
    check('bookID').isInt().withMessage('ID must be an integer number'),
    check('rating').isInt({min: 0, max:5}).withMessage('Rating must be between 0 and 5'),
    check('datePosted').notEmpty('Date of post cannot be empty'),
    check('datePosted').isDate().withMessage('Date must be valid'),

];





module.exports = {
    createReviewValidator,
    updateReviewValidator

}