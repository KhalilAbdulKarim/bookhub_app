const express = require("express");
const {authenticateUserController,authenticateAuthorController} = require("../controllers/authController");

const router = express.Router();

router.post('/login',authenticateUserController);



module.exports = router;