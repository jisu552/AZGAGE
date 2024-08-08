import { Container,Row,Col, Button } from "react-bootstrap";
import Paginated from "../components/Paginated";
import "../css/board.css"
import Camodal from "../components/Camodal";
import { useState } from "react";


function Board() {
  const [showModal, setShowModal] = useState(false);

  function qdd(){
    setShowModal(true);

  }

  const handleCloseModal = () => {
    setShowModal(false); 
  };
    let boards=[
        {index : 1,board_seq:1,id:1,board_title:1,region:1},
        {index : 1,board_seq:1,id:1,board_title:1,region:1},
        {index : 1,board_seq:1,id:1,board_title:'제목',region:1},

    ]

  return (
    <Container>
        <Row className="my-3"> 
            <Col className="jusify-content-left">
                <h3>게시판</h3>
            </Col>
        </Row>
        <Row className="my-5">
            <Col>
                <Paginated
                      data={boards.map((board, index) => ({
            index: index + 1,
            board_seq: board.board_seq,
            id: board.mem_id,
            board_title: board.board_title,
        
            region: board.board_seq,
          }))}
          columns={[
            { accessor: "index" },
            { accessor: "board_seq" },
            {
              accessor: "board_title",
              Header: "문제",
              width: "70%",
            },
            { accessor: "id", Header: "작성자" },
            { accessor: "region", Header: "조회" },
          ]}
          
                />
            </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={qdd}>출제하기</Button>
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