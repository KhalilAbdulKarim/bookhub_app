const{check} = require("express-validator");
const moment = require('moment');

const createAuthorValidation = [
    check('authorName').trim().notEmpty().withMessage('Author name is required'),
    check('authorEmail').isEmail().withMessage('Invalid email format'),
    check('authorPassword').notEmpty().withMessage('Password is required'),
    check('authorPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    check('authorPassword').isStrongPassword().withMessage('You entered a weak password'),
    check('dob').notEmpty().withMessage('Date of Birth can not be Empty')
    .isDate().withMessage('Date of Birth must be a valid date')
    .custom((value)=>{
        if(moment(value).isAfter(moment())){
            throw new Error('Date of Birth cannot be in the future');
        }
        return true;
    }),
];

const updateAuthorValidation = [
    check('authorName').trim().notEmpty().withMessage('Author Name is required'),
    check('authorEmail').isEmail().withMessage('Invalid Email Format'),
    check('authorPassword').notEmpty().withMessage('Password is required'),
    check('authorPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    check('dob').notEmpty().withMessage('Date of Birth can not be Empty')
    .isDate().withMessage('Date of Birth must be a valid date')
    .custom((value)=>{
        if(moment(value).isAfter(moment())){
            throw new Error('Date of Birth cannot be in the future');
        }
        return true;
    }),
];

module.exports = {
    createAuthorValidation,
    updateAuthorValidation
};


