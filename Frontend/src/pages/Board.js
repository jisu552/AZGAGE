import { Container,Row,Col, Button } from "react-bootstrap";
import Paginated from "../components/Paginated";
import "../css/board.css"
import Camodal from "../components/Camodal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Axios"



function Board() {
  const [showModal, setShowModal] = useState(false);
  const [board, setBoard] = useState([])
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(false)
 

  function qdd(){
    setShowModal(true);

  }

  const handleCloseModal = () => {
    setShowModal(false); 
  };

    useEffect(()=>{
      //로그인 상태 확인
      const login = sessionStorage.getItem("userId");
    
      if(login){
        setIsLogin(true)
      }

      axios.post('/question/search')
      .then(response => {
        console.log('문제가 보입니다!!', response.data.board);
        setBoard(response.data.board)
        
      })
      .catch(error => {
        console.error('문제 보이기 실패:', error);
        alert('문제 보이기 중 오류가 발생했습니다.');
      });
    },[showModal,isLogin])

  const handlePostClick = (board_idx)=>{
    console.log(board_idx);
    nav(`/question/${board_idx}`)
  }
  return (
    <Container>
        <Row className="my-3"> 
            <Col className="jusify-content-left">
                <h3 className="title">유저 문제</h3>
            </Col>
        </Row>
        <Row className="my-5">
            <Col>
                <Paginated
                      data={board.map((board, index) => ({
            index: index + 1,
            id: board.nickname,
            board_title: board.title,
            idx: board.board_idx,
          }))}
          columns={[
            { accessor: "index" },
            {
              accessor: "board_title",
              Header: "문제",
              width: "40%",
              Cell:({row}) => (
              <span onClick={()=>handlePostClick(row.original.idx)}> {row.original.board_title} </span>
              )
            },
            { accessor: "id", Header: "작성자" },
            // { accessor: "region", Header: "조회" },
          ]}
          
                />
            </Col>
        </Row>
        <Row>
          <Col>
          {isLogin&&(
            <Button className='abtnb' onClick={qdd}>출제하기</Button>
          )}
          </Col>
        </Row>
        <Camodal
        className=""
        show={showModal}
        handleClose={handleCloseModal}

      />
    </Container>
  );
}

export default  Board;