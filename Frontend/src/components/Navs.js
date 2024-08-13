import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../css/Nav.css";

function Navs() {
  
  const [isLogin,setIsLogin] = useState(false)
  
// 세션 스토리지에서 사용자 정보 가져오기
  let userId = sessionStorage.getItem("userId");
  let userNickname = sessionStorage.getItem("nickname");

  useEffect(() => {
    
    if(userId == null){
      console.log('isLogin ??null :: ', isLogin);

    }else {
      console.log('isLogin ?? :: ', isLogin);
      setIsLogin(true);
    }
    
  }, [isLogin]); // 빈 배열은 컴포넌트가 마운트될 때만 실행됨
  
  
  const handleLogout = () => {
    // 세션 스토리지에서 사용자 정보 삭제
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("nickname");
    // setUser(null); // 상태를 null로 업데이트
    setIsLogin(false)

  };

  return (
    <Navbar expand="lg" className="custom-navbar" data-bs-theme="dark">
      <Container style={{ maxWidth: "80%" }}>
        <Navbar.Brand href="/">
          <img src="image/ajae.png" alt="로고" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-center">
            <Nav.Link href="/">홈</Nav.Link>
            <Nav.Link href="/Stage">단계별문제</Nav.Link>
            <Nav.Link href="/question">유저문제</Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            {isLogin ? (
              <>
                <Nav.Link href="/Mypage">{userNickname}님</Nav.Link>
                <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">로그인</Nav.Link>
                <Nav.Link href="/Register">회원가입</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navs;
