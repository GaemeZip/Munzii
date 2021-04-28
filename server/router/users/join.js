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
  
  const createQuery = 'INSERT INTO users (u_id, username, password, optional_password, theme_id, font_id, start_day_id) VALUES(NULL,?,?,NULL,1,1,1)';
  let params = [username, password];
  connection.query(createQuery, params, function (error, rows, fields) {

    //if 아이디 중복일 경우 처리
    if (error) {
      res.send('양식을 모두 채워주세요');
    } else {
      res.send('회원가입 성공');
    }
  });
});

module.exports = router;