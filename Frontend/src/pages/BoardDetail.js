import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import "../css/BoardDetail.css";
import axios from '../Axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Boardmodal from '../components/Boardmodal';

const BoardDetail = () => {


  const [board, setBoard] = useState({});
  const [modalData, setModalData] = useState({ title: '', question: '', hint: '', answer: '' });
  const [boardList, setBoardList] = useState([]);
  const {board_idx} = useParams();
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const nav = useNavigate();
  const [userAnswer, setUserAnswer] = useState("");
  let uid = window.sessionStorage.getItem('userId')
  
  useEffect(() => {
    console.log("sdfdsfdsdsfdsfd");
    
      axios.get(`/question/${board_idx}`)
      .then(response => {
        console.log('문제가 보입니다!!',response.data);
        setBoard(response.data)
        setModalData({
          title: response.data.title,
          question: response.data.question,
          hint: response.data.hint,
          answer: response.data.answer
        });
        
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
      
      // 현재 사용자 정보를 가져오는 API 호출 (예시)
      setCurrentUser(uid);
      console.log(currentUser);
      
  }, [board_idx,showModal]); 

  //상세 페이지에만 수정 삭제
// 정답 입력 어떻게 할지 


  function handleClickPrevious(){

    const currentIndex = boardList.findIndex(item => item.board_idx === parseInt(board_idx));
    if (currentIndex > 0) {
      const previousBoard = boardList[currentIndex - 1];
      nav(`/question/${previousBoard.board_idx}`);
    } else {
      Swal.fire({
        icon : "warning",
        text : "이전 문제가 없습니다.",
        confirmButtonText : "확인",
      });
    }
  }

  function handleClickNext(){
    const currentIndex = boardList.findIndex(item => item.board_idx === parseInt(board_idx));
    if (currentIndex < boardList.length - 1) {
      const previousBoard = boardList[currentIndex + 1];
      nav(`/question/${previousBoard.board_idx}`);
    } else {
      Swal.fire({
        icon : "warning",
        text : "다음 문제가 없습니다.",
        confirmButtonText : "확인",
      });
    }
  }
  function handleAnswerSubmit(){
    if(userAnswer.trim()===board.answer){
      Swal.fire({
        icon: 'success',
        title: '정답입니다!',
        text: '축하합니다! 정답을 맞추셨습니다.',
        confirmButtonText: '확인'
      }).then(() => {
        nav('/question'); // 목록 페이지로 이동
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '오답입니다!',
        text: '정답이 아닙니다. 다시 시도해 보세요.',
        confirmButtonText: '확인'
      });
    }
  }

  function handleDelete() {
    axios.post(`/question/del/${board_idx}`)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '삭제되었습니다!',
          text: '게시물이 성공적으로 삭제되었습니다.',
          confirmButtonText: '확인'
        }).then(() => {
          nav('/question'); // 목록 페이지로 이동
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: '삭제 실패',
          text: '게시물 삭제 중 오류가 발생했습니다.',
          confirmButtonText: '확인'
        });
      });
  }

  function handleCloseModal(){
    setShowModal(false);

  }
  function handleUpdate() {
    // 수정 작업을 위한 페이지로 이동하거나 모달에서 처리
    setShowModal(true);   
  }
  function handleModalSave(updatedData) {
    axios.post('/question/update', { board_idx, ...updatedData })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '수정 완료',
          text: '게시물이 성공적으로 수정되었습니다.',
          confirmButtonText: '확인'
        }).then(() => {
          setShowModal(false);
          nav(`/question/${board_idx}`);
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: '수정 실패',
          text: '게시물 수정 중 오류가 발생했습니다.',
          confirmButtonText: '확인'
        });
      });
  }
  return (
    <>
          {currentUser === board.user_id && (
              <>
              <Container className='mt-3'>
                <Button variant="danger" className="action-btn me-2" onClick={handleDelete}>삭제</Button>
                <Button variant="warning" className="action-btn" onClick={handleUpdate}>수정</Button>
                </Container>
              </>
            )}
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
              <FormControl 
              aria-label="정답"
              value={userAnswer} 
              onChange={(e) => setUserAnswer(e.target.value)}
              />
              <Button variant="primary" className="submitbtn" onClick={handleAnswerSubmit}>제출</Button>
            </InputGroup>
          </Col>
          <Col xs={12} md={3} className='colx'>
            <Button variant="outline-secondary" className="arrow-btn" onClick={handleClickPrevious}>◀</Button>
            <Button variant="outline-secondary" className="arrow-btn"  onClick={()=>{nav("/question")}}>목록</Button>
            <Button variant="outline-secondary" className="arrow-btn" onClick={handleClickNext}>▶</Button>

          </Col>
        </Row>


      </Container>
      <Boardmodal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleModalSave}
        initialData={modalData}
      />
    </>
  );
};

export default BoardDetail;
