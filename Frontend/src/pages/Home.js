import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import "../css/Home.css"
import { useNavigate } from "react-router-dom";
import WaveSection from '../components/WaveSection'; // SVG 컴포넌트 import

const Home = () => {
  const nav = useNavigate();
  
  return (

    <>
    <Container className="text-center">
  
        <Row>
            <Col>
            <img src='./image/ajae.png' />
          
            </Col>
        </Row>
        <Row> 
            <Col className="button-container">
            <Button className="me-4 btn" >단계별</Button>
            <Button className="me-4 btn user" onClick={()=>{nav('/Board')}}>유저별</Button>
            </Col>
        </Row>
    
    </Container>
    <Container fluid className="position-relative">
        <Row>
          <Col className='homeimg'>
            {/* <Image src='./image/homeimg.png' alt='Home' className='img-fluid' /> */}
          </Col>
        </Row>
        <WaveSection /> {/* SVG 컴포넌트를 여기에 추가 */}
      </Container>
      
   
   
    </>


  )
}

export default Home