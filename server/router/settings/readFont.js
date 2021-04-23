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

    const readQuery = 'SELECT * FROM fonts';    
    connection.query(readQuery, function(err, rows, data){
      if(err){
        res.send('error');
      }else{
        res.send(rows);
      }
    
    })
  });
  
  module.exports = router;