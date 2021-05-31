const db = require('../config/db').promise();

const createMemo = async function (date, content, userID) {
    const createQuery = 'INSERT INTO memos VALUES(NULL,?,DEFAULT,?,?)';
    let params = [date, content, userID];

    const [rows] = await db.query(createQuery, params);
    return rows;

}

const getMemo = async function (selectedDate, userID) {
    const readQuery = 'SELECT * FROM memos where date=? AND user_id=?';
    let params = [selectedDate, userID]

    const [rows] = await db.query(readQuery, params);
    
    return rows;

}

const updateMemo = async function (content, date, userID) {
    const updateQuery = 'UPDATE memos SET content=?, created_at=NOW() WHERE date=? AND user_id=?';
    let params = [content, date, userID];

    const [rows] = await db.query(updateQuery, params);
    return rows;

}

const deleteMemo = async function (date, userID) {
    const deleteQuery = 'DELETE FROM memos WHERE date=? AND user_id=?';
    let params = [date, userID];

    const [rows] = await db.query(deleteQuery, params);
    return rows;

}

module.exports = {
    createMemo,
    getMemo,
    updateMemo,
    deleteMemo,
}