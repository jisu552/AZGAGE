import React from 'react'
import {  Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import "../css/Mypage.css"
import { faLock, faUnlockKeyhole, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Mypage = () => {
  return (
    <Container>
        <Row className='My_page_Title mt-4'>
            <Col>마이 페이지</Col>          
        </Row>
        <Row>
            <Col >
                <Image className='mimg mt-4' src='/image/ajae.png'/>
            </Col>
        </Row>

        <InputGroup className="mb-3 w-75">
            <InputGroup.Text>
              이름
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="아이디"

              className="input-field"

            />
          </InputGroup>
          <InputGroup className="mb-3 w-75">
            <InputGroup.Text>
              이름
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="아이디"

              className="input-field"

            />
          </InputGroup>
          
    </Container>
  )
}

export default Mypage