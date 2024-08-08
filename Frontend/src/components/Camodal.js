import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import "../css/camodal.css"

const Camodal = ({ show, handleClose }) => {
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
        />
        문제 입력
        <Form.Control
          type='text'
          placeholder='문제를 입력해주세요.'
          className='my-3 ca-input'
        />
        답 입력
        <Form.Control
          type='text'
          placeholder='답을 입력해주세요.'
          className='my-3 ca-input'
        />
        힌트 입력
        <Form.Control
          type='text'
          placeholder='문제를 입력해주세요.'
          className='my-3 ca-input'
        />

        <Button className="ca-button" type='submit'>출제</Button>
        <Button className="ca-button" onClick={handleClose}>취소</Button>

      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary">
          저장
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default Camodal;