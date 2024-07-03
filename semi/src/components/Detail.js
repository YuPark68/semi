// Detail.js
import React from 'react';

const Detail = ({ match }) => {
  // match.params.id를 통해 URL에서 전달된 ID 값을 가져옵니다.
  const { id } = match.params;

  return (
    <div>
      <h2>Detail Page</h2>
      <p>Detail ID: {id}</p>
      {/* 상세 페이지에 대한 내용을 표시할 수 있습니다. */}
    </div>
  );
};

export default Detail;
