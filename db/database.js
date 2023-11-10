// import modules
const mysql = require('mysql2/promise');
const config = require('./config');

var connection;

const connect = async () => {
    try {
        connection = await mysql.createConnection(config.db);
        console.log(`succesfully connected to ${process.env.DB_NAME}`);

    } catch (error) {
        console.error(`Failed connecting to ${process.env.DB_NAME}`, error);
        process.exit();
    }
}

const query = async (sql,params) => {
    if(!connection){
        await connect();
    }
    try{
        const [results] = await connection.execute(sql,params);
        return results;
    }catch(error){
        console.error(`Query error  ${sql}: ${error.message}`);
        throw new Error(error);
    }
}
module.exports= {query};
