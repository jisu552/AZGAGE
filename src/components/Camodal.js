import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
// import "../css/Camodal.css"

const Camodal = ({ show, handleClose }) => {






  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor : '#F89DFF'}}>
        <Modal.Title>출제하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type='text'

          className='my-3'
        />

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary">
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Camodal;
