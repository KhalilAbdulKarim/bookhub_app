const {check} = require("express-validator");
const moment = require ("moment");

const createBookValidation = [
    check('title').trim().notEmpty().withMessage('Title is required'),
    check('ISBN').isISBN(13).withMessage('Invalid ISBN-13'),
    check('genreID').isInt().withMessage('ID must be an integer number'),
    check('genreID').notEmpty().withMessage('Genre ID is required'),
    check('authorID').isInt().withMessage('ID must be an integer number'),
    check('authorID').notEmpty().withMessage('Author ID is required'),
    check('publishedDate').notEmpty().withMessage('Date can not be Empty')
    .isDate().withMessage('Date must be a valid date')
    .custom((value)=>{
        if(moment(value).isAfter(moment())){
            throw new Error('Date of publishing cannot be in the future');
        }
        return true;
    }),
    
];

const updateBookValidation = [
    check('bookID').isInt().withMessage('ID must be an integer number'),
    check('bookID').notEmpty().withMessage('Book ID is required'),
    check('title').trim().notEmpty().withMessage('Title is required'),
    check('ISBN').isISBN(13).withMessage('Invalid ISBN-13'),
    check('ISBN').notEmpty().withMessage('ISBN is required'),
    check('genreID').isInt().withMessage('ID must be an integer number'),
    check('genreID').notEmpty().withMessage('Genre ID is required'),
    check('authorID').isInt().withMessage('ID must be an integer number'),
    check('authorID').notEmpty().withMessage('Author ID is required'),
    check('publishedDate').notEmpty().withMessage('Date can not be Empty')
    .isDate().withMessage('Date must be a valid date')
    .custom((value)=>{
        if(moment(value).isAfter(moment())){
            throw new Error('Date of publishing cannot be in the future');
        }
        return true;
    }),
];

module.exports = {
    createBookValidation,
    updateBookValidation
}


