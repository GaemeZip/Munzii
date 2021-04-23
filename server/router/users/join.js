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

// server 확인용
// router.get('/', (req, res) => {
//   connection.query('SELECT * from Users', (error, rows) => {
//     if (error) throw error;
//     console.log('User info is: ', rows);
//     res.send(rows);
//   });
// });

router.post('/', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  
  console.log(username+password);
  const createQuery = 'INSERT INTO users (u_id, username, password, optional_password, theme_id, font_id, start_day_id) VALUES(NULL,?,?,NULL,1,1,1)';
  let params = [username, password];
  connection.query(createQuery, params, function (error, rows, fields) {

    //if 아이디 중복일 경우 처리
    //if else 비밀번호 불일치일 경우 처리
    if (error) {
      res.send('이미 존재하는 아이디 입니다');
    } else {
      res.send('회원가입 성공');
    }
  });
});

module.exports = router;