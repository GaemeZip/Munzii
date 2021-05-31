const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


// npm install body-parser 후 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.options('*', cors());

const authRouter = require('./router/auth.router');
const memoRouter = require('./router/memo.router');
const progressRouter = require('./router/progress.router');
const todoRouter = require('./router/todo.router')
const settingsRouter = require('./router/settings.router');


app.use('/auth', authRouter);
app.use('/memo', memoRouter);
app.use('/progress', progressRouter);
app.use('/todo', todoRouter);
app.use('/settings', settingsRouter);

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

// db connection

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});