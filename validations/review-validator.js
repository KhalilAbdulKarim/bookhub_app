const { check } = require("express-validator");
const moment = require("moment");

const createReviewValidator = [
    check('userID').notEmpty().withMessage('User id is required'),
    check('userID').isInt().withMessage('ID must be an integer number'),
    check('bookID').notEmpty().withMessage('Book id is required'),
    check('bookID').isInt().withMessage('ID must be an integer number'),
    check('rating').isInt({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    check('datePosted').notEmpty().withMessage('Date can not be Empty')
        .isDate().withMessage('Date must be a valid date')
        .custom((value) => {
            if (moment(value).isAfter(moment())) {
                throw new Error('Date cannot be in the future');
            }
            return true;
        }),
];


const updateReviewValidator = [
    check('reviewID').notEmpty().withMessage('Review ID is required'),
    check('reviewID').isInt().withMessage('ID must be an integer number'),
    check('userID').notEmpty().withMessage('User ID is required'),
    check('userID').isInt().withMessage('ID must be an integer number'),
    check('bookID').notEmpty().withMessage('Book ID is required'),
    check('bookID').isInt().withMessage('ID must be an integer number'),
    check('rating').isInt({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    check('datePosted').notEmpty().withMessage('Date can not be Empty')
        .isDate().withMessage('Date must be a valid date')
        .custom((value) => {
            if (moment(value).isAfter(moment())) {
                throw new Error('Date cannot be in the future');
            }
            return true;
        }),
];





module.exports = {
    createReviewValidator,
    updateReviewValidator

}