// 4-1. 라우터 모듈 가져오기
const express = require('express');
const router = express.Router();
const conn = require('../config/database')

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


router.get('/checkId/:userId', (request, response) => {
    const userId = request.params.userId;
    let sql = "SELECT COUNT(*) AS count FROM user WHERE user_id = ?";
    conn.query(sql, userId, (err, res) => {
        if (err) {
            return res.status(500).json({error : err.message});
        }
        const count = res[0].count;
        response.json(count > 0);
    })
})

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const {
            user_id,
            nickname,
            user_name,
            pw,
            user_phone
        } = req.body;

        // 비밀번호 해싱
        // const hashedPassword = await bcrypt.hash(pw, 10);

        let sql = "INSERT INTO user(user_id, nickname, user_name, pw, user_phone) VALUES(?,?,?,?,?)";
        conn.query(sql, [user_id, nickname, user_name, pw, user_phone], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ error: "회원가입 실패", details: err.message });
            }

            res.status(201).json({ message: "회원가입 성공" });
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "서버 에러", details: error.message });
    }
});

// DB관련


// 4-2. 라우터 모듈 내보내기
module.exports = router;