// 5-1. mysql 모듈 가져오기
const mysql = require('mysql2');
require('dotenv').config(); // .env 파일의 환경 변수를 로드

let conn = mysql.createConnection({
    'host': process.env.DB_HOST,
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'port': process.env.DB_PORT,
    'database': process.env.DB_DATABASE
});


// 5-3. DB 정보 연결 및 모듈 내보내기
conn.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = conn;