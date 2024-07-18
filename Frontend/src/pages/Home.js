import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import "../css/Home.css"
const Home = () => {
  return (
    <Container>
        <Row>
            <Col>
            <img src='./image/ajae.png' />
          
            </Col>
        </Row>
        <Row> 
            <Col >
            <Button className="me-4 btn">단계별</Button>
            <Button className="me-4 btn">유저별</Button>
            </Col>
        </Row>
    </Container>
  )
}

export default Home