const db = require('../config/db').promise();

const readFont = async function () {
    const readQuery = 'SELECT * FROM fonts';

    const [rows] = await db.query(readQuery);
    
    return rows;
}

const currentFont = async function (u_id) {
    const readQuery = 'SELECT font_id FROM users WHERE u_id=?';
    let params = [u_id];

    const [rows] = await db.query(readQuery, params);
    console.log(rows);
    return rows;
}

const updateFont = async function(font_id, u_id){
    const updateQuery = 'UPDATE users SET font_id=? WHERE u_id=?';
    let params = [font_id, u_id];

    const [rows] = await db.query(updateQuery, params);
    return rows;
}

const readTheme = async function () {
    const readQuery = 'SELECT * FROM themes';

    const [rows] = await db.query(readQuery);
    
    return rows;
}

const currentTheme = async function (u_id) {
    const readQuery = 'SELECT theme_id FROM users WHERE u_id=?';
    let params = [u_id];

    const [rows] = await db.query(readQuery, params);

    return rows;
}
const updateTheme = async function(theme_id, u_id){
    const updateQuery = 'UPDATE users SET theme_id=? WHERE u_id=?';
    let params = [theme_id, u_id];

    const [rows] = await db.query(updateQuery, params);
    return rows;
}
const readStartDay = async function () {
    const readQuery = 'SELECT * FROM start_days';

    const [rows] = await db.query(readQuery);
    
    return rows;
}
const currentStartDay = async function (u_id) {
    var readQuery = 'SELECT start_day_id FROM users WHERE u_id=?';
    let params = [u_id];

    const [rows] = await db.query(readQuery, params);

    return rows;
}
const updateStartDay = async function(start_day_id, u_id){
    const updateQuery = 'UPDATE users SET start_day_id=? WHERE u_id=?';
    let params = [start_day_id, u_id];

    const [rows] = await db.query(updateQuery, params);
    return rows;
}

module.exports = {
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