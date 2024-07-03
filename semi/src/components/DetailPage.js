import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  return (
    <div className="detail-container">
      <h1 className="detail-title">Detail Page</h1>
      <div className="detail-section">
        <h2 className="detail-subtitle">Question</h2>
        <p className="detail-content">This is the question for item {id}.</p>
      </div>
      <div className="detail-section">
        <h2 className="detail-subtitle">Answer</h2>
        <p className="detail-content">This is the answer for item {id}.</p>
      </div>
      <button className="detail-button" onClick={goToMain}>메인화면으로</button>
    </div>
  );
};

export default DetailPage;
