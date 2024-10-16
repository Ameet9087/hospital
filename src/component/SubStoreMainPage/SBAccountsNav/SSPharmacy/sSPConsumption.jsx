/* Ajhar tamboli sSPConsumption.jsx 19-09-24 */


import React, { useEffect, useRef, useState } from 'react';
import "../SSPharmacy/sSPConsumption.css";
import { useParams } from 'react-router-dom';
import SSPConsumInternalConsum from './sSPConsumInternalConsum';
import { API_BASE_URL } from '../../../api/api';
import InternalConsumptionDetails from './InternalConsumptionDetails';
import { startResizing } from '../../../TableHeadingResizing/resizableColumns';

function SSPConsumption() {
  const { store } = useParams();
  const [consumptions, setConsumptions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDetailOpen,setIsDetailOpen] = useState(false); 
  const [product,setProduct] =useState({});
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle the popup open/close state
  };
  const handlePopupToggleView=(product)=>{
    setProduct(product);
    setIsDetailOpen(!isDetailOpen);
  }

  useEffect(() => {
    fetch(`${API_BASE_URL}/internal-consumption/getAll`)
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(item => item.storeName === store);
        setConsumptions(filteredData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [store,isPopupOpen]);

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
       {isDetailOpen && (
        <div className="sSPConsumption-popup-overlay">
          <div className="sSPConsumption-popup-content">
            <InternalConsumptionDetails product={product}  onClose={handlePopupToggleView}/>
            <button className="sSPConsumption-popup-close-button" onClick={handlePopupToggleView}>X</button>
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


        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                 'Consumed Date',
                 'SubStore Name',
                 'Consumed By',
                 'Remark',
                 'Action'
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        <tbody>
          {consumptions?.map((consumption) => (
            <tr key={consumption?.id}>
              <td>{consumption?.consumedDate}</td>
              <td>{consumption?.storeName}</td>
              <td>{consumption?.consumedBy}</td>
              <td>{consumption?.remark}</td>
              <td>
                <button className="sSPConsumption-btn-view" onClick={()=>handlePopupToggleView(consumption)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}

export default SSPConsumption;
