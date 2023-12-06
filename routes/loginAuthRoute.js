const express = require("express");
const {authenticateUserController,authenticateAuthorController} = require("../controllers/authController");
const{authenticateUserValidation,authenticateAuthorValidation} = require ("../validations/authentication-validator");
const router = express.Router();

router.post('/login',authenticateUserValidation,authenticateUserController);

module.exports = router;