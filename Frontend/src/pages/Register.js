
import { faLock, faUnlockKeyhole, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "../Axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [isIdValid, setIsIdValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userNickName, setUserNickName] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();



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
        if (name === "passwordCheck"){
          setPasswordCheck(value);
        }
        if (name === "userName"){
          setUserNickName(value);
        } 
        if (name === "username"){
          setUsername(value);
        }
    };
    function isPasswordMatching(password, confirmPassword){
      return password == confirmPassword
  }
  
  function validatedId(id) {
    const re = /^[A-Za-z0-9]{8,}$/;

    return re.test(id);
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
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!isIdValid) {
        Swal.fire({
          icon: 'error',
          text: '아이디 중복 확인을 해주세요.',
          confirmButtonText: '확인'
        });
        return;
      }
      if (password !== passwordCheck) {
        Swal.fire({
          icon: 'error',
          text: '비밀번호가 일치하지 않습니다..',
          confirmButtonText: '확인'
        });
        return;
      }
  
      if (!password.trim() ) {
        Swal.fire({
          icon: 'error',
          text: '비밀번호를 입력해주세요',
          confirmButtonText: '확인'
        });
        return;
      }
  
      if (!passwordCheck.trim() ) {
        Swal.fire({
          icon: 'error',
          text: '비밀번호 확인을 입력해주세요',
          confirmButtonText: '확인'
        });
        return;
      }
      if (!phoneNumber.trim()) {
        Swal.fire({
          icon: 'error',
          text: '전화번호를 입력해주세요.',
          confirmButtonText: '확인'
        });
        return;
      }
  
      if (!userNickName.trim()) {
        Swal.fire({
          icon: 'error',
          text: '닉네임을 입력해주세요.',
          confirmButtonText: '확인'
        });
        return;
      }
    const userData = {
      user_id : userId,
      nickname : userNickName,
      user_name : username,
      pw : password,
      user_phone : phoneNumber,

    }

    try {
        await axios.post("/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // 이 이후 실행이 안됨 log 안 찍힘
      console.log("회원가입 성공");
      navigate("/login");
      
    } catch (error) {
      console.error("회원가입 실패:", error);
      Swal.fire({
        icon: 'error',
        text: '회원가입에 실패하였습니다.',
        confirmButtonText: '확인'
      });
    }
  };



    function formatPhoneNumber(Number){
        const cleaned = Number.replace(/\D/g, "");
        if (cleaned.length < 4) return cleaned;
        const match = cleaned.match(/(\d{3})(\d{4})(\d{4})/);
        return match ? `${match[1]}-${match[2]}-${match[3]}` : Number;
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

        <Form onSubmit={handleSubmit}>
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
              name="username"
              className="input-field"
              value={username}
              onChange={handleInputChange}
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
              name = "passwordCheck"
              value={passwordCheck}
              onChange={handleInputChange}
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
              type="text"
              placeholder="휴대폰 번호"
              name="phoneNumber"
              className="input-field"
              maxLength="13"
              value={phoneNumber}
              onChange={handleInputChange}
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