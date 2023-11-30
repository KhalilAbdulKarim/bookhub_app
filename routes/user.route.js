const express = require("express");
const { getAllUsersController, getUserByIDController, createUserController, updateUserController,deleteUserController, addUserForm} = require('../controllers/userController');
const { getUserByID } = require('../services/usersService');
const { createUserValidation, updateUserValidation } = require('../validations/user-validator');
const router = express.Router();


router.get('/users', getAllUsersController); // read
router.get('/user/:id', getUserByIDController); // read
router.post('/user', createUserValidation, createUserController); // create 
router.put('/user/:id',updateUserValidation,updateUserController,); // update
router.get('/deleteUser/:id',deleteUserController);// delete

// router.get('/addUserForm',createUserController); 
router.get('/editUserForm');





module.exports = router;