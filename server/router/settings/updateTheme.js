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
    const themeID = req.body.themeID;
    const userID = req.body.userID;

    const updateFoupdateQueryntQuery = 'UPDATE users SET t_id=? WHERE user_id=?';
    let params = [themeID, userID];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            if(rows.length>0){
                if (themeID == 1){
                    res.send("기본");
                }
                else if (themeID == 2){
                    res.send("분홍");
                }
                else if (themeID == 3){
                    res.send("파랑");
                }
                else if (themeID == 4){
                    res.send("초록");
                }
            }
        }
    });
});

module.exports = router;

