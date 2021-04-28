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

  const username = req.body.username;
  const password = req.body.password;

  const selectQuery = 'SELECT * FROM users WHERE username = ?';
  connection.query(selectQuery, [username], async function (error, rows, fields) {

    if (error) {
      res.send('에러 발생');
    } else {
      if (rows.length > 0) {
        if (password == rows[0].password) {
          res.send(rows);
        } else {
          res.send("아이디와 비밀번호 불일치");
        }
      }
      else {
        res.send('존재하지 않는 아이디');
      }
    }
  }

  );
});

module.exports = router;