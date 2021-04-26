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
    var u_id = req.body.u_id;
    //var theme_id = req.body.theme_id;
    //임의로 1이라고 넣어둠!
    var selectQuery = 'SELECT theme_id FROM users WHERE u_id=1';
    var params = [u_id];

    connection.query(selectQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        }
        else {
            //id값 보내주기
            res.send(rows);
        }
        console.log(rows);
    });
});

module.exports = router;
