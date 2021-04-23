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

router.get('/', (req, res) => {

    const f_id = req.body.f_id;
    const f_name = req.body.f_name;

    let params = [f_id, f_name];
    
    const readQuery = 'SELECT * FROM fonts';
    
    connection.query(readQuery, params, function(err, rows, data){
      if(err){
        res.send('error');
      }else{
        res.send(rows);
      }
      console.log(rows[0].f_id); // id 가져오기 for 문 돌리기
    })
  });
  
  module.exports = router;