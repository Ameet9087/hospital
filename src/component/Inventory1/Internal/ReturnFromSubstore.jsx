import React, { useRef, useState } from 'react';
import "./ReturnFromSubstore.css"; // Updated to match the provided file
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

const ReturnFromSubstore = () => {
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [dateFrom, setDateFrom] = useState('2024-08-07');
  const [dateTo, setDateTo] = useState('2024-08-07');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Implement search logic here
  };

  const handlePrint = () => {
    console.log('Printing...');
    // Implement print logic here
  };

  return (
    <div className="return-form-substore-content"> {/* Updated class name */}
      <div className="return-form-substore-date-range"> {/* Updated class name */}
        <div className='return-from-substore-container-left'>
        <label className='return-from-substore-label'>From: <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} /></label>
        <label className='return-from-substore-label'>To: <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} /></label>
        {/* <button className="requisition-inventory-star">☆</button> 
        <button className="requisition-inventory-minus">-</button> 
        <button className="requisition-inventory-ok">✓ OK</button> */}
        </div>
        <div className="return-from-substore-container-right">
      <label >Substore:</label>
      <select>
        <option value="">Select Substore</option>
      </select>
    </div>
      </div>
      
      <div className="return-from-substore-search-bar"> {/* Updated class name */}
        <div className='return-from-substore-container-left'>
        <input 
          type="text" 
          placeholder="Search" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <button onClick={handleSearch}>🔍</button> */}
        </div>
        <div className="return-from-substore-container-right"> {/* Updated class name */}
        <span className='requisition-inventory-results-span'>Showing 0 / 0 results</span>
        <button className='requisition-inventory-results-print' onClick={handlePrint}>Print</button>
      </div>
      </div>
   
      
      <div className="requisition-ta">
      <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                 "Returned Date",
                 "Returned By",
                 "Substore From",
                 "Status",
                 "Received By",
                 "Received Date",
                 "Remarks",
                 "Actions"
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
          <tr>
            <td  className='return-from-substore-no-row' colSpan="8">No Rows To Show</td>
          </tr>
        </tbody>
      </table>
      {/* <div className="requisition-inventory-requisition-pagination"> 
        <div className="requisition-inventory-requisition-pagination-div"> 
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default ReturnFromSubstore;
