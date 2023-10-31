const {check} = require("express-validator");

const createUserValidation = [
    check('userName').notEmpty().withMessage('User Name is required'),
    check('userEmail').isEmail().withMessage('Invalid Email Format'),
    check('userPassword').notEmpty().withMessage('User Password is required'),
    check('userPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    check('userPassword').isStrongPassword().withMessage('You entered a weak password'),
    check('dob').notEmpty().withMessage('Date of Birth can not be Empty'),
    check('dob').isDate().withMessage('Date of Birth must be a valid date'),
];

const updateUserValidation = [
    check('userID').notEmpty().withMessage('User Id is required'),
    check('userName').notEmpty().withMessage('User Name is required'),
    check('userEmail').isEmail().withMessage('Invalid Email Format'),
    check('userPassword').notEmpty().withMessage('User Password is required'),
    check('userPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    check('dob').notEmpty().withMessage('Date of Birth can not be Empty'),
    check('dob').isDate().withMessage('Date of Birth must be a valid date'),
];

module.exports = {
    createUserValidation,
    updateUserValidation,
};