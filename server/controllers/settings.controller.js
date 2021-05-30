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



module.exports ={
    readFont,
    currentFont,
    readTheme,
    currentTheme,
    readStartDay,
    currentStartDay
}