import React, { useState, useEffect } from 'react';
import '../css/styles.css'; // CSS 파일 불러오기

const AddressSearch = ({ initialAddress, onAddressSelect, onCancel }) => {
  const [zonecode, setZonecode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');

  useEffect(() => {
    if (initialAddress) {
      setRoadAddress(initialAddress.roadAddress || '');
      setJibunAddress(initialAddress.jibunAddress || '');
      setZonecode(initialAddress.zonecode || '');
    }
  }, [initialAddress]);

  const handleClick = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        const roadAddr = data.roadAddress;
        let extraRoadAddr = '';

        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }

        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }

        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }

        setZonecode(data.zonecode);
        setRoadAddress(roadAddr);
        setJibunAddress(data.jibunAddress);

        onAddressSelect({
          zonecode: data.zonecode,
          roadAddress: roadAddr,
          jibunAddress: data.jibunAddress
        });
      }
    }).open();
  };

  const handleCancel = () => {
    setZonecode('');
    setRoadAddress('');
    setJibunAddress('');
    onCancel();
  };

  return (
    <div className='address_search_container'>
      <input className="address_button" type="button" onClick={handleClick} value="주소 입력" />
      <input id="address_input" type="text" value={roadAddress} placeholder="주소를 입력하시면 해당 주소와 가까운 음식점을 확인할 수 있어요." disabled style={{ backgroundColor: '#f0f0f0' }} />
      <button className="address_button" onClick={handleCancel}>취소</button>
    </div>
  );
};

export default AddressSearch;
