const express = require("express");
const {authenticateUserController,authenticateAuthorController} = require("../controllers/authController");

const router = express.Router();

router.post('/login',authenticateUserController);
// router.post('/account',authenticateUserController);



module.exports = router;