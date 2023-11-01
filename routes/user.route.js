const express = require("express");
const { getAllUsersController, getUserByIDController, createUserController, updateUserController } = require('../controllers/userController');
const { getUserByID, deleteUser } = require('../services/usersService');
const { createUserValidation, updateUserValidation } = require('../validations/user-validator');
const router = express.Router();

router.get('/users', getAllUsersController); // read
router.get('/user/:id', getUserByIDController); // read
// router.post('/user',createUserController,createUserValidation); // create,insert
router.post('/user', createUserValidation, createUserController);

router.put('/user', updateUserController, updateUserValidation); // update
router.delete('/user', deleteUser);// delete

module.exports = router;