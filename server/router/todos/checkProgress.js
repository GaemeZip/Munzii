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

    var date = req.body.date;
    var userID = req.body.userID;

    var params = [date, userID];

    const selectQuery = 'SELECT * FROM progresses WHERE date = ? AND user_id=?';
    connection.query(selectQuery, params, async function (error, rows, fields) {
        if (error) {
            res.send('에러 발생');
        } else {
            res.send(rows);
        }
        console.log(rows[0]);
    }
    );
});

module.exports = router;