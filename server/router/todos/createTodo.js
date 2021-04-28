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

  var date = req.body.date;
  var title = req.body.title;
  var time = req.body.time;
  var startTime = req.body.startTime;
  var endTime = req.body.endTime;
  var userID = req.body.userID;

  var createQuery = 'INSERT INTO todos VALUES(NULL,?,DEFAULT,?,?,?,?,false,?)';

  var params = [date, title, time, startTime, endTime, userID];

  connection.query(createQuery, params, (error, rows, data) => {
    if (error) {
      res.send('error');
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;

