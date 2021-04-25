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
  console.log("11111111");
  let userID = req.query.userID;
  var readQuery = 'SELECT optional_password FROM users where u_id=?';
  var params = [userID]
  connection.query(readQuery, params, (err, rows, data) => {
    console.log("dkdkdkdkdkdkddkdkdkdkdk");
    if (err) {
      res.send('error');
    } else {
      res.send(rows);
    }
  })
});

module.exports = router;