const{check} = require("express-validator");

const createAuthorValidation = [
    check('authorName').notEmpty().withMessage('Author name is required'),
    check('authorEmail').isEmail().withMessage('Invalid Email Format'),
    check('authorPassword').notEmpty().withMessage('User Password is required'),
    check('authorPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    check('userPassword').isStrongPassword().withMessage('You entered a weak password'),
    check('dob').notEmpty().withMessage('Date of Birth can not be Empty'),
    check('dob').isDate().withMessage('Date of Birth must be a valid date'),
];

const updateAuthorValidation = [
    check('authorID').notEmpty().withMessage('User Id is required'),
    check('authorName').notEmpty().withMessage('User Name is required'),
    check('authorEmail').isEmail().withMessage('Invalid Email Format'),
    check('authorPassword').notEmpty().withMessage('User Password is required'),
    check('authorPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    check('dob').notEmpty().withMessage('Date of Birth can not be Empty'),
    check('dob').isDate().withMessage('Date of Birth must be a valid date'),
];

module.exports = {
    createAuthorValidation,
    updateAuthorValidation
};


