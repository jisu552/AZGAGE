const express = require('express');
const router = express.Router();
const conn = require('../config/database')


router.get('/', (req, res)=>{
    console.log('question');
})

router.post('/insert', (request, response) => {
    try{
    const newObj = { 
        userId,
        userNickname,
        title,
        question,
        answer,
        hint,
        } =request.body;
        let sql = "INSERT INTO question_board(user_id, nickname, title, question, answer, hint, created_date) VALUES(?,?,?,?,?,?,CURRENT_TIMESTAMP)";
    const values = [userId, userNickname, title, question, answer, hint];
    conn.query(sql,values , (err, res) => {
        if (err) {
            console.log(newObj);
            console.error("Database Error:", err);

            return res.status(500).json({ error: "문제등록 실패", details: err.message });
            
            
        }

        response.status(201).json({ message: "문제등록 성공" });
    });
} catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "서버 에러", details: error.message });
}
    
})

router.post('/search', (request, response) => {
    
    let sql = "SELECT * FROM question_board WHERE isdelete = 'N'"
    conn.query(sql,(err,rows)=>{
        if(err){
            console.error("유저 문제게시판 찾기 쿼리 오류:",err);
            return response.status(500).json({
                error:'서버오류'
            }) 
        }if(rows.length>0){
            response.json({board:rows})
        }else{
            response.status(404).json({error:'데이터가 없습니다'})
        }
    })
})



router.get('/:board_idx', (req, res) => {
    const  board_idx  = req.params.board_idx; 
    console.log(req.params.board_idx);
    console.log("상세페이지 라우터");
   
    
    console.log(board_idx);
    
    const sql = "SELECT * FROM question_board WHERE board_idx = ? and isdelete = 'N'";

    conn.query(sql, [board_idx], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리x 에러:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (results.length === 0) {
            console.log(results);
            return res.status(404).json({ error: '게시판 항목을 찾을 수 없습니다.' });
        }
        res.json(results[0]); 
    });
});

router.post('/del/:board_idx',(req,res)=>{
    const { board_idx } = req.params;
    console.log(`sadfasdf, ${board_idx}`);
    let sql = "UPDATE question_board SET isdelete = 'Y' WHERE board_idx = ?"
    conn.query(sql, [board_idx], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리x 에러:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (results.length === 0) {
            console.log(results);
            return res.status(404).json({ error: '게시판 항목을 찾을 수 없습니다.' });
        }
        res.json(results[0]); 
    });
});

router.get('/step/:que_idx', (req, res) => {
    const  que_idx  = req.params.que_idx; 
    console.log(req.params.que_idx);
    console.log("상세페이지 라우터");
   
    
    console.log(que_idx);
    
    const sql = 'SELECT * FROM step_board WHERE que_idx = ?';

    conn.query(sql, [que_idx], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리x 에러:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (results.length === 0) {
            console.log(results);
            return res.status(404).json({ error: '게시판 항목을 찾을 수 없습니다.' });
        }
        res.json(results[0]); 
    });
})
router.post('/update', (req,res)=>{
    const updatedData = req.body;
    console.log('123123', updatedData);
    console.log('123', updatedData.title);
    
    let sql = 'UPDATE question_board SET title = ?, question = ?, answer = ?, hint = ? WHERE board_idx = ?'
    conn.query(sql, [updatedData.title, updatedData.question, updatedData.answer, updatedData.hint, updatedData.board_idx], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리x 에러:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (results.length === 0) {
            console.log(results);
            return res.status(404).json({ error: '에러' });
        }
        res.json(results[0]); 
    });
})

router.post('/chapter', (request, response) => {
    const { userId } = request.body;

    let sql = "SELECT my_chapter FROM user WHERE user_id = ?";
    conn.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 오류:', err);
            return response.status(500).json({ error: '서버 오류' });
        }
        if (results.length === 0) {
            return response.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }
        response.json({ chapter: results[0].my_chapter });
    });
});




module.exports = router;
