const { todoService } = require('../services');

const createTodo = async (req, res, next) => {
    try {
        const date = req.body.date;
        const title = req.body.title;
        const time = req.body.time;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const userID = req.body.userID;

        const todo = await todoService.createTodo(date, title, time, startTime, endTime, userID);
        res.send(todo);

    } catch (err) {
        next(err);
    }
}

const getTodo = async (req, res, next) => {
    try {
        const selectedDate = req.query.date;
        const userID = req.query.userID;

        const todo = await todoService.updateTodo(selectedDate, userID);
        res.send(todo);

    } catch (err) {
        next(err);
    }
}

const updateTodo = async (req, res, next) => {
    try {
        const id = req.body.id;
        const date = req.body.date;
        const title = req.body.title;
        const time = req.body.time;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const isDone = req.body.isDone;
        const userID = req.body.userID;

        const todo = await todoService.updateTodo(date, title, time, startTime, endTime, isDone, id, userID);
        res.send(todo);

    } catch (err) {
        next(err);
    }

}

const deleteTodo = async (req, res, next) => {
    try {
        const id = req.query.id;
        const userID = req.query.userID;

        const todo = await todoService.deleteTodo(id, userID);
        res.send(todo);

    } catch (err) {
        next(err);
    }
}


module.exports = {
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo,
}