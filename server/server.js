const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// npm install body-parser 후 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const joinRouter = require('./router/users/join');
const loginRouter = require('./router/users/login');
const memoRouter = require('./router/memos/memo');
const insertTimelineRouter = require('./router/timelines/insertTimeline');

app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/memo', memoRouter);
app.use('/timeline', insertTimelineRouter);


app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});