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

    const s_id = req.body.s_id;
    const s_name = req.body.s_name;

    let params = [s_id, s_name];

    const readQuery = 'SELECT * FROM start_days';
    

    connection.query(readQuery, params, function(err, rows, data){
      if(err){
        res.send('error');
      }else{
        res.send(rows);
      }
    })
  });
  
  module.exports = router;