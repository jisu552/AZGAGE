import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import "../css/camodal.css"
import axios from "../Axios"


const Boardmodal = ({ show, onClose, onSave, initialData,onAlert }) => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [hint, setHint] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setQuestion(initialData.question);
      setHint(initialData.hint);
      setAnswer(initialData.answer);
    }
  }, [initialData]);

  const handleSave = () => {
    const updatedData = { title, question, hint, answer };
    if(updatedData.title.length == 0 || updatedData.question.length == 0 || updatedData.answer.length == 0){
      onAlert();
    }
    onSave(updatedData);
  };

  return (
    <Modal show={show} onHide={onClose} className='ca-body'>
      <Modal.Header className='ca-header'>
        <Modal.Title className='headertx'>게시물 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>

            제목 수정
            <Form.Control
              type="text"
              className='my-3 ca-input'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            문제 수정
            <Form.Control
              type="text"
              className='my-3 ca-input'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            정답 수정
            <Form.Control
              type="text"
              className='my-3 ca-input'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            힌트 수정
            <Form.Control
              type="text"
              className='my-3 ca-input'
              value={hint}
              onChange={(e) => setHint(e.target.value)}
            />


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>취소</Button>
        <Button variant="primary" onClick={handleSave}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Boardmodal;