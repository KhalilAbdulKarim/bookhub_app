const { getUsers, getUserByID, createUser, updateUser, deleteUser,authenticateUser} = require("../services/usersService");
const { validationResult } = require("express-validator");


/**
 * Purpose: Retrieves all users from the database
 * @param {object} req 
 * @param {object} res
 * HTTP Method: GET
 * 200 OK: On success, returns an array of author objects.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const getAllUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Retrieves a user from the database based on URL param id 
 * HTTP Method: GET
 * @param {object} req 
 * @param {object} res 
 * 200 OK: On success, returns an user object.
 * 500 Internal Server Error: On failure, returns an error message.
 */


const getUserByIDController = async (req, res) => {
    try {
        const userID = req.params.id;
        const user = await getUserByID(userID);
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

/**
 * Purpose: Creates a new user in the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: POST
 * 201 Created: On successful creation, returns the created author object.
 * 400 Bad Request: If validation fails or required data is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 */

const createUserController = async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('registerPage', { errors: errors.array() });
    }
    

    const { userName, userPassword, userEmail, dob } = req.body;

    try {
        const response = await createUser(userName, userPassword, userEmail, dob)
        if(response){
            res.redirect('/login');
        } else {
            res.render('registerPage',{errors: errors?.message});
        }
        
    } catch (errors) {
        res.render('registerPage',{errors: errors?.message });

    }

}

/**
 * Purpose: Updates an existing user's information.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: PUT
 * 201 Created: On successful update, returns the updated author object.
 * 400 Bad Request: If the ID is missing, or validation fails.
 * 500 Internal Server Error: On failure, returns an error message
 */

const updateUserController = async (req, res) => {
    const userID = req.params.id;
    const { userName, userEmail, userPassword, dob } = req.body;
    if (!userID) {
        return res.status(400).json({ message: "missing data" })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await updateUser(userID, userName, userPassword, userEmail, dob);
        // res.status(201).json({ response });
        res.render("homePage",response);
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

/**
 * Purpose: Deletes a user from the database.
 * @param {object} req 
 * @param {object} res 
 * HTTP Method: DELETE
 * 200 OK: On successful deletion, returns a success message.
 * 400 Bad Request: If the ID is missing.
 * 500 Internal Server Error: On failure, returns an error message.
 * 
 */

const deleteUserController = async (req, res) => {
    const  userID  = req.params.id;
    console.log(userID);

    if (!userID) {
        return res.status(400).json({ message: "missing user id" });
    }
    try {
        const result = await deleteUser(userID);
        //res.status(200).json({ result });
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}



const addUserForm = (req,res)=>{
    res.render("addUser");
}

const editUserForm= async(req,res)=>{
    let userId = req.params.id;
    const sql = 'select * from users where userID = ?';
    const user = await query(sql,userId);
    res.render("editUser",user[0]);
}


module.exports = {
    getAllUsersController,
    getUserByIDController,
    createUserController,
    updateUserController,
    deleteUserController,

}