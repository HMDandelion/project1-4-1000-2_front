import React from 'react';

const ArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 16 16"  // 여백을 줄이기 위해 viewBox 조정
        stroke="currentColor"
        width="10px"  // 원하는 크기로 설정
        height="10px"  // 원하는 크기로 설정
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 2l6 6-6 6"  // 좌표를 조정하여 화살표의 크기와 위치를 조정
        />
    </svg>
);

export const TripleArrowIcon = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <ArrowIcon   />
        <ArrowIcon style={{ marginLeft: '1px' }} />
        <ArrowIcon style={{ marginLeft: '1px' }} />
    </div>
);

export default ArrowIcon;