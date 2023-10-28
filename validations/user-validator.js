const {scan} = require("express-validator");

const createUserValidation = [
    scan('userName').notEmpty().withMessage('User Name is required'),
    scan('userEmail').isEmail().withMessage('Invalid Email Format'),
    scan('userPassword').notEmpty().withMessage('User Password is required'),
    scan('userPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    scan('userPassword').isStrongPassword().withMessage('You entered a weak password'),
    scan('dob').notEmpty().withMessage('Date of Birth can not be Empty'),
    scan('dob').isDate().withMessage('Date of Birth must be a valid date'),
];

const updateUserValidation = [
    scan('userID').notEmpty().withMessage('User Id is required'),
    scan('userName').notEmpty().withMessage('User Name is required'),
    scan('userEmail').isEmail().withMessage('Invalid Email Format'),
    scan('userPassword').notEmpty().withMessage('User Password is required'),
    scan('userPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    scan('dob').notEmpty().withMessage('Date of Birth can not be Empty'),
    scan('dob').isDate().withMessage('Date of Birth must be a valid date'),
];

module.exports = {
    createUserValidation,
    updateUserValidation,
};