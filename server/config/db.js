const mysql = require('mysql');
const dbconfig  ={
    host: 'localhost',
    user: 'root',
    password: 'Ant123!!!',
    database: 'munzii'
};

const dbConnection = mysql.createConnection(dbconfig);


module.exports = dbConnection;