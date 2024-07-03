import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QnA.css';

const QnA = () => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="qna-container">
      <h1 className="qna-title">Q&A</h1>
      <div className="qna-list">
        <div className="qna-item" onClick={() => handleItemClick(1)}>
          <input className="qna-input" type="text" placeholder="title" readOnly />
          <span className="qna-time">23.12.23</span>
        </div>
        <div className="qna-item" onClick={() => handleItemClick(2)}>
          <input className="qna-input" type="text" placeholder="title" readOnly />
          <span className="qna-time">24.01.01</span>
        </div>
        <div className="qna-item" onClick={() => handleItemClick(3)}>
          <input className="qna-input" type="text" placeholder="title" readOnly />
          <span className="qna-time">24.01.05</span>
        </div>
        <div className="qna-item" onClick={() => handleItemClick(4)}>
          <input className="qna-input" type="text" placeholder="title" readOnly />
          <span className="qna-time">24.02.12</span>
        </div>
      </div>
      <button className="qna-button">메인화면으로</button>
    </div>
  );
};

export default QnA;
