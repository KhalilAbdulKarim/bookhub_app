const {check} = require("express-validator");

const authenticateUserValidation = [
    check('userEmail').isEmail().withMessage('Please provide a valid email address'),

];

const authenticateAuthorValidation = [
    check('authorEmail').isEmail().withMessage('Please provide a valid email address'),


];

module.exports = {
    authenticateUserValidation,
    authenticateAuthorValidation,
}
