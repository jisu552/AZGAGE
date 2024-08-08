import React, { useCallback, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../css/Nav.css";


function Navs() {
 

  return (
    <Navbar expand="lg" className="custom-navbar"  data-bs-theme="dark">
      <Container style={{ maxWidth: "80%" }}>
        <Navbar.Brand href="/">
          <img
            src="image/ajae.png"
            alt="로고"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-center">
            <Nav.Link href="/">홈</Nav.Link>
            <Nav.Link href="/Category">단계별문제</Nav.Link>
            <Nav.Link href="/Board">유저문제</Nav.Link>
          </Nav>
          <Nav className="align-items-center">
                <Nav.Link href="/login">로그인</Nav.Link>
                <Nav.Link href="/Register">
                  회원가입
                </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navs;
