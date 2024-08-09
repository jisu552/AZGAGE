import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const BoardDetaile = () => {
  return (
    <Container className='mt-5'>
        <Row style={{backgroundColor:'yellow',border:'1px solid black'}}>
            <Col lg={2} style={{borderRight : '1px solid black'}}>제목</Col>
            <Col lg={10}>작성자</Col> 
        </Row>
        <Row className='mt-4' style={{border:'1px solid black',height:'250px'}}>
            <Col className='jusify-content-center'>
                 <h3>문제 : <span>신사가 자기소개를 한다면 ?</span></h3>
            </Col>
        </Row>
    </Container>
  )
}

export default BoardDetaile