const mysql = require('mysql');
const dbconfig = require('../config/db');
const connection = mysql.createConnection(dbconfig);

const createTodo = (req, res) => {
    var date = req.body.date;
    var title = req.body.title;
    var time = req.body.time;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var userID = req.body.userID;

    var createQuery = 'INSERT INTO todos VALUES(NULL,?,DEFAULT,?,?,?,?,false,?)';

    var params = [date, title, time, startTime, endTime, userID];

    connection.query(createQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    });
}

const readTodo = (req, res) => {
    let selectedDate = req.query.date;
    var userID = req.query.userID;
    var readQuery = 'SELECT * FROM todos where date=? AND user_id=?';
    var params = [selectedDate, userID];
    connection.query(readQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    })
}

const updateTodo = (req, res) => {
    var id = req.body.id;
    var date = req.body.date;
    var title = req.body.title;
    var time = req.body.time;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var isDone = req.body.isDone;
    var userID = req.body.userID;

    var updateQuery = 'UPDATE todos SET date=?, title=?, time=?, start_time=?, end_time=?, is_done=? WHERE id=? AND user_id=?';
    var params = [date, title, time, startTime, endTime, isDone, id, userID];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
        console.log(rows)
    });
}

const deleteTodo = (req, res) => {
    var id = req.query.id;
    var userID = req.query.userID;

    var deleteQuery = 'DELETE FROM todos WHERE id=? AND user_id=?';
    var params = [id, userID];

    connection.query(deleteQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    });
}

const checkProgress = (req, res) => {
    var date = req.body.date;
    var userID = req.body.userID;

    var params = [date, userID];

    const selectQuery = 'SELECT * FROM progresses WHERE date = ? AND user_id=?';
    connection.query(selectQuery, params, async function (error, rows, fields) {
        if (error) {
            res.send('에러 발생');
        } else {
            res.send(rows);
        }
        console.log(rows[0]);
    });
}

const createProgress = (req, res) => {
    var date = req.body.date;
    var userID = req.body.userID;

    var createQuery = 'INSERT INTO progresses VALUES(0,?,-1,?)';

    var params = [date, userID];

    connection.query(createQuery, params, (error, rows, data) => {


        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    });
}

const readProgress = (req, res) => {
    var year = req.query.year;
    var month = req.query.month;
    var userID = req.query.userID;

    var readQuery = 'SELECT * FROM progresses where YEAR(date)=? AND MONTH(date)=? AND user_id=?';

    var params = [year, month, userID];
    connection.query(readQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    })
}

const updateProgress = (req, res) => {
    var date = req.body.date;
    var progress = req.body.progress;
    var userID = req.body.userID;

    var updateQuery = 'UPDATE progresses SET progress=? WHERE date=? AND user_id=?';
    var params = [progress, date, userID];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
    });
}

module.exports = {
    createTodo,
    readTodo,
    updateTodo,
    deleteTodo,
    checkProgress,
    createProgress,
    readProgress,
    updateProgress,
}