const db = require('../config/db').promise();

const join = async function (username, password) {
    const createQuery = 'INSERT INTO users (u_id, username, password, theme_id, font_id, start_day_id) VALUES(NULL,?,?,1,1,1)';
    let params = [username, password];

    const [rows] = await db.query(createQuery, params);
    return rows
}

const login = async function (username, password) {
    const selectQuery = 'SELECT * FROM users WHERE username = ?';
    let params = [username, password];

    const [rows] = await db.query(selectQuery, params)

    return rows;
}

const checkUser = async function (username) {
    const selectQuery = 'SELECT * FROM users WHERE username = ?';
    let params = [username];

    const [rows] = await db.query(selectQuery, params)

    return rows;

}


module.exports = {
    join,
    login,
    checkUser

}