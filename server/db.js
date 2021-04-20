//mysql 연동
module.exports = {
    host: 'localhost',
    user: 'root',
    password: 'ant123',
    database: 'my_db' //db 이름 바꿔주기
};

// 'ER_NOT_SUPPORTED_AUTH_MODE' 발생 시
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ant123';
// FLUSH PRIVILEGES;
