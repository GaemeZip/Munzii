const { authService } = require('../services')

const join = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username) {
            res.send('username is requried');
        }

        if (!password) {
            res.send('password is requried');
        }

        const user = await authService.join(username, password);
        res.send(user);

    } catch (err) {
        console.log(err);
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username) {
            res.send('username is requried');
        }

        if (!password) {
            res.send('password is requried');
        }

        const user = await authService.login(username, password);
        console.log(user);
        if (user.length > 0) {
            if (password == user[0].password) {
                res.send(user);
            } else {
                res.send("아이디와 비밀번호 불일치");
            }
        }
        else {
            res.send('존재하지 않는 아이디');
        }
        // res.send(user);

    } catch (err) {
        console.log(err);
        next(err);
    }
}

const checkUser = async (req, res, next) => {
    try {
        const username = req.body.username;

        if (!username) {
            res.send('username is requried');
        }

        const user = await authService.checkUser(username);
        res.send(user);

    } catch (err) {
        next(err);
    }

}

module.exports = {
    join,
    login,
    checkUser
}
