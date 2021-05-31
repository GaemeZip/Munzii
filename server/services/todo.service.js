const db = require('../config/db').promise();

const createTodo = async function (date, title, time, startTime, endTime, userID) {
    const createQuery = 'INSERT INTO todos VALUES(NULL,?,DEFAULT,?,?,?,?,false,?)';
    let params = [date, title, time, startTime, endTime, userID];

    const [rows] = await db.query(createQuery, params);
    return rows;

}

const getTodo = async function (selectedDate, userID) {
    const readQuery = 'SELECT * FROM todos where date=? AND user_id=?';
    let params = [selectedDate, userID];

    const [rows] = await db.query(readQuery, params);

    return rows;

}

const updateTodo = async function (date, title, time, startTime, endTime, isDone, id, userID) {
    const updateQuery = 'UPDATE todos SET date=?, title=?, time=?, start_time=?, end_time=?, is_done=? WHERE id=? AND user_id=?';
    const params = [date, title, time, startTime, endTime, isDone, id, userID];

    const [rows] = await db.query(updateQuery, params);
    return rows;

}

const deleteTodo = async function (date, userID) {
    const deleteQuery = 'DELETE FROM todos WHERE id=? AND user_id=?';
    const params = [id, userID];

    const [rows] = await db.query(deleteQuery, params);
    return rows;

}

module.exports = {
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
}