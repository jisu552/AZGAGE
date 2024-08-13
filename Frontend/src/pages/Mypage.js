import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import "../css/Mypage.css"
import { faGem } from "@fortawesome/free-solid-svg-icons";
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

      

      <Row className="justify-content-center">
        <Col xs={6}>
        <div className="info-box">
          <div >
            <Row>
              <Col><strong>이름</strong></Col>
              <Col>이므녕 바보</Col>
            </Row>

        </div>

        
          </div>
          <div className="info-box"> 
            <Row>
              <Col><strong>핸드폰</strong></Col>
              <Col>010-1234-5978</Col>
            </Row>
          </div>
          <div className="info-box">
            <Row>
              <Col><strong>전적수/맞춘수/틀린수</strong></Col>
              <Col>85/80/5</Col>
            </Row>
          </div>
          <div className="info-box">
            <Row>
              <Col><strong>랭킹</strong></Col>
              <Col>85</Col>
            </Row>
          </div>
          <div className="info-box">
            <Row>
              <Col><strong>포인트</strong></Col>
              <Col><FontAwesomeIcon icon={faGem} /> x 85</Col>
            </Row>
          </div>
          <div className="info-box">
            <Row>
              <Col><strong>내가 낸 문제들</strong></Col>
              <Col>85</Col>
            </Row>
          </div>
        </Col>
      </Row>
     
    </Container>
  )
}

export default Mypage
