// QnA.js
import React from 'react';
import { Link } from 'react-router-dom';
import './QnA.css';

const QnA = () => {
  return (
    <div className="qna-container">
      <h1 className="qna-title">Q&A</h1>
      <div className="qna-list">
        {/* 각 항목에 Link 컴포넌트를 사용하여 클릭 시 특정 경로로 이동하도록 설정합니다. */}
        <div className="qna-item">
          <Link to="/detail/1">
            <input className="qna-input" type="text" placeholder="title" readOnly />
            <span className="qna-time">23.12.23</span>
          </Link>
        </div>
        <div className="qna-item">
          <Link to="/detail/2">
            <input className="qna-input" type="text" placeholder="title" readOnly />
            <span className="qna-time">24.01.01</span>
          </Link>
        </div>
        <div className="qna-item">
          <Link to="/detail/3">
            <input className="qna-input" type="text" placeholder="title" readOnly />
            <span className="qna-time">24.01.05</span>
          </Link>
        </div>
        <div className="qna-item">
          <Link to="/detail/4">
            <input className="qna-input" type="text" placeholder="title" readOnly />
            <span className="qna-time">24.02.12</span>
          </Link>
        </div>
      </div>
      {/* 버튼을 클릭하면 메인 화면으로 이동하도록 Link 컴포넌트를 사용합니다. */}
      <Link to="/">
        <button className="qna-button">메인화면으로</button>
      </Link>
    </div>
  );
};

export default QnA;
