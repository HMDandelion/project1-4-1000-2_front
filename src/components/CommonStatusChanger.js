import React from 'react';

const CommonStatusChanger = ({ status, statusText, onStatusChange }) => {
    const handleStatusChange = () => {
        // 여기에서 새로운 상태를 설정하고 부모 컴포넌트에 전달할 수 있는 로직을 구현합니다.
        onStatusChange();
    };

    return (
        <div className="status-changer">
            <div className={status-container ${status === 'in_production' ? 'green' : 'red'}} onClick={handleStatusChange}>
                <div className="status-circle">{status === 'in_production' ? '✔' : '✘'}</div>
                <span className="status-text">{statusText}</span>
            </div>
        </div>
    );
};

export default CommonStatusChanger;