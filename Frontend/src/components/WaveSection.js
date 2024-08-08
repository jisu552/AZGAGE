import React from 'react';
import '../css/WaveSection.css'; // CSS 파일을 가져오는 예시

const WaveSection = () => (
  <svg
    className="hero-waves Bsection2"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
  >
    <defs>
      <path
        id="wave-path"
        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
      />
    </defs>
    <g className="wave1">
      <use xlinkHref="#wave-path" x="100" y="3" fill="rgb(246, 235, 121)" />
    </g>
    <g className="wave2">
      <use xlinkHref="#wave-path" x="100" y="0" fill="rgb(246, 235, 121)" />
    </g>
    <g className="wave3">
      <use xlinkHref="#wave-path" x="100" y="9" fill="rgb(246, 235, 121)" />
    </g>
  </svg>
);

export default WaveSection;
