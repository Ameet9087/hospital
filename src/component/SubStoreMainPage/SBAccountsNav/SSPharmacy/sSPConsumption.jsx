/* Ajhar tamboli sSPConsumption.jsx 19-09-24 */


import React, { useEffect, useState } from 'react';
import "../SSPharmacy/sSPConsumption.css";
import { useParams } from 'react-router-dom';
import SSPConsumInternalConsum from './sSPConsumInternalConsum';
import { API_BASE_URL } from '../../../api/api';

function SSPConsumption() {
  const { store } = useParams();
  const [consumptions, setConsumptions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle the popup open/close state
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/internal-consumption/getAll`)
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(item => item.storeName === store);
        setConsumptions(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [store]);

  return (
    <div className="sSPConsumption-container">
      <button className="sSPConsumption-create-requisition" onClick={handlePopupToggle}>
        <i className="fa-solid fa-plus"></i> Internal Consumption
      </button>
      
      {/* Show the popup if isPopupOpen is true */}
      {isPopupOpen && (
        <div className="sSPConsumption-popup-overlay">
          <div className="sSPConsumption-popup-content">
            <SSPConsumInternalConsum  onClose={handlePopupToggle}/>
            <button className="sSPConsumption-popup-close-button" onClick={handlePopupToggle}>X</button>
          </div>
        </div>
      )}
      
      
      

      <div className="sSPConsumption-search-N-results">
          <div className="sSPConsumption-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSPConsumption-results-info">
        <span>Showing {consumptions.length} / {consumptions.length} results</span>
            {/* Showing 2 / 2 results */}
            <button className='sSPConsumption-print-btn' 
            // onClick={handleExportToExcel}
            >
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSPConsumption-print-btn' 
            // onClick={handlePrint}
            ><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>

      <table>
        <thead>
          <tr>
            <th>Consumed Date</th>
            <th>SubStore Name</th>
            <th>Consumed By</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {consumptions.map((consumption) => (
            <tr key={consumption.id}>
              <td>{new Date(consumption.consumedDate).toLocaleString()}</td>
              <td>{consumption.itemName}</td>
              <td>{consumption.consumedBy}</td>
              <td>{consumption.remark}</td>
              <td>
                <button className="btn-view">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="sSPConsumption-pagination">
        <span>1 to {consumptions.length} of {consumptions.length}</span>
        <button disabled>First</button>
        <button disabled>Previous</button>
        <button className="active">Page 1 of 1</button>
        <button disabled>Next</button>
        <button disabled>Last</button>
      </div> */}
    </div>
  );
}

export default SSPConsumption;
