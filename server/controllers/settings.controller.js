const mysql = require('mysql');
const dbconfig = require('../router/db');
const connection = mysql.createConnection(dbconfig);

const readFont = (req, res) => {
    const readQuery = 'SELECT * FROM fonts';
    connection.query(readQuery, function (err, rows, data) {
        if (err) {
            res.send('error');
        } else {
            res.send(rows);
        }
    })
}
const currentFont = (req, res) => {
    var u_id = req.query.userID;

    var selectQuery = 'SELECT font_id FROM users WHERE u_id=?';
    var params = [u_id];

    connection.query(selectQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        }
        else {
            res.send(rows);
        }
        console.log(rows);
    });
}
const updateFont = (req, res) => {
    var font_id = req.body.font_id;
    var u_id = req.body.userID;

    var updateQuery = 'UPDATE users SET font_id=? WHERE u_id=?';
    var params = [font_id, u_id];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        }
        else {
            res.send(rows);
        }
    });
}
const readTheme = (req, res) => {
    const t_id = req.body.t_id;
    const t_name = req.body.t_name;
    const t_primary = req.body.t_primary;

    let params = [t_id, t_name, t_primary];
    const readQuery = 'SELECT * FROM themes';
    
    connection.query(readQuery, params, function(err, rows, data){
      if(err){
        res.send('error');
      }else{
        res.send(rows);
      }
      console.log(rows);
    })
}

const currentTheme = (req, res) => {
    var u_id = req.query.userID;

    var selectQuery = 'SELECT theme_id FROM users WHERE u_id=?';
    var params = [u_id];

    connection.query(selectQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        }
        else {
            res.send(rows);
        }
        console.log(rows);
    });
}
const updateTheme = (req, res) => {
    const theme_id = req.body.theme_id;
    const u_id = req.body.userID;

    const updateQuery = 'UPDATE users SET theme_id=? WHERE u_id=?';
    let params = [theme_id, u_id];

    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
        console.log(rows);
    });
}
const readStartDay = (req, res) => {
    const s_id = req.body.s_id;
    const s_name = req.body.s_name;

    let params = [s_id, s_name];

    const readQuery = 'SELECT * FROM start_days';
    

    connection.query(readQuery, params, function(err, rows, data){
      if(err){
        res.send('error');
      }else{
        res.send(rows);
      }
    })
}
const currentStartDay = (req, res) => {
    var u_id = req.query.userID;

    var selectQuery = 'SELECT start_day_id FROM users WHERE u_id=?';
    var params = [u_id];

    connection.query(selectQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        }
        else {
            res.send(rows);
        }
        console.log(rows);
    });
}
const updateStartDay = (req, res) => {
    const start_day_id = req.body.start_day_id;
    const u_id = req.body.userID;

    let params = [start_day_id, u_id];

    const updateQuery = 'UPDATE users SET start_day_id=? WHERE u_id=?';
    connection.query(updateQuery, params, (error, rows, data) => {
        if (error) {
            res.send('error');
        } else {
            res.send(rows);
        }
        console.log(rows);
    });
}



module.exports ={
    readFont,
    currentFont,
    updateFont,
    readTheme,
    currentTheme,
    updateTheme,
    readStartDay,
    currentStartDay,
    updateStartDay
}