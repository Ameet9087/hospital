import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import "../DisSales/dispenSales.css";
import SalesSales from './dispenSalesSales';
import { API_BASE_URL } from '../../api/api';

const DispenSales = () => {
  const [selectedCounter, setSelectedCounter] = useState(() => {
    // Load from localStorage
    return localStorage.getItem('selectedCounter') || null;
  });
  const [counterData, setCounterData] = useState(null); // Store API response

  // Handle counter selection
  const handleCounterClick = (counter) => {
    setSelectedCounter(counter);
    localStorage.setItem('selectedCounter', counter); // Save to localStorage
    sendCounterSelectionToAPI(counter); // Send to API
  };

  // Send selected counter to the backend API using Axios
  const sendCounterSelectionToAPI = async (counter) => {
    const now = new Date();
    const formattedDateTime = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const finalcounter = {
      counter: counter,
      entryTime: formattedDateTime,
    };
    console.log(finalcounter);

    try {
      const response = await axios.post(`${API_BASE_URL}/counter', finalcounter`);
      const { id } = response.data;
      setCounterData(response.data);

      // Save the ID in localStorage
      localStorage.setItem('counterId', id);
    } catch (error) {
      console.error('Error sending counter selection:', error);
    }
  };

  useEffect(() => {
    if (selectedCounter) {
      sendCounterSelectionToAPI(selectedCounter);
    }
  }, [selectedCounter]);

  return (
    <div>
      {selectedCounter && <SalesSales />}
      <div className="dispenSales-counter-selection">
        <h4><i className="fa-solid fa-cash-register"></i> Counter Selection</h4>
        <div className="dispenSales-counter-options">
          <div
            className={`dispenSales-counter-option ${selectedCounter === 'MORNING' ? 'active' : ''}`}
            onClick={() => handleCounterClick('MORNING')}
          >
            <div className="dispenSales-counter-Sub-option">
              <i className="fa-solid fa-cash-register"></i>
              <h3>MORNING COUNTER</h3>
            </div>
            <p>{selectedCounter === 'MORNING' ? 'This is active' : 'Click To Activate'}</p>
          </div>

          <div
            className={`dispenSales-counter-option ${selectedCounter === 'EVENING' ? 'active' : ''}`}
            onClick={() => handleCounterClick('EVENING')}
          >
            <div className="dispenSales-counter-Sub-option">
              <i className="fa-solid fa-cash-register"></i>
              <h3>EVENING COUNTER</h3>
            </div>
            <p>{selectedCounter === 'EVENING' ? 'This is active' : 'Click To Activate'}</p>
          </div>

          <div
            className={`dispenSales-counter-option ${selectedCounter === 'NIGHT' ? 'active' : ''}`}
            onClick={() => handleCounterClick('NIGHT')}
          >
            <div className="dispenSales-counter-Sub-option">
              <i className="fa-solid fa-cash-register"></i>
              <h3>NIGHT COUNTER</h3>
            </div>
            <p>{selectedCounter === 'NIGHT' ? 'This is active' : 'Click To Activate'}</p>
          </div>
        </div>
      </div>

      {/* {counterData && (
        <div className="counter-info">
          <h4>Counter Details</h4>
          <p><strong>ID:</strong> {counterData.id}</p>
          <p><strong>Counter:</strong> {counterData.counter}</p>
          <p><strong>Entry Time:</strong> {counterData.entryTime}</p>
          <p><strong>Logout Time:</strong> {counterData.logoutTime}</p>
        </div>
      )} */}
    </div>
  );
};

export default DispenSales;
