const mysql = require('mysql');
const dbconfig = require('../router/db');
const connection = mysql.createConnection(dbconfig);
const readFont = (req, res) => {

    const readQuery = 'SELECT * FROM fonts';
    connection.query(readQuery, function (err, rows, data) {
        if (err) {
            res.send('error');
        } else {
            res.send(rows);
        }

    })
}

module.exports ={
    readFont
}