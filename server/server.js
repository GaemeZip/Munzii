const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// npm install body-parser 후 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const joinRouter = require('./router/join');
const loginRouter = require('./router/login');

app.use('/join', joinRouter);
app.use('/login', loginRouter);


app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

