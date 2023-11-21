// import modules
const mysql = require('mysql2/promise');
const config = require('./config');

var connection;

/**
 * A function that creates a connection to the database
 */

const connect = async () => {
    try {
        connection = await mysql.createConnection(config.db);
        console.log(`succesfully connected to ${process.env.DB_NAME}`);

    } catch (error) {
        console.error(`Failed connecting to ${process.env.DB_NAME}`, error);
        process.exit();
    }
}

/**
 * 
 * @param {string} sql 
 * @param {Array} params 
 * @returns a promise :
 * - on successful execution,the promise resolves to the results of the query for CRUD operations.
 * - If an error occurs during query execution, the promise is rejected, and an error is thrown with a message.
 */

const query = async (sql, params) => {
    if (!connection) {
        await connect();
    }
    try {
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        console.error(`Query error  ${sql}: ${error.message}`);
        throw new Error(error);
    }
}
module.exports = { query };
