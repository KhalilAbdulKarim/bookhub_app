const express = require("express");
const { getAllUsersController, getUserByIDController, createUserController, updateUserController,deleteUserController} = require('../controllers/userController');
const { getUserByID, deleteUser } = require('../services/usersService');
const { createUserValidation, updateUserValidation } = require('../validations/user-validator');
const router = express.Router();


router.get('/users', getAllUsersController); // read
router.get('/user/:id', getUserByIDController); // read
router.post('/user', createUserValidation, createUserController); // create 
router.put('/user/:id',updateUserValidation,updateUserController,); // update
router.delete('/user/:id',deleteUserController,deleteUser);// delete

module.exports = router;