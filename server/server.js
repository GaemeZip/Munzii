const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// npm install body-parser 후 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.options('*', cors());

const usersRouter = require('./router/users.router');
const memosRouter = require('./router/memos.router');
const todosRouter = require('./router/todos.router')
const settingsRouter = require('./router/settings.router');


app.use('/users', usersRouter);
app.use('/memos', memosRouter);
app.use('/todos', todosRouter);
app.use('/settings', settingsRouter);

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});