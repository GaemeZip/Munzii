var express = require('express');
const mysql = require('mysql');
const { user } = require('../db.js');
var router = express.Router();
const dbconfig = require('../db.js');
const connection = mysql.createConnection(dbconfig);

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', (req, res) => {
    var year = req.query.year;
    var month = req.query.month;
    var userID = req.query.userID;

    var readQuery = 'SELECT * FROM progresses where YEAR(date)=? AND MONTH(date)=? AND user_id=?';
    
    var params = [year, month, userID];
    connection.query(readQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    })
});

module.exports = router;