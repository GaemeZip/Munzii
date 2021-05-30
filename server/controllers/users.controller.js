const mysql = require('mysql');
const dbconfig = require('../router/db');
const connection = mysql.createConnection(dbconfig);

const join = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const createQuery = 'INSERT INTO users (u_id, username, password, theme_id, font_id, start_day_id) VALUES(NULL,?,?,1,1,1)';
    let params = [username, password];
    connection.query(createQuery, params, function (error, rows, fields) {

        console.log(rows);
        //if 아이디 중복일 경우 처리
        if (error) {
            res.send('양식을 모두 채워주세요');
        } else {
            res.send('회원가입 성공');
        }
        console.log(rows);
    });
}

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const selectQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(selectQuery, [username], async function (error, rows, fields) {

        if (error) {
            res.send('에러 발생');
        } else {
            if (rows.length > 0) {
                if (password == rows[0].password) {
                    res.send(rows);
                } else {
                    res.send("아이디와 비밀번호 불일치");
                }
            }
            else {
                res.send('존재하지 않는 아이디');
            }
        }
    }

    );
}

const checkUser = (req, res) => {
    const username = req.body.username;

    const selectQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(selectQuery, [username], async function (error, rows, fields) {
        if (error) {
            res.send('에러 발생');
        } else {
            res.send(rows);
        }
        console.log(rows[0]);
    });

}

module.exports = {
    join,
    login,
    checkUser
}
