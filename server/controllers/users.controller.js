const { userService } = require('../services')

const join = async (req, res,next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username) {
            res.send('username is requried');
        }

        if (!password) {
            res.send('password is requried');
        }

        const user = await userService.join(username, password);

        res.send(user);

    } catch (err) {
        next(err);
    }
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
