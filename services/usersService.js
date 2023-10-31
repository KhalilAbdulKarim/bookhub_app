const { query } = require("../db/database");
const moment = require("moment");

/**
 * 
 * @returns 
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
 * @param {*} id 
 * @returns 
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
 * @param {*} userPassword 
 * @param {*} userEmail 
 * @param {Date} dob 
 * Insert A user into database
 * @returns 
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

        let insertedUser = await query(`SELECT * FROM USERS WHERE userID = ? `, [result?.insertID]);
        return insertedUser;

    } catch (error) {
        throw new Error(error);
    }
}
/**
 * 
 * @param {*} users 
 * @returns 
 */
const updateUser = async (users) => {
    try {
        const { userID, userName, userPassword, userEmail, dob } = users;

        let sql = `UPDATE USERS SET
        userName = ?,
        userPassword = ?,
        userEmail = ?,
        dob = ?
        WHERE userID = ?; 
        `;
        const result = await query(sql, [userID, userName, userPassword, userEmail, moment(dob).format(YYYY - MM - DD)]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

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
    deleteUser
}