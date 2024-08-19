import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import "../css/camodal.css"
import axios from "../Axios"

const Camodal = ({ show, handleClose }) => {
  let userId = sessionStorage.getItem("userId");
  let userNickname = sessionStorage.getItem("nickname");
  const [title, setTitle] = useState("")
  const [question,setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [hint,setHint] = useState("")

  useEffect(()=>{
    setTitle("")
    setQuestion('')
    setAnswer('')
    setHint('')
  },[handleClose])

  

  const handleSave = () => {
    // 공백 체크 로직
    if (!title.trim() || !question.trim() || !answer.trim() || !hint.trim()) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    // Construct the newEvent object
    const newObj = {
      userId,
      userNickname,
      title,
      question,
      answer,
      hint
    };
  
    axios.post('/question/insert', newObj)
      .then(response => {
        console.log('새 문제가 성공적으로 추가되었습니다:', response.data);
        handleClose(response.data); // Close modal and possibly pass data back to parent component
      })
      .catch(error => {
        console.error('새 문제 추가 실패:', error);
        alert('새 문제 추가 중 오류가 발생했습니다.');
      });
  };

  



  return (
    <Modal show={show} onHide={handleClose} className='ca-body'>
      <Modal.Header className='ca-header'>
        <Modal.Title className='headertx'>문제 출제</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        제목 입력
        <Form.Control
          type='text'
          placeholder='제목을 입력해주세요.'
          className='my-3 ca-input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        문제 입력
        <Form.Control
          type='text'
          placeholder='문제를 입력해주세요.'
          className='my-3 ca-input'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}

        />
        답 입력
        <Form.Control
          type='text'
          placeholder='답을 입력해주세요.'
          className='my-3 ca-input'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}

        />
        힌트 입력
        <Form.Control
          type='text'
          placeholder='문제를 입력해주세요.'
          className='my-3 ca-input'
          value={hint}
          onChange={(e) => setHint(e.target.value)}
        />

        <Button className="ca-button" type='submit' onClick={handleSave}>출제</Button>
        <Button className="ca-button" onClick={handleClose}>취소</Button>

      </Modal.Body>
    </Modal>
  );
};

export default Camodal;