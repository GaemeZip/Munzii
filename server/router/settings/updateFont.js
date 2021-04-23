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
    const f_id = req.body.f_id;
    const u_id = req.body.u_id;

    let params = [f_id, u_id];
    
    const updateQuery = 'UPDATE users SET f_id=? WHERE user_id=?';
    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            if(rows.length>0){
                if (f_id == 1){
                    res.send("기본");
                }
                else if (f_id == 2){
                    res.send("맑은 고딕");
                }
            }
        }
    });
});

module.exports = router;

