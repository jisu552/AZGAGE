// 4-1. 라우터 모듈 가져오기
const express = require('express');
const router = express.Router();
const conn = require('../config/database')
const md5 = require('md5');

// 4-3. 메인페이지 경로 설정
//      => server.js 추가 작업
// router.get('/', (req, res)=>{
//     console.log('main');
// })

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

router.post('/SignIn', (req, res)=>{
    const {userId, userPw} = req.body;
    const hashPw = md5(userPw);
    const sql = `SELECT user_id, nickname FROM user WHERE user_id=? AND pw=?`;
    conn.query(sql, [userId, userPw], (err, rows)=>{
        if(rows.length>0){
            req.session.user = { id: rows[0].user_id,nickname: rows[0].nickname };
            res.json({ success : true, nickname: rows[0].nickname  });
        } else {
            res.json({ success : false });
        }
    })
})

// router.get('/Board/:board_idx', (req, res) => {
//     const  board_idx  = req.params.board_idx; 
//     console.log(req.params.board_idx);
//     console.log("상세페이지 라우터");
   
    
//     console.log(board_idx);
    
//     const sql = 'SELECT * FROM question_board WHERE board_idx = ?';

//     conn.query(sql, [id], (err, results) => {
//         if (err) {
//             console.error('데이터베이스 쿼리x 에러:', err);
//             return res.status(500).json({ error: '서버 오류' });
//         }
//         if (results.length === 0) {
//             console.log(results);
//             return res.status(404).json({ error: '게시판 항목을 찾을 수 없습니다.' });
//         }
//         res.json(results[0]); 
//     });
// });


// DB관련


// 4-2. 라우터 모듈 내보내기
module.exports = router;