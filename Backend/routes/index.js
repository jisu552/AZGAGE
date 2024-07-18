// 4-1. 라우터 모듈 가져오기
const express = require('express');
const router = express.Router();


// 4-3. 메인페이지 경로 설정
//      => server.js 추가 작업
router.get('/', (req, res)=>{
    console.log('main');
})

// 4-3. 메인페이지 경로 설정
//      => server.js 추가 작업
router.get('/', (req, res)=>{
    console.log('main');
    // 6-2. 리액트 페이지 응답 설정
    res.sendFile(path.join(__dirname,'..' , '..', 'Frontend', 'build', 'index.html'))
})


// 4-2. 라우터 모듈 내보내기
module.exports = router;