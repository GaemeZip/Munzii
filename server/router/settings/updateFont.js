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
    var font_id = req.body.font_id;
    var u_id = req.body.userID;

    var updateQuery = 'UPDATE users SET font_id=? WHERE u_id=?';
    var params = [font_id, u_id];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        }
        //기존 값과 같을 경우는 그냥 두기 
        else {
            res.send(rows);
        }
        console.log(rows);
    });
});

module.exports = router;

