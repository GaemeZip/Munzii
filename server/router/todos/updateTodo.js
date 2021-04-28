var express = require('express');
const mysql = require('mysql');
var router = express.Router();
const dbconfig = require('../db.js');
const connection = mysql.createConnection(dbconfig);

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/', (req, res) => {
    var id = req.body.id;
    var date = req.body.date;
    var title = req.body.title;
    var time = req.body.time;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var isDone = req.body.isDone;
    var userID = req.body.userID;

    var updateQuery = 'UPDATE todos SET date=?, title=?, time=?, start_time=?, end_time=?, is_done=? WHERE id=? AND user_id=?';
    var params = [date, title, time, startTime, endTime, isDone, id, userID];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
        console.log(rows)
    });
});

module.exports = router;

