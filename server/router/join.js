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

//test 용
router.get('/', (req, res) => {
  connection.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

router.post('/', (req, res) => {

  var username = req.body.username;
  var password = req.body.password;
  
  console.log(username+password);
  var joinQuery = 'INSERT INTO users (u_id, username, password, optional_password, theme_id, font_id, start_day_id) VALUES(NULL,?,?,NULL,1,1,1)';

  connection.query(joinQuery, users, function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      res.send({
        "code": 200,
        "success": "회원가입 완료"
      });
    }
  });
});

module.exports = router;