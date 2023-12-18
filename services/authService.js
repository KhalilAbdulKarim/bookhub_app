const { query } = require("../db/database");




/**
 * Authenticate a user.
 * @param {String} userEmail - The Email of the user.
 * @param {String} userPassword - The password of the user.
 * @returns A Promise that resolves to the authenticated user object or null if authentication fails.
 */
const authenticateUser = async (userEmail, userPassword) => {
    try {
        let sql = `SELECT * FROM USERS WHERE userEmail = ? AND userPassword = ?`;
        const users = await query(sql, [userEmail, userPassword]);

        if (users.length === 0) {
            return null;
        }
        return users[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getUserDetails = async (userID) => {
    try {
        const result = await query('SELECT userName, userEmail, dob FROM USERS WHERE userID = ? ;', [userID]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
};




/**
 * Authenticate an author
 * @param {String} authorEmail - The Email of the author.
 * @param {String} authorPassword - The password of the author.
 * @returns A Promise that resolves to the authenticated author object or null if authentication fails.
 */
const authenticateAuthor = async (authorEmail, authorPassword) => {
    try {
        let sql = `SELECT * FROM AUTHORS WHERE authorEmail = ? AND authorPassword = ?`;
        const authors = await query(sql, [authorEmail, authorPassword]);

        if (authors.length === 0) {
            // No user found with the provided credentials
            return null;
        }

        return authors[0];
    } catch (error) {
        throw new Error(error);
    }
}

module.exports= {
    authenticateUser,
    authenticateAuthor,
    getUserDetails,
}

