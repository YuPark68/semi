import React from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css'; // Make sure this matches the path where you save your CSS file

const Detail = () => {
  const { id } = useParams();

  return (
    <div className="detail-container">
      <h1 className="detail-title">Q&A</h1>
      <div className="qna-box">
        <h2>Q: 질문</h2>
        <p>여기에 질문 내용이 들어갑니다.</p>
      </div>
      <div className="qna-box">
        <h2>A: 답변</h2>
        <p>여기에 답변 내용이 들어갑니다.</p>
      </div>
    </div>
  );
};

export default Detail;

