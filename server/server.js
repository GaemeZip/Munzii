const express = require('express');
const joinRouter = require('./router/join');
const bodyParser = require('body-parser');
// const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/join', joinRouter);


// npm install body-parser 후 사용


app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

