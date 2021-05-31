const mysql = require('mysql2');
const dbconfig  ={
    host: 'localhost',
    user: 'root',
    password: 'Ant123!!!',
    database: 'munzii'
};

const pool = mysql.createPool(dbconfig);


module.exports = pool;