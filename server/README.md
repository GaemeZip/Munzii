# Munzii
> server 관련 문서

<br>

### CORS 오류 시 아래 소스코드 삽입
```javascript
const cors = require('cors');
app.use(cors());
app.options('*', cors());
```
<br>

### ERROR 'ER_NOT_SUPPORTED_AUTH_MODE' 발생 시 아래 sql문 터미널에 입력
```javascript
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ant123';
FLUSH PRIVILEGES;
```
