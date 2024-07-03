import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantList from './RestaurantList';
import '../css/styles.css';

const { kakao } = window;

export default function KakaoMap({ data, selectedAddress, selectedTypes, onReset }) {
  const [radius, setRadius] = useState(3000);
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const navigate = useNavigate();

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const addressMarkerRef = useRef(null);
  const circleRef = useRef(null);
  const openInfowindowRef = useRef(null);

  useEffect(() => {
    if (!data) {
      return;
    }

    const centerCoords = new kakao.maps.LatLng(36.060417, 128.033972);
    const mapOption = {
      center: centerCoords,
      level: 13
    };

    if (!mapRef.current) {
      mapRef.current = new kakao.maps.Map(mapContainerRef.current, mapOption);
      const zoomControl = new kakao.maps.ZoomControl();
      mapRef.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      kakao.maps.event.addListener(mapRef.current, 'click', function() {
        markersRef.current.forEach(markerObj => {
          markerObj.infowindow.close();
        });
        if (openInfowindowRef.current) {
          openInfowindowRef.current.close();
        }
      });
      kakao.maps.event.addListener(mapRef.current, 'zoom_changed', function() {
        updateMarkers();
      });
    }

    function updateMarkers() {
      const level = mapRef.current.getLevel();
      const { src, size } = getImageProps(level);

      markersRef.current.forEach(markerObj => {
        const markerImage = new kakao.maps.MarkerImage(src, size);
        markerObj.marker.setImage(markerImage);
      });
    }

    function getImageProps(level) {
      if (level <= 10) {
        return {
          src: "/images/marker/markerStar.png",
          size: new kakao.maps.Size(24, 35)
        };
      } else {
        return {
          src: "/images/marker/markertest.png",
          size: new kakao.maps.Size(3, 3)
        };
      }
    }

    function createMarker(position) {
      const { src, size } = getImageProps(mapRef.current.getLevel());
      const markerImage = new kakao.maps.MarkerImage(src, size);
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: position.latlng,
        title: position.res_name,
        image: markerImage,
        clickable: true
      });

      const infowindowContent = document.createElement('div');
      infowindowContent.className = 'infowindow';
      infowindowContent.innerHTML = `
        <h4>${position.res_name}</h4>
        <p>${position.tell}</p>
        <p>${position.address1}</p>
        <p>카테고리: ${position.type}</p>
      `;

      const link = document.createElement('a');
      link.href = "#";
      link.innerText = "상세정보";
      link.onclick = (e) => {
        e.preventDefault();
        navigate(`/restaurant/${position.res_num}`);
      };
      infowindowContent.appendChild(link);

      const infowindow = new kakao.maps.InfoWindow({
        content: infowindowContent
      });

      kakao.maps.event.addListener(marker, 'click', function() {
        markersRef.current.forEach(markerObj => {
          markerObj.infowindow.close();
        });
        if (openInfowindowRef.current) {
          openInfowindowRef.current.close();
        }
        infowindow.open(mapRef.current, marker);
        openInfowindowRef.current = infowindow;
      });

      markersRef.current.push({ marker, infowindow, ...position });
      return { marker, infowindow, ...position };
    }

    if (data) {
      markersRef.current.forEach(markerObj => {
        markerObj.marker.setMap(null);
      });
      markersRef.current = [];

      const positions = data.map(item => ({
        res_num: item.res_num,
        res_name: item.res_name,
        license_date: item.license_date,
        tell: item.tell,
        address1: item.address1,
        address2: item.address2,
        zipcode: item.zipcode,
        type: item.type,
        lon: item.lon,
        lat: item.lat,
        menu: item.menu,
        info: item.info,
        img: item.img,
        latlng: new kakao.maps.LatLng(item.lat, item.lon),
      }));

      console.log("positions:", positions); // 데이터 확인용

      const createdMarkers = positions.map(position => {
        if (selectedTypes.length === 0 || selectedTypes.includes(position.type)) {
          return createMarker(position);
        }
        return null;
      }).filter(marker => marker !== null);

      setNearbyMarkers(createdMarkers);
      setFilteredMarkers(createdMarkers);
    }

    if (selectedAddress) {
      markersRef.current.forEach(markerObj => {
        markerObj.infowindow.close();
      });
      if (openInfowindowRef.current) {
        openInfowindowRef.current.close();
      }

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(selectedAddress.roadAddress, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          if (addressMarkerRef.current) {
            addressMarkerRef.current.setMap(null);
          }
          const marker = new kakao.maps.Marker({
            map: mapRef.current,
            position: coords,
            clickable: true
          });
          mapRef.current.setLevel(7);
          mapRef.current.setCenter(coords);
          addressMarkerRef.current = marker;

          if (circleRef.current) {
            circleRef.current.setMap(null);
          }
          drawCircle(coords, radius);

          const nearbyMarkers = markersRef.current.filter(markerObj => {
            const distance = calculateDistance(coords.getLat(), coords.getLng(), markerObj.marker.getPosition().getLat(), markerObj.marker.getPosition().getLng());
            return distance <= radius / 1000;
          });

          setNearbyMarkers(nearbyMarkers);
          setFilteredMarkers(nearbyMarkers);
        }
      });
    }

    function drawCircle(centerCoords, radius) {
      const circle = new kakao.maps.Circle({
        center: centerCoords,
        radius: radius,
        strokeWeight: 1,
        strokeColor: '#00a0e9',
        strokeOpacity: 0.5,
        fillColor: '#00a0e9',
        fillOpacity: 0.3
      });
      circle.setMap(mapRef.current);
      circleRef.current = circle;
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    }

  }, [data, selectedAddress, radius, selectedTypes]);

  const moveToLocation = (position, infowindow) => {
    if (openInfowindowRef.current) {
      openInfowindowRef.current.close();
    }
    mapRef.current.setLevel(7);
    mapRef.current.setCenter(position);
    infowindow.open(mapRef.current, new kakao.maps.Marker({ position }));
    openInfowindowRef.current = infowindow;
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredMarkers(nearbyMarkers);
    } else {
      const filtered = nearbyMarkers.filter(markerObj => {
        if (markerObj.res_name) {
          return markerObj.res_name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
      setFilteredMarkers(filtered);
    }
  };

  const handleReset = () => {
    if (addressMarkerRef.current) {
      addressMarkerRef.current.setMap(null);
      addressMarkerRef.current = null;
    }
    if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }
    markersRef.current.forEach(markerObj => {
      markerObj.infowindow.close();
    });
    setNearbyMarkers([]);
    setFilteredMarkers(markersRef.current);
  };

  useEffect(() => {
    if (selectedAddress === null) {
      handleReset();
    }
  }, [selectedAddress]);

  return (
    <>
      <div className="kakao-map-container">
        <div id="map" ref={mapContainerRef}></div>
      </div>

      <div className="controls-container">
        
        <div>
          <input 
            type="text" 
            placeholder="음식점 검색" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>검색</button>
          </div>
          
        
        <div>
          <label>반경 선택: </label>
          <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
            <option value={3000}>3km</option>
            <option value={5000}>5km</option>
            <option value={10000}>10km</option>
          </select>
          </div>
        
      </div>
      
      <RestaurantList markers={filteredMarkers} onMoveToLocation={moveToLocation} />
    </>
  );
}
