const { getUsers, getUserByID, createUser, updateUser, deleteUser } = require("../services/usersService");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const authenticateController = async(req, res)=>{
    const {userName, userPassword}  = req.body;
    if(!userName){
        return res.status(401).json({message: "missing data"});
    }

    const result = await authenticate(userName, userPassword);
    if(!result){
        return res.status(401).json({message: "Wrong User name or Password"});
    }
    
    const token = jwt.sign({userID: result?.userID}, process.env.SECRET_KEY);
    res.status(200).json({message: "Authenticated", user: result, token});
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}
const getUserByIDController = async (req, res) => {
    try {
        const userID = req.params.id;
        const user = await getUserByID(userID);
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}


const createUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userName, userPassword, userEmail, dob } = req.body;

    try {
        const response = await createUser(userName, userPassword, userEmail, dob)
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }

}

const updateUserController = async (req, res) => {
    const { userID, userName, userEmail, userPassword, dob } = req.body;
    if (!userID) {
        return res.status(400).json({ message: "missing data" })
    }

    try {
        const response = await updateUser(userID, userName, userEmail, userPassword, dob);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteUserController = async (req, res) => {
    const { userID } = req.body;

    if (!userID) {
        return res.status(400).json({ message: "missing user id" });
    }
    try {
        const result = await deleteUser(userID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}



module.exports = {
    getAllUsersController,
    authenticateController,
    getUserByIDController,
    createUserController,
    updateUserController,
    deleteUserController,
}