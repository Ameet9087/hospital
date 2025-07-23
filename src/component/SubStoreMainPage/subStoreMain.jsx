import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../SubStoreMainPage/subStoreMain.css";
import { API_BASE_URL } from '../api/api';

function SubStoreMain() {
  const navigate = useNavigate();
  const [substores, setSubstores] = useState([]);

  // Fetch substores from the API
  useEffect(() => {
    axios.get(`${API_BASE_URL}/substores/get-all-substores`)
      .then((response) => {
        setSubstores(response.data);
      })
      .catch((error) => {
        console.error('Error fetching substores:', error);
      });
  }, []);

  // Navigate to the next page with the subStoreId
  const handleClick = (store) => {
    if (store) {
      navigate(`/substore/pharmacy/${store}`);  // Navigating with the store name
    } else {
      navigate(`/substore/inventory/${store}`);  // Navigate to a different page based on store
    }
  };
  return (
    <div className="subStoreMain-div">
      <h6 className="subStoreMain-title">
        <i className="fa-solid fa-star-of-life"></i> Select your Substore
      </h6>
      <div className="subStoreMain-grid">
        {substores.map((store) => (
          <div
            key={store.subStoreId}
            className="subStoreMain-card"
            onClick={() => handleClick(store.subStoreId)}
          >
            <div className="subStoreMain-icon"><i className="fa-solid fa-cart-shopping"></i></div>
            <div className="subStoreMain-info">
              <div className="subStoreMain-name">{store.subStoreName}</div>
              <div className="subStoreMain-type">{store.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubStoreMain;
