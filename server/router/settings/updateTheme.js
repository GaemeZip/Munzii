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
    const t_id = req.body.t_id;
    const u_id = req.body.u_id;

    const updateQuery = 'UPDATE users SET t_id=? WHERE u_id=?';
    let params = [t_id, u_id];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            if(rows.length>0){
                if (t_id == 1){
                    res.send("기본");
                }
                else if (t_id == 2){
                    res.send("분홍");
                }
                else if (t_id == 3){
                    res.send("파랑");
                }
                else if (t_id == 4){
                    res.send("초록");
                }
            }
        }
    });
});

module.exports = router;

