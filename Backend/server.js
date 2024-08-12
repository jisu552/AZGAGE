// 3-1. 기본 모듈 가져오기
const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes');
const cors = require('cors')
const session = require("express-session");
const fileStore = require("session-file-store")(session);
require('dotenv').config(); // .env 파일에서 환경 변수 로드

// 6-1. 리액트 프로젝트 경로 설정
app.use(express.static(path.join(__dirname, '..', 'Frontend', 'build')));
app.use(express.json());

//9. CORS 설정
app.use(cors())

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
      },
    })
  );

// 4-3. 메인페이지 경로 설정
app.use('/', indexRouter);


// 3-2. 포트 설정
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), ()=>{
    console.log(`Server is running on ${app.get('port')}`);
});