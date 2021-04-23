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
    const fontID = req.body.fontID;
    const userID = req.body.userID;

    const updateQuery = 'UPDATE users SET f_id=? WHERE user_id=?';
    const params = [fontID, userID];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            if(rows.length>0){
                if (fontID == 1){
                    res.send("기본");
                }
                else if (fontID == 2){
                    res.send("맑은 고딕");
                }
            }
        }
    });
});

module.exports = router;

