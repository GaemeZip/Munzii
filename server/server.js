// 이게 서버에요
const express = require('express');
const app = express();
// const cors = require('cors');
const http = require('http');
const port = 3030;

app.use(express.json());
// app.use(cors());
// app.options('*', cors());


let server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  console.log(`server listening on port ${port}`)
})

server.on('error', () => {

})


//mysql 연동
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ant123',
    database: 'my_db' //db 이름 바꿔주기
});

connection.connect();

//query문 입력을 통해 data 가져오기
connection.query('SELECT * from Users', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
});

connection.end();

// 'ER_NOT_SUPPORTED_AUTH_MODE' 발생 시
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ant123';
// FLUSH PRIVILEGES;
