import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddressSearch from './AddressSearch';

function RestaurantDetails({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const restaurant = data.find(r => r.res_num === id);

  if (!restaurant) {
    return <div>레스토랑 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{restaurant.res_name}</h1>
      <img src={restaurant.img} alt={restaurant.res_name} />
      <p>전화번호: {restaurant.tell}</p>
      <p>주소: {restaurant.address1}</p>
      
      <p>우편 번호 : {restaurant.zipcode}</p>
      <p>종류: {restaurant.type}</p>
      <p>메뉴: {restaurant.menu}</p>
      <p>정보: {restaurant.info}</p>
      <p>위도: {restaurant.lon}</p>
      <p>경도: {restaurant.lat}</p>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}

export default RestaurantDetails;
