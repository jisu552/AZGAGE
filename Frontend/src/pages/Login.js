import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import "../css/Login.css"; // CSS 파일의 실제 경로로 확인하세요.


function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let nav = useNavigate()

  function resg(){
    nav('/Register')
  }  


  return (
    <div>
      <div id="content" className="my-custom-content">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6} className="login-form-container">
              <div className="text-center mb-4">
                <img
                  src="/image/ajae.png"
                  alt="아재 로고"
                  className="login-logo"
                />
              </div>

              <Form>
                <InputGroup className="mb-3 w-75">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="아이디"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>

                <InputGroup className="mb-3 w-75">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>

                <Button
                  
                  type="submit"
                  className="login-button mb-3"
                >
                  로그인
                </Button>
              </Form>
              <div className="text-center mt-4">
                <Nav className="me-auto justify-content-center">
                  <Nav.Link
                    className="nlink"
                  >
                    아이디/비밀번호 찾기
                  </Nav.Link>

                  <Nav.Link
                    className="nlink"
                    // onClick={()=>{nav('/Register')}}
                    onClick={resg}
                  >
                    회원가입
                  </Nav.Link>
                </Nav>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;