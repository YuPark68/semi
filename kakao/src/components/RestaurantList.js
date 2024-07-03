import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import '../css/styles.css';

function RestaurantList({ markers, onMoveToLocation }) {
  const [displayCount, setDisplayCount] = useState(20);
  const groupedMarkers = groupMarkers(markers, 3); // 한 행에 3개의 항목으로 그룹화
  const displayedGroups = groupedMarkers.slice(0, Math.ceil(displayCount / 3));
  const navigate = useNavigate();

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 20);
  };

  const Row = ({ index, style }) => {
    const group = displayedGroups[index];
    return (
      <div className="row" style={style} key={index}>
        {group.map((markerObj, i) => (
          <div className="restaurant-item" key={i}>
            {markerObj.img && <img src={markerObj.img} alt={markerObj.title} className="restaurant-img" />}
            <div className="restaurant-details">
              <h4>{markerObj.res_name}</h4>
              <p>{markerObj.tell}</p>
              <p>{markerObj.address1}</p>
              <p>카테고리 : {markerObj.type}</p>
              <button onClick={() => {console.log(markerObj);onMoveToLocation(markerObj.marker.getPosition(), markerObj.infowindow);}}>위치</button>
              <button onClick={() => navigate(`/restaurant/${markerObj.res_num}`)}>상세정보</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="restaurant-list-container">
      <List
        className="restaurant-list"
        height={600}
        itemCount={displayedGroups.length}
        itemSize={430}  // 행의 높이를 조정합니다.
        width="100%"    // 리스트의 넓이를 컨테이너 전체로 설정합니다.
      >
        {Row}
      </List>
      {displayCount < markers.length && (
        <button className="load-more-button" onClick={handleLoadMore}>더보기</button>
      )}
    </div>
  );
}

function groupMarkers(markers, groupSize) {
  const groups = [];
  for (let i = 0; i < markers.length; i += groupSize) {
    groups.push(markers.slice(i, i + groupSize));
  }
  return groups;
}

export default RestaurantList;
