// 5-1. mysql 모듈 가져오기
const mysql = require('mysql2');

let conn = mysql.createConnection({
    'host' : '192.168.70.203',
    'user' : 'aze',
    'password' : 'Aze12345@',
    'port' : 3306,
    'database' : 'azegag_db'
});


// 5-3. DB 정보 연결 및 모듈 내보내기
conn.connect()
module.exports = conn