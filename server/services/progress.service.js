const db = require('../config/db').promise();

const createProgress = async function (date, userID) {
    const createQuery = 'INSERT INTO progresses VALUES(0,?,-1,?)';
    let params = [date, userID];

    const [rows] = await db.query(createQuery, params);
    return rows;

}

const getProgress = async function (year, month, userID) {
    const readQuery = 'SELECT * FROM progresses where YEAR(date)=? AND MONTH(date)=? AND user_id=?';
    let params = [year, month, userID];

    const [rows] = await db.query(readQuery, params);
    
    return rows;

}

const updateProgress = async function (progress, date, userID) {
    const updateQuery = 'UPDATE progresses SET progress=? WHERE date=? AND user_id=?';
    let params = [progress, date, userID];

    const [rows] = await db.query(updateQuery, params);
    return rows;

}

const getProgressByUserId = async function (date, userID) {
    const selectQuery = 'SELECT * FROM progresses WHERE date = ? AND user_id=?';
    let params = [date, userID];

    const [rows] = await db.query(selectQuery, params);
    return rows;

}

module.exports = {
    createProgress,
    getProgress,
    updateProgress,
    getProgressByUserId
}