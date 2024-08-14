import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import axios from '../Axios'; // 이 경로가 올바른지 확인해야 합니다.
import "../css/Mypage.css";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


const Mypage = () => {
  const [userData, setUserData] = useState(null); // 초기 상태를 null로 설정
  const [error, setError] = useState(null); // 초기 상태를 null로 설정
  let userId = window.sessionStorage.getItem("userId")
  console.log(userId);
  const nav = useNavigate()

  useEffect(() => {
    // axios를 사용하여 로그인된 사용자 데이터 가져오기
    axios.post(`/Mypage/${userId}`)
      .then(response => {
        console.log('데이터 가져오기 성공:', response.data);
        setUserData(response.data); // 데이터를 상태에 설정
      })
      .catch(error => {
        console.error('사용자 데이터 가져오기 실패:', error);
        setError(error.response ? error.response.data.error : "알 수 없는 오류가 발생했습니다.");
        nav("/")
      });
  }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

  if (error) {
    return <div className="error-message">{error}</div>; // 오류 메시지 표시
  }

  if (!userData) {
    return <div className="loading-message">로딩 중...</div>; // 데이터를 가져오는 동안 로딩 상태 표시
  }



  return (
    <Container>
      <Row className='My_page_Title mt-4'>
        <Col>마이 페이지</Col>          
      </Row>
      <Row>
        <Col>
          <Image className='mimg mt-4' src={userData.user_profile || '/image/default.png'} alt="User Profile" />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={6}>
          <div className="info-box">
            <Row>
              <Col><strong>이름</strong></Col>
              <Col>{userData.user_name}</Col>
            </Row>
          </div>
          <div className="info-box"> 
            <Row>
              <Col><strong>핸드폰</strong></Col>
              <Col>{userData.user_phone}</Col>
            </Row>
          </div>
          <div className="info-box">
            <Row>
              <Col><strong>전적수/맞춘수/틀린수</strong></Col>
              <Col>{userData.achievetimes}</Col>
            </Row>
          </div>
          <div className="info-box">
            <Row>
              <Col><strong>랭킹</strong></Col>
              <Col>{userData.ranking}</Col>
            </Row>
          </div>
          <div className="info-box">
            <Row>
              <Col><strong>포인트</strong></Col>
              <Col><FontAwesomeIcon icon={faGem} /> x {userData.point}</Col>
            </Row>
          </div>
          <div className="info-box">
            <Row>
              <Col><strong>내가 낸 문제들</strong></Col>
              <Col>{userData.my_chapter}</Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Mypage;
