import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FileRead from './components/FileRead';
import AddressSearch from './components/AddressSearch';
import KakaoMap from './components/KakaoMap';
import Filter from './components/Filter';
import Notice from './components/Notice';
import QnA from './components/QnA';
import Introduction from './components/Introduction';
import Guide from './components/Guide';
import RestaurantDetails from './components/RestaurantDetails'; // 상세 정보 컴포넌트 불러오기
import './css/styles.css'; // CSS 파일 불러오기

function App() {
  const [data, setData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]); // State for selected types

  const handleTypeChange = (newSelectedTypes) => {
    setSelectedTypes(newSelectedTypes);
  };

  const handleReset = () => {
    setSelectedAddress(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/notice">공지사항</Link></li>
            <li><Link to="/qna">QnA</Link></li>
            <li><Link to="/introduction">소개</Link></li>
            <li><Link to="/guide">이용안내</Link></li>
          </ul>
        </nav>
        <hr />
        <div className="container">
          <Routes>
            <Route path="/" element={
              <div className="App">
                <div className="main-content">
                  <div className="form-container">
                    <AddressSearch initialAddress={selectedAddress} onAddressSelect={setSelectedAddress} onCancel={handleReset} />
                    <FileRead onDataLoad={setData} />
                    <Filter selectedTypes={selectedTypes} onTypeChange={handleTypeChange} />
                  </div>
                  <div className="map-container">
                    <KakaoMap
                      data={data}
                      selectedAddress={selectedAddress}
                      selectedTypes={selectedTypes}
                      onReset={handleReset}
                    />
                  </div>
                </div>
              </div>
            } />
            <Route path="/notice" element={<Notice />} />
            <Route path="/qna" element={<QnA />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails data={data} />} /> {/* 상세 정보 경로 추가 */}
          </Routes>
        </div>
        <hr />
      </div>
    </Router>
  );
}

export default App;
