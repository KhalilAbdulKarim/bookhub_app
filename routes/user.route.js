const express = require ("express");
const { getAllUsersController, createUserController, updateUserController} = require('../controllers/userController'); 
const { getUserByID, deleteUser } = require('../services/userService');
const router = express.Router();

router('/users',getAllUsersController); // read
router('/user',getUserByID); // read
router.post('/user',createUserController); // create,insert
router.put('/user',updateUserController); // update
router.delete('/user',deleteUser);// delete