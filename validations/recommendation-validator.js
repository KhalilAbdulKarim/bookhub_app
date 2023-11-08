const{check} = require("express-validator");

const createRecommendationValidator = [
    check('bookID').notEmpty().withMessage('Book id is required'),
    check('bookID').isInt().withMessage('ID must be an integer number'),
    check('recommenderUserID').notEmpty().withMessage('User id is required'),
    check('recommenderUserID').isInt().withMessage('ID must be an integer number'),
    check('recipientUserID').notEmpty().withMessage('User id is required'),
    check('recipientUserID').isInt().withMessage('ID must be an integer number'),
];

const updateRecommendationValidator = [
    check('recommendationID').isInt().withMessage('ID must be an integer number'),
    check('recommendationID').notEmpty().withMessage('recommendation id is required'),
    check('bookID').notEmpty().withMessage('Book id is required'),
    check('bookID').isInt().withMessage('ID must be an integer number'),
    check('recipientUserID').notEmpty().withMessage('User id is required'),
    check('recipientUserID').isInt().withMessage('ID must be an integer number'),
];

module.exports = {
    createRecommendationValidator,
    updateRecommendationValidator
}