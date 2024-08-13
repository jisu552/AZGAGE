import React, { useState } from 'react';
import styled from 'styled-components';

// 사용자 정보
const user = {
  id: 'han',
  chapter: 3,
};

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
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
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
  const [activeNodes, setActiveNodes] = useState([1]);

  const toggleNode = (id) => {
    if (id <= user.chapter) {
      setActiveNodes((prevActiveNodes) => {
        if (prevActiveNodes.includes(id)) {
          return prevActiveNodes.filter((nodeId) => nodeId !== id);
        } else {
          return [...prevActiveNodes, id];
        }
      });
    }
  };

  const isEdgeActive = (from, to) => {
    // 두 노드가 모두 활성화되었는지 확인
    return activeNodes.includes(from) && activeNodes.includes(to);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh' }}>
      <h1>난이도별 아재개그</h1>
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
              active={isEdgeActive(edge.from, edge.to)}
            />
          );
        })}
      </svg>
      {nodes.map((node) => (
        <Node
          key={node.id}
          x={node.x}
          y={node.y}
          active={node.id <= user.chapter}
          disabled={node.id > user.chapter}
          onClick={() => toggleNode(node.id)}
        >
          {node.id}
        </Node>
      ))}
    </div>
  );
};

export default Stage;