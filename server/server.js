
// const http = require('http');
// const port = 3030;

// app.use(express.json());

// // cors error 대비
// // const cors = require('cors');
// // app.use(cors());
// // app.options('*', cors());

// // npm install body-parser 후 사용
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());



// let server = http.createServer(app);
// server.listen(port);
// server.on('listening', () => {
//   console.log(`server listening on port ${port}`)
// })

// server.on('error', () => {

// })






const express    = require('express');
const mysql      = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const dbconfig   = require('./db.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.get('/users', (req, res) => {
  connection.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

app.get('/sign-up', (req, res) => {
  connection.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

// 'ER_NOT_SUPPORTED_AUTH_MODE' 발생 시
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ant123';
// FLUSH PRIVILEGES;