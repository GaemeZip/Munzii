const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// npm install body-parser 후 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.options('*', cors());

//const joinRouter = require('./router/users/join');
//onst loginRouter = require('./router/users/login');
//const checkUserRouter = require('./router/users/checkUser');

const userRouter = require('./router/user.router');
const memoRotuer = require('./router/memo.router');

// /users/join
// /users/login
// /users/checkUser
app.use('/user',userRouter);

// const readMemoRouter = require('./router/memos/readMemo');
// const createMemoRouter = require('./router/memos/createMemo');
// const updateMemoRouter = require('./router/memos/updateMemo');
// const deleteMemoRouter = require('./router/memos/deleteMemo');
app.use('/memo',memoRouter);

const readTodoRouter = require('./router/todos/readTodo');
const createTodoRouter = require('./router/todos/createTodo');
const updateTodoRouter = require('./router/todos/updateTodo');
const deleteTodoRouter = require('./router/todos/deleteTodo');

const readProgressRouter = require('./router/todos/readProgress');
const createProgressRouter = require('./router/todos/createProgress');
const updateProgressRouter = require('./router/todos/updateProgress');
const checkProgressRouter = require('./router/todos/checkProgress');

const updateFontRouter = require('./router/settings/updateFont');
const readFontRouter = require('./router/settings/readFont');
const currentFontRouter = require('./router/settings/currentFont');

const updateThemeRouter = require('./router/settings/updateTheme');
const readThemeRouter = require('./router/settings/readTheme');
const currentThemeRouter = require('./router/settings/currentTheme');

const updateStartDayRouter = require('./router/settings/updateStartDay');
const readStartDayRouter = require('./router/settings/readStartDay');
const currentStartDayRouter = require('./router/settings/currentStartDay');

app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/checkUser', checkUserRouter);

app.use('/readMemo', readMemoRouter);
app.use('/createMemo', createMemoRouter);
app.use('/updateMemo', updateMemoRouter);
app.use('/deleteMemo', deleteMemoRouter);

app.use('/readTodo', readTodoRouter);
app.use('/createTodo', createTodoRouter);
app.use('/updateTodo', updateTodoRouter);
app.use('/deleteTodo', deleteTodoRouter);

app.use('/readProgress', readProgressRouter);
app.use('/createProgress', createProgressRouter);
app.use('/updateProgress', updateProgressRouter);
app.use('/checkProgress', checkProgressRouter);

app.use('/updateFont', updateFontRouter);
app.use('/readFont', readFontRouter);
app.use('/currentFont', currentFontRouter);

app.use('/updateTheme', updateThemeRouter);
app.use('/readTheme', readThemeRouter);
app.use('/currentTheme', currentThemeRouter);

app.use('/updateStartDay', updateStartDayRouter);
app.use('/readStartDay', readStartDayRouter);
app.use('/currentStartDay', currentStartDayRouter);


app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});