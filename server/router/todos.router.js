const express = require('express');
const todoController = require('../controllers/todos.controller')
const router = express.Router();


router
.route('/')
.post(todoController.createTodo)
.get(todoController.readTodo)
.put(todoController.updateTodo)
.delete(todoController.deleteTodo)

router
.route('/checkProgress')
.post(todoController.checkProgress)

router
.route('/progress')
.post(todoController.createProgress)
.get(todoController.readProgress)
.put(todoController.updateProgress)


module.exports = router;