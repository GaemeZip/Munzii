const mysql = require('mysql');
const dbconfig = require('../config/db');
const connection = mysql.createConnection(dbconfig);

const createMemo = (req, res) => {
    var date = req.body.date;
    var content = req.body.content;
    var userID = req.body.userID;

    var updateQuery = 'INSERT INTO memos VALUES(NULL,?,DEFAULT,?,?)';
    var params = [date, content, userID];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    });
}

const readMemo = (req, res) => {
    let selectedDate = req.query.date;
    let userID = req.query.userID;
    var readQuery = 'SELECT * FROM memos where date=? AND user_id=?';
    var params = [selectedDate, userID]
    connection.query(readQuery, params, (err, rows, data) => {
        if (err) {
            res.send('error');
        } else {
            res.send(rows);
        }
    });
}

const updateMemo = (req, res) => {
    var date = req.body.date;
    var content = req.body.content;
    var userID = req.body.userID;

    var updateQuery = 'UPDATE memos SET content=?, created_at=NOW() WHERE date=? AND user_id=?';
    var params = [content, date, userID];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    });
}

const deleteMemo = (req, res) => {
    var date = req.query.date;
    var userID = req.query.userID;

    var deleteQuery = 'DELETE FROM memos WHERE date=? AND user_id=?';
    var params = [date, userID];

    connection.query(deleteQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    });
}

module.exports = {
    createMemo,
    readMemo,
    updateMemo,
    deleteMemo
}