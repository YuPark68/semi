import React, { useState, useEffect } from 'react';
import '../css/styles.css'; // CSS 파일 불러오기

// 음식점 종류를 필터링하는 컴포넌트
function Filter({ selectedTypes, onTypeChange }) {
  // 사용 가능한 음식점 종류 목록
  const types = [
    "경양식", "기타", "김밥(도시락)", "까페", "냉면집", "분식", 
    "식육(숯불구이)",  "일식", 
    "정종/대포집/소주방", "중국식", "치킨",  
    "패스트푸드", "한식", "횟집"
  ];

  // "전체" 버튼의 상태를 관리하기 위한 상태 변수
  const [isSelectAllDisabled, setIsSelectAllDisabled] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true); // 초기 로드 상태 변수

  useEffect(() => {
    if (initialLoad) {
      // 초기 로드 시 "전체"가 선택된 상태로 설정
      onTypeChange([]);
      setInitialLoad(false);
    } else {
      // 체크박스 상태에 따라 "전체" 버튼 활성화/비활성화 결정
      if (selectedTypes.length === 0) {
        setIsSelectAllDisabled(true);
      } else if (selectedTypes.length === types.length) {
        onTypeChange([]);
        setIsSelectAllDisabled(true);
      } else {
        setIsSelectAllDisabled(false);
      }
    }
  }, [selectedTypes, types.length, onTypeChange, initialLoad]);

  // 음식점 종류가 변경될 때 호출되는 함수
  const handleTypeChange = (type) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type) // 선택 해제
      : [...selectedTypes, type]; // 선택
    onTypeChange(newSelectedTypes);
  };

  // "전체" 버튼 클릭 시 호출되는 함수
  const handleSelectAllClick = () => {
    onTypeChange([]);
  };

  // 컴포넌트 렌더링
  return (
    <div>
      <button
        className={`filter-button ${selectedTypes.length === 0 ? 'selected' : ''}`}
        onClick={handleSelectAllClick}
        disabled={isSelectAllDisabled}
      >
        전체
      </button>
      {types.map((type, index) => (
        <button
          key={index}
          className={`filter-button ${selectedTypes.includes(type) ? 'selected' : ''}`}
          onClick={() => handleTypeChange(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default Filter; // 컴포넌트 내보내기
