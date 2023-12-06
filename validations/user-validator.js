const {check} = require("express-validator");
const moment = require("moment");

const createUserValidation = [
    check('userName').trim().notEmpty().withMessage('User Name is required'),
    check('userEmail').isEmail().withMessage('Invalid Email Format'),
    check('userPassword').notEmpty().withMessage('User Password is required'),
    check('userPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    check('userPassword').isStrongPassword().withMessage('You entered a weak password'),
    check('dob').notEmpty().withMessage('Date of Birth can not be Empty')
    .isDate().withMessage('Date of Birth must be a valid date')
    .custom((value)=>{
        if(moment(value).isAfter(moment())){
            throw new Error('Date of Birth cannot be in the future');
        }
        return true;
    }),
];

const updateUserValidation = [
    check('id').isInt().withMessage('ID must be an integer number'),
    check('id').notEmpty().withMessage('User Id is required'),
    check('userName').trim().notEmpty().withMessage('User Name is required'),
    check('userEmail').isEmail().withMessage('Invalid Email Format'),
    check('userPassword').notEmpty().withMessage('User Password is required'),
    check('userPassword').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    check('dob').notEmpty().withMessage('Date of Birth can not be Empty')
    .isDate().withMessage('Date of Birth must be a valid date')
    .custom((value)=>{
        if(moment(value).isAfter(moment())){
            throw new Error('Date of Birth cannot be in the future');
        }
        return true;
    }),
];

const authenticateUserValidation = [
    check('userEmail').isEmail().withMessage('Invalid Email Format')
    
]

module.exports = {
    createUserValidation,
    updateUserValidation,
};