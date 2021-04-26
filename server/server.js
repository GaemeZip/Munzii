const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// npm install body-parser 후 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const joinRouter = require('./router/users/join');
const loginRouter = require('./router/users/login');

const readMemoRouter = require('./router/memos/readMemo');
const createMemoRouter = require('./router/memos/createMemo.js');
const updateMemoRouter = require('./router/memos/updateMemo');
const deleteMemoRouter = require('./router/memos/deleteMemo');
const readTodoRouter = require('./router/todos/readTodo');
const createTodoRouter = require('./router/todos/createTodo');
const updateTodoRouter = require('./router/todos/updateTodo');
const deleteTodoRouter = require('./router/todos/deleteTodo');

const updateFontRouter = require('./router/settings/updateFont');
const readFontRouter = require('./router/settings/readFont');
const currentFontRouter = require('./router/settings/currentFont');

const updateThemeRouter = require('./router/settings/updateTheme');
const readThemeRouter = require('./router/settings/readTheme');

const updateStartDayRouter = require('./router/settings/updateStartDay');
const readStartDayRouter = require('./router/settings/readStartDay');
const currentStartDayRouter = require('./router/settings/currentStartDay');

app.use('/join', joinRouter);
app.use('/login', loginRouter);

app.use('/readMemo', readMemoRouter);
app.use('/createMemo', createMemoRouter);
app.use('/updateMemo', updateMemoRouter);
app.use('/deleteMemo', deleteMemoRouter);

app.use('/readTodo', readTodoRouter);
app.use('/createTodo', createTodoRouter);
app.use('/updateTodo', updateTodoRouter);
app.use('/deleteTodo', deleteTodoRouter);

app.use('/updateFont', updateFontRouter);
app.use('/readFont', readFontRouter);
app.use('/currentFont', currentFontRouter);

app.use('/updateTheme', updateThemeRouter);
app.use('/readTheme', readThemeRouter);

app.use('/updateStartDay', updateStartDayRouter);
app.use('/readStartDay', readStartDayRouter);
app.use('currentStartDay', currentStartDayRouter);


app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});