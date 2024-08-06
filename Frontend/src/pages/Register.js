
import { faLock, faUnlockKeyhole, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Nav, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "../Axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [isIdValid, setIsIdValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userNickName, setUserNickName] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");



    const handleInputChange = async (e)=>{
        const{name, value} = e.target
        if (name === "phoneNumber"){
            setPhoneNumber(formatPhoneNumber(value))
        }    
        if (name === "userId"){
            const validId = validatedId(value)
            setUserId(value)
            setIsIdValid(validId)
            if (validId) {
                const response = await axios.get(`/checkId/${value}`);
                setIsIdValid(!response.data);
                setErrorMessage(response.data ? "이미 아이디 있음." : "가능");
                // if, else문 대신

            }
            else{
                setErrorMessage("아이디 조합 영문과 숫자, 최소 8자 이상");
            }
        }
        if (name === "usernickname"){
            setUserNickName(value);
        }
        if (name === "password"){
            setPassword(value);
        }


    };

    function isPasswordMatching(password, confirmPassword){
        return password == confirmPassword
    }
    const handleBlur = (e) => {
        const {name, value} = e.target;
        if (name === "userId" && value.length < 8){
            Swal.fire({
                icon : "warning",
                text : "아이디 8글자 이상",
                confirmButtonText : "컨펌",
            });
            setIsIdValid(false);
        }
    };

    function validatedId(id) {
        const re = /^[A-Za-z0-9]{8,}$/;

        return re.test(id);
    }
    function formatPhoneNumber(number){
        const cleaned = number.replace(/\D/g, "");
        if (cleaned.length < 4) return cleaned;
        const match = cleaned.match(/(\d{3})(\d{4}{\d{4}})/);
        return match ?`${match[1]}-${match[2]}-${match[3]}` :number;

    }
  return (
    
    <Container className="mt-5">
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
              name = "userId"
              className="input-field"
              value={userId}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </InputGroup>
          <Form.Text className={isIdValid ? "text-success" : "text-danger"}>
                {errorMessage}
              </Form.Text>
          <InputGroup className="mb-3 w-75">
            <InputGroup.Text>
              <FontAwesomeIcon icon={faUser} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="닉네임"
              name="usernickname"
              className="input-field"
              value={userNickName}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup className="mb-3 w-75">
            <InputGroup.Text>
              <FontAwesomeIcon icon={faUser} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="이름"
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
              name = "password"
              className="input-field"
              value={password}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup className="mb-3 w-75">
            <InputGroup.Text>
              <FontAwesomeIcon icon={faLock} />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="비밀번호 확인"
              className="input-field"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </InputGroup>
          <Form.Text
                  className={
                    password && passwordCheck
                      ? isPasswordMatching(password, passwordCheck)
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  {password && passwordCheck
                    ? isPasswordMatching(password, passwordCheck)
                      ? "비밀번호가 일치합니다."
                      : "비밀번호가 불일치합니다."
                    : ""}
                </Form.Text>
          <InputGroup className="mb-3 w-75">
            <InputGroup.Text>
              <FontAwesomeIcon icon={faLock} />
            </InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="휴대폰 번호"
              name="phoneNumber"
              className="input-field"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputGroup>
          <Button
            variant="success"
            type="submit"
            className="login-button mb-3"
          >
            회원가입
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  )
}

export default Register