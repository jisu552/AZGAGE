import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import "../css/Home.css"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  
  return (
    <Container>
        <Row>
            <Col>
            <img src='./image/ajae.png' />
          
            </Col>
        </Row>
        <Row> 
            <Col >
            <Button className="me-4 btn" >단계별</Button>
            <Button className="me-4 btn" onClick={()=>{nav('/Board')}}>유저별</Button>
            </Col>
        </Row>
    </Container>
  )
}

export default Home