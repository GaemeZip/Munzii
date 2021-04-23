var express = require('express');
const mysql = require('mysql');
var router = express.Router();
const dbconfig = require('../db.js');
const connection = mysql.createConnection(dbconfig);
var path = require('path');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res) => {
  let selectedDate = req.query.date;
  let userID = req.query.userID;
  var readQuery = 'SELECT * FROM memos where date=? AND user_id=?';
  var params = [selectedDate, userID]
  connection.query(readQuery, params, (err, rows, data) => {
    if (err) {
      res.send('error');
    } else {
      res.send(rows);
    }
  })
});

module.exports = router;