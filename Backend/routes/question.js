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

module.exports = router;
