var express = require('express');
const mysql = require('mysql');
var router = express.Router();
const dbconfig = require('../db.js');
const connection = mysql.createConnection(dbconfig);

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/', (req, res) => {
    var fontID = req.body.fontID;
    var userID = req.body.userID;

    var updateFontQuery = 'UPDATE users SET f_id=? WHERE user_id=?';
    var params = [fontID, userID];

    connection.query(updateFontQuery, params, (error, results, data) => {
        if (error) {
            res.send('error');
        } else {
            if(results.length>0){
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

