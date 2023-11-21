const { query } = require("../db/database");
const moment = require("moment");

/**
 * Read All Users From Database
 * @returns a promise that is an array of objects Users
 */

const getUsers = async () => {
    try {
        let sql = `SELECT * FROM USERS`;
        const users = await query(sql);
        return users;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} id Id of the user to retreive
 * @returns A Promise that resolves to a user object
 * Read a User from database based on user id 
 */

const getUserByID = async (id) => {
    try {
        let sql = `SELECT * FROM USERS WHERE userID = ? `;
        const user = await query(sql, [id]);
        return user;
    } catch (error) {
        throw new Error(error);

    }
}

/**
 * 
 * @param {String} userName 
 * @param {String} userPassword 
 * @param {string} userEmail 
 * @param {Date} dob 
 * Inserts a new User into database.
 * @returns A Promise that resolves to the newly created User object.
 */

const createUser = async (userName, userPassword, userEmail, dob) => {
    try {
        let sql =
            `INSERT INTO USERS (userName,userPassword,userEmail,dob)
            VALUES (?, ?, ?, ?);`;

        const result = await query(sql, [
            userName,
            userPassword,
            userEmail,
            moment(dob).format("YYYY-MM-DD")
        ]);
        

        let insertedUser = await query(`SELECT * FROM USERS WHERE userID = ? `, [result?.insertId]);
        return insertedUser;

    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {int} userID 
 * @param {String} userName  
 * @param {String} userPassword 
 * @param {String} userEmail 
 * @param {Date} dob 
 * Updates an existing User in the database.
 * @returns A Promise that resolves to the result of the update operation.
 */

const updateUser = async (userID, userName, userPassword, userEmail, dob) => {
    try {
        let sql = `UPDATE USERS SET
        userName = ?,
        userPassword = ?,
        userEmail = ?,
        dob = ?
        WHERE userID = ?; 
        `;
        const result = await query(sql, [userName, userPassword, userEmail, moment(dob).format("YYYY-MM-DD"),userID]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}


/**
 * 
 * @param {int} id The ID of the User to delete passed as parameter
 * @returns A Promise that resolves to the result of the delete operation.
 * Deletes an User from database.
 */

const deleteUser = async (id) => {
    try {
        return await query("DELETE FROM USERS WHERE userID = ?", [id]);
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
}