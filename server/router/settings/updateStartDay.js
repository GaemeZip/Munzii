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
    var dayID = req.body.dayID;
    var userID = req.body.userID;

    var updateFontQuery = 'UPDATE users SET s_id=? WHERE user_id=?';
    var params = [dayID, userID];

    connection.query(updateFontQuery, params, (error, results, data) => {
        if (error) {
            res.send('error');
        } else {
            if(results.length>0){
                if (dayID == 1){
                    res.send("월");
                }
                else if (dayID == 2){
                    res.send("화");
                }
                else if (dayID == 3){
                    res.send("수");
                }
                else if (dayID == 4){
                    res.send("목");
                }
                else if (dayID == 5){
                    res.send("금");
                }
                else if (dayID == 6){
                    res.send("토");
                }
                else if (dayID == 7){
                    res.send("일");
                }
            }
        }
    });
});

module.exports = router;

