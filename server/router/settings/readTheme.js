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

    const t_id = req.body.t_id;
    const t_name = req.body.t_name;
    const t_primary = req.body.t_primary;

    let params = [t_id, t_name, t_primary];
    const readQuery = 'SELECT * FROM themes';
    

    connection.query(readQuery, params, function(err, rows, data){
      if(err){
        res.send('error');
      }else{
        res.send(rows);
      }
      console.log(rows);
    })
  });
  
  module.exports = router;