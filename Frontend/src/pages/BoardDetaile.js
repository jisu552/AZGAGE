import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import "../css/BoardDetail.css";
import axios from '../Axios';
import Swal from 'sweetalert2';


const BoardDetaile = () => {

  const nav = useNavigate();
  const {que_idx} = useParams()
  const [step, setStep] = useState({})
  const [answer, setAnswer] = useState('');

  useEffect(()=>{
    axios.get(`/question/step/${que_idx}`)
    .then(response => {
      console.log('문제가 보입니다!!',response.data);
      setStep(response.data)
      
      
    })
    .catch(error => {
      console.error('문제 보이기 실패:', error);
      alert('문제 보이기 중 오류가 발생했습니다.');
    });
  },[que_idx])

  const handleAnswerCheck = () => {
    if (answer === step.answer) {
      Swal.fire({
        icon: 'success',
        title: '정답입니다!',
        text: '축하합니다!',
        showConfirmButton: true,
        
      }).then(
      nav(`/Stage/${Number(que_idx)+1}`)

      );
    
    } else {
      Swal.fire({
        icon: 'error',
        title: '땡!',
        text: '다시 시도해보세요.',
        showConfirmButton: true,
        
      });
    }
    console.log(step.answer);
    
    setAnswer(''); // 입력 필드 초기화
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleAnswerCheck(); 
    }
  };

  // function handleClickPrevious(){

  //   const currentIndex = boardList.findIndex(item => item.board_idx === parseInt(board_idx));
  //   if (currentIndex > 0) {
  //     const previousBoard = boardList[currentIndex - 1];
  //     nav(`/question/${previousBoard.board_idx}`);
  //   } else {
  //     alert('이전 문제가 없습니다.');
  //   }
  // }

  // function handleClickNext(){
  //   const currentIndex = boardList.findIndex(item => item.board_idx === parseInt(board_idx));
  //   if (currentIndex < boardList.length - 1) {
  //     const previousBoard = boardList[currentIndex + 1];
  //     nav(`/question/${previousBoard.board_idx}`);
  //   } else {
  //     alert('다음 문제가 없습니다.');
  //   }
  // }







  return (
    <>
    <Container className='mt-5 bcontainer'>
      {/* 헤더 부분 */}
      <Row className="header-row">
        <Col xs={12} md={2} className="header-col title">{step.chapter}단계</Col>
        {/* <Col xs={12} md={7} className="header-col">임은영 바보</Col> */}
        <Col xs={12} md={3} className="header-col author">step{step.step}</Col>
      </Row>
    </Container>

    {/* 문제와 힌트 부분 */}
    <Container className='content bcontainer'>
      <Row className='justify-content-center'>
        <Col xs={12}>
          <h3>문제 : <span>{step.question}</span></h3>
        </Col>
      </Row>
      {/* <Row className='mt-4 hint-row justify-content-center'>
        <Col xs={12}>
          <h3><span className="highlight">Hint</span> : sdfs</h3>
        </Col>
      </Row> */}
    </Container>

    {/* 답변 입력 부분 */}
    <Container>
      <Row className="footer-row justify-content-center mt-5">
        <Col xs={12} md={9} className="input-container">
          <InputGroup>
            <Col xs={3} className='answer'><h3>정답</h3></Col>
            <FormControl aria-label="정답" 
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            onKeyUp={handleKeyUp}
            />
            <Button className='submitbtn' onClick={handleAnswerCheck} >제출</Button>
          </InputGroup>
        </Col>
        <Col xs={12} md={3} className='colx'>
          <Button variant="outline-secondary" className="arrow-btn" onClick={()=>{nav(`/Stage/${Number(que_idx)-1}`)}}>◀</Button>
          <Button variant="outline-secondary" className="arrow-btn"  onClick={()=>{nav("/Stage")}}>단계</Button>
          {/* <Button variant="outline-secondary" className="arrow-btn" onClick={()=>{nav(`/Stage/${Number(que_idx)+1}`)}}>▶</Button> */}
          <Button variant="outline-secondary" className="arrow-btn" onClick={handleAnswerCheck}>▶</Button>

        </Col>
      </Row>
    </Container>
  </>
  )
}

export default BoardDetaile