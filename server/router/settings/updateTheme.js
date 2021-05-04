const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbconfig = require('../db.js');
const connection = mysql.createConnection(dbconfig);

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/', (req, res) => {
    const theme_id = req.body.theme_id;
    const u_id = req.body.userID;

    const updateQuery = 'UPDATE users SET theme_id=? WHERE u_id=?';
    let params = [theme_id, u_id];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
        console.log(rows);
    });
});

module.exports = router;

