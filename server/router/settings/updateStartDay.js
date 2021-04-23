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

    const s_id = req.body.s_id;
    const u_id = req.body.u_id;

    let params = [s_id, u_id];

    const updateQuery = 'UPDATE users SET s_id=? WHERE user_id=?';
    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            if(rows.length>0){
                if (s_id == 1){
                    res.send("월");
                }
                else if (s_id == 2){
                    res.send("화");
                }
                else if (s_id == 3){
                    res.send("수");
                }
                else if (s_id == 4){
                    res.send("목");
                }
                else if (s_id == 5){
                    res.send("금");
                }
                else if (s_id == 6){
                    res.send("토");
                }
                else if (s_id == 7){
                    res.send("일");
                }
            }
        }
    });
});

module.exports = router;

