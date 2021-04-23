const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// npm install body-parser 후 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const joinRouter = require('./router/users/join');
const loginRouter = require('./router/users/login');

const memoRouter = require('./router/memos/memo');

const readTodoRouter = require('./router/todos/readTodo');
const createTodoRouter = require('./router/todos/createTodo');
const updateTodoRouter = require('./router/todos/updateTodo');
const deleteTodoRouter = require('./router/todos/deleteTodo');

const updateFontRouter = require('./router/settings/updateFont');
const updateThemeRouter = require('./router/settings/updateTheme');
const updateStartDayRouter = require('./router/settings/updateStartDay');

app.use('/join', joinRouter);
app.use('/login', loginRouter);

app.use('/memo', memoRouter);

app.use('/readTodo', readTodoRouter);
app.use('/createTodo', createTodoRouter);
app.use('/updateTodo', updateTodoRouter);
app.use('/deleteTodo', deleteTodoRouter);

app.use('/updateFont', updateFontRouter);
app.use('/updateTheme', updateThemeRouter);
app.use('/updateStartDay', updateStartDayRouter);

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});