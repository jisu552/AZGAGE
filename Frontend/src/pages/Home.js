import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import "../css/Home.css"
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import WaveSection from '../components/WaveSection'; // SVG 컴포넌트 import
=======
>>>>>>> 2c35a209c6b5c218d8618f5ec224ea6455b5548a

const Home = () => {
  const nav = useNavigate();
  
  return (
<<<<<<< HEAD
    <>
    <Container className="text-center">
=======
    <Container>
>>>>>>> 2c35a209c6b5c218d8618f5ec224ea6455b5548a
        <Row>
            <Col>
            <img src='./image/ajae.png' />
          
            </Col>
        </Row>
        <Row> 
<<<<<<< HEAD
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
=======
            <Col >
            <Button className="me-4 btn" >단계별</Button>
            <Button className="me-4 btn" onClick={()=>{nav('/Board')}}>유저별</Button>
            </Col>
        </Row>
    </Container>
>>>>>>> 2c35a209c6b5c218d8618f5ec224ea6455b5548a
  )
}

export default Home