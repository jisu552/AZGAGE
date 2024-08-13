import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import "../css/BoardDetail.css";
import axios from '../Axios';
import { useNavigate, useParams } from 'react-router-dom';

const BoardDetail = () => {


  const [board, setBoard] = useState({});
  const [boardList, setBoardList] = useState([]);
  const {board_idx} = useParams();
  const nav = useNavigate();
  
  useEffect(() => {
    console.log("sdfdsfdsdsfdsfd");
    
      axios.get(`/question/${board_idx}`)
      .then(response => {
        console.log('문제가 보입니다!!',response.data);
        setBoard(response.data)
        
        
      })
      .catch(error => {
        console.error('문제 보이기 실패:', error);
        alert('문제 보이기 중 오류가 발생했습니다.');
      });


      axios.post('/question/search')
      .then(response => {
        console.log('문제 인덱스 리스트', response.data.board);
        setBoardList(response.data.board)
      })
      .catch(error => {
        console.error('문제 보이기 실패:', error);
        alert('문제 보이기 중 오류가 발생했습니다.');
      });
      
  }, [board_idx]); 

  //상세 페이지에만 수정 삭제

// 정답 입력 어떻게 할지 
// 정답, 오답 swat 출력


  function handleClickPrevious(){

    const currentIndex = boardList.findIndex(item => item.board_idx === parseInt(board_idx));
    if (currentIndex > 0) {
      const previousBoard = boardList[currentIndex - 1];
      nav(`/question/${previousBoard.board_idx}`);
    } else {
      alert('이전 문제가 없습니다.');
    }
  }

  function handleClickNext(){
    const currentIndex = boardList.findIndex(item => item.board_idx === parseInt(board_idx));
    if (currentIndex < boardList.length - 1) {
      const previousBoard = boardList[currentIndex + 1];
      nav(`/question/${previousBoard.board_idx}`);
    } else {
      alert('다음 문제가 없습니다.');
    }
  }
  return (
    <>
      <Container className='mt-5 bcontainer'>
        {/* 헤더 부분 */}
        <Row className="header-row">
          <Col xs={12} md={2} className="header-col title">제목</Col>
          <Col xs={12} md={7} className="header-col">{board.title}</Col>
          <Col xs={12} md={3} className="header-col author">작성자 : {board.nickname}</Col>
        </Row>
      </Container>

      {/* 문제와 힌트 부분 */}
      <Container className='content bcontainer'>
        <Row className='justify-content-center'>
          <Col xs={12}>
            <h3>문제 : <span>{board.question}</span></h3>
          </Col>
        </Row>
        <Row className='mt-4 hint-row justify-content-center'>
          <Col xs={12}>
            <h3><span className="highlight">Hint</span> : {board.hint}</h3>
          </Col>
        </Row>
      </Container>

      {/* 답변 입력 부분 */}
      <Container>
        <Row className="footer-row justify-content-center mt-5">
          <Col xs={12} md={9} className="input-container">
            <InputGroup>
              <Col xs={3} className='answer'><h3>정답</h3></Col>
              <FormControl aria-label="정답" />
            </InputGroup>
          </Col>
          <Col xs={12} md={3} className='colx'>
            <Button variant="outline-secondary" className="arrow-btn" onClick={handleClickPrevious}>◀</Button>
            <Button variant="outline-secondary" className="arrow-btn"  onClick={()=>{nav("/question")}}>목록</Button>
            <Button variant="outline-secondary" className="arrow-btn" onClick={handleClickNext}>▶</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BoardDetail;
