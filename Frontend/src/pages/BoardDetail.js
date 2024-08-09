import React from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import "../css/BoardDetail.css";

const BoardDetail = () => {
  return (
    <>
      <Container className='mt-5 bcontainer'>
        {/* 헤더 부분 */}
        <Row className="header-row">
          <Col xs={12} md={2} className="header-col title">제목</Col>
          <Col xs={12} md={7} className="header-col">이거 맞춰 보세용</Col>
          <Col xs={12} md={3} className="header-col author">작성자 : 지수몬</Col>
        </Row>
      </Container>

      {/* 문제와 힌트 부분 */}
      <Container className='content bcontainer'>
        <Row className='justify-content-center'>
          <Col xs={12}>
            <h3>문제 : <span>신사가 자기소개를 한다면 ?</span></h3>
          </Col>
        </Row>
        <Row className='mt-4 hint-row justify-content-center'>
          <Col xs={12}>
            <h3><span className="highlight">Hint</span> : 귀여움</h3>
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
            <Button variant="outline-secondary" className="arrow-btn">◀</Button>
            <Button variant="outline-secondary" className="arrow-btn">목록</Button>
            <Button variant="outline-secondary" className="arrow-btn">▶</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BoardDetail;
