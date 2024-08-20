import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../Axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트

// 스타일드 컴포넌트
const Node = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? 'rgb(246, 235, 121)' : 'lightgray')};
  color: black;
  position: absolute;
  left: ${(props) => `calc(${props.x * 100}% - 60px)`};
  top: ${(props) => `calc(${props.y * 100}% - 60px)`};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')}; /* 활성화된 노드만 클릭 가능 */
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')}; /* 비활성화된 노드는 클릭 불가 */
  font-family: 'CookieRun-Regular';
`;

const Line = styled.line`
  stroke: ${(props) => (props.active ? 'yellow' : 'black')};
  stroke-width: 2;
`;

// 노드 위치 (반응형)
const nodes = [
  { id: 1, x: 0.2, y: 0.25 },
  { id: 2, x: 0.4, y: 0.26 },
  { id: 3, x: 0.6, y: 0.25 },
  { id: 4, x: 0.8, y: 0.4 },
  { id: 5, x: 0.6, y: 0.5 },
  { id: 6, x: 0.4, y: 0.55 },
  { id: 7, x: 0.2, y: 0.6 },
  { id: 8, x: 0.3, y: 0.75 },
  { id: 9, x: 0.5, y: 0.75 },
  { id: 10, x: 0.75, y: 0.75 },
];

// 노드 연결 (간선)
const edges = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 6, to: 5 },
  { from: 5, to: 4 },
  { from: 6, to: 7 },
  { from: 7, to: 8 },
  { from: 8, to: 9 },
  { from: 9, to: 10 },
];

const Stage = () => {
  const [chapter, setChapter] = useState(10); // 기본값을 10으로 설정
  const [activeNodes, setActiveNodes] = useState([]); // 활성화된 노드들
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchUserChapter = async () => {
      try {
        let userId = sessionStorage.getItem('userId');
        const response = await axios.post('/question/chapter', { userId });
        const userChapter = response.data.chapter;

        // 챕터에 따른 노드 활성화
        setChapter(userChapter); // 서버에서 받은 챕터를 상태로 설정
        setActiveNodes([...Array(userChapter).keys()].map(i => i + 1)); // 1부터 chapter까지 노드 활성화
      } catch (err) {
        console.log('챕터 불러오는 중 오류 발생');
        console.log(err);
      }
    };

    fetchUserChapter();
  }, []);

  const isEdgeActive = (from, to) => {
    // 간선이 연결된 두 노드가 모두 활성화되었고, 두 노드가 모두 챕터 이하인지 확인
    return activeNodes.includes(from) && activeNodes.includes(to) && from <= chapter && to <= chapter;
  };

  const handleNodeClick = (userChapter) => {
    if (!activeNodes.includes(userChapter)) return;
    
    try {
      navigate(`/stage/${userChapter}`); // 클릭된 노드의 ID에 따라 페이지 이동
    } catch (err) {
      console.log('페이지 이동 중 문제 발생');
      console.log(err);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh' }}>
      <h1 style={{ marginTop: '1%' }}>난이도별 아재개그</h1>
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        {edges.map((edge, index) => {
          const fromNode = nodes.find((node) => node.id === edge.from);
          const toNode = nodes.find((node) => node.id === edge.to);
          return (
            <Line
              key={index}
              x1={`calc(${fromNode.x * 100}%)`}
              y1={`calc(${fromNode.y * 100}%)`}
              x2={`calc(${toNode.x * 100}%)`}
              y2={`calc(${toNode.y * 100}%)`}
              active={isEdgeActive(edge.from, edge.to)}  // 노드들이 모두 활성화되고 챕터 이하일 경우 노란색으로 표시
            />
          );
        })}
      </svg>
      {nodes.map((node) => (
        <Node
          key={node.id}
          x={node.x}
          y={node.y}
          active={node.id <= chapter}  // 노드의 활성화 상태를 chapter 값에 따라 결정
          disabled={node.id > chapter}
          onClick={() => handleNodeClick(node.id)} // 클릭 가능 상태에 따라 이벤트 핸들러 설정
        >
          {node.id}
        </Node>
      ))}
    </div>
  );
};

export default Stage;