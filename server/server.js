// // 이게 서버에요
// const express = require('express');
// const app = express();

// const dbconfig = require('./db.js');
// const mysql = require('mysql');
// const connection = mysql.createConnection(dbconfig);
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

// app.get('/', (req, res) => {
//   res.send('Root');
// });

// app.post('/', (req, res) => {
// });

// app.get('/users', (req, res) => {
//   connection.query('SELECT * from Users', (error, rows) => {
//     if (error) throw error;
//     console.log('User info is: ', rows);
//     res.send(rows);
//   });
// });


// // 'ER_NOT_SUPPORTED_AUTH_MODE' 발생 시
// // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ant123';
// // FLUSH PRIVILEGES;


const express    = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./db.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

// configuration =========================
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

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
