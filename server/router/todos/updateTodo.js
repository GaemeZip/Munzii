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

// server 확인용
// router.get('/', (req, res) => {
//   connection.query('SELECT * from Users', (error, rows) => {
//     if (error) throw error;
//     console.log('User info is: ', rows);
//     res.send(rows);
//   });
// });

router.post('/', (req, res) => {
    var id = req.body.id;
    var date = req.body.date;
    var title = req.body.title;
    var time = req.body.time;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var isDone = req.body.isDone;
    var userID = req.body.userID;

    var createQuery = 'UPDATE todos SET date=?, title=?, time=?, start_time=?, end_time=?, is_done=? WHERE id=? AND user_id=?';
    var params = [date, title, time, startTime, endTime, isDone, id, userID];

    connection.query(createQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;

