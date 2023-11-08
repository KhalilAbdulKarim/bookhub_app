const {check} = require("express-validator");

const createBookValidation = [
    check('title').notEmpty().withMessage('Title is required'),
    check('publishedDate').isDate().withMessage('Date must be valid'),
    check('ISBN').isISBN(13).withMessage('Invalid ISBN-13'),
    check('genreID').isInt().withMessage('ID must be an integer number'),
    check('genreID').notEmpty().withMessage('Genre ID is required'),
    check('authorID').isInt().withMessage('ID must be an integer number'),
    check('authorID').notEmpty().withMessage('Author ID is required')
];

const updateBookValidation = [
    check('bookID').isInt().withMessage('ID must be an integer number'),
    check('bookID').notEmpty().withMessage('Book ID is required'),
    check('title').notEmpty().withMessage('Title is required'),
    check('ISBN').isISBN(13).withMessage('Invalid ISBN-13'),
    check('ISBN').notEmpty().withMessage('ISBN is required'),
    check('genreID').isInt().withMessage('ID must be an integer number'),
    check('genreID').notEmpty().withMessage('Genre ID is required'),
    check('publishedDate').isDate().withMessage('Date must be valid'),
    check ('publishedDate').notEmpty().withMessage('Date cannot be empty')

];

module.exports = {
    createBookValidation,
    updateBookValidation
}


