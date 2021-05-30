const join = (req, res) => {
    res.send('join');
}

const login = (req,res) => {
    res.send('login')
}

const checkUser = (req,res) => {
    res.send('check')
}

module.exports = {
    join,
    login,
    checkUser
}
