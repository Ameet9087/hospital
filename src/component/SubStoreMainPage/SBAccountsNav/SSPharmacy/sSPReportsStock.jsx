/* Ajhar Tamboli sSPReportsStock.jsx 19-09-24 */


import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSPharmacy/sSPReportsStock.css";
import { useReactToPrint } from 'react-to-print';
import { API_BASE_URL } from '../../../api/api';

function SSPReportsStock() {
  const printRef = useRef();
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/pharmacyRequisitions/getAll`);
      
      // Check if the response is ok (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Fetched data:', data); // Log the data for debugging
  
      // Ensure 'store' is defined and valid
      const store = 'Accounts'; // Replace with your store value or dynamically determine it
      const filteredData = data.filter(item => item.storeName === store);
  
      setStockData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock data:', error); // Log the error for debugging
      setError(error.message);
      setLoading(false);
    }
  };
  

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Stock Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleExportToExcel = () => {
    const tableData = [
      ['Generic Name', 'Item Name', 'Batch No.', 'Quantity', 'Expiry Date', 'MRP'],
      ...stockData.map(item => [
        item.genericName,
        item.itemName,
        item.batchNo,
        item.requestingQuantity,
        item.expiryDate,
        item.salePrice,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Stock_Report.xlsx');
  };

  return (
    <div className="sSPReportsStock-active-imaging-request">
      <header className='sSPReportsStock-header'>
        <div className="sSPReportsStock-status-filters">
          <h4><i className="fa-solid fa-star-of-life"></i>Stock Report</h4>
        </div>
      </header>
      <div className="sSPReportsStock-controls">
        <div className="sSPReportsStock-filter">
          <div className="sSPReportsStock-filterBySubCategory">
            <label>Select Item:</label>
            <select>
              <option value="">Select Item</option>
              {/* Add options dynamically from stockData */}
            </select>
          </div>
          <button className='sSPReportsStock-print-btn'>
            <i className="fa-solid fa-magnifying-glass"></i> Show Report
          </button>
        </div>
      </div>
      <div className="sSPReportsStock-search-N-results">
        <div className="sSPReportsStock-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="sSPReportsStock-results-info">
          Showing {stockData.length} results
          <button className='sSPReportsStock-print-btn' onClick={handleExportToExcel}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className='sSPReportsStock-print-btn' onClick={handlePrint}>Print</button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <h2>Transfer Report</h2>
          <p>Printed On: {new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Generic Name</th>
                <th>Item Name</th>
                <th>Batch No.</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
                <th>MRP</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr key={index}>
                  <td>{item.genericName}</td>
                  <td>{item.itemName}</td>
                  <td>{item.batchNo}</td>
                  <td>{item.requestingQuantity}</td>
                  <td>{item.expiryDate}</td>
                  <td>{item.salePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sSPReportsStock-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Generic Name</th>
              <th>Item Name</th>
              <th>Batch No.</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>MRP</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item, index) => (
              <tr key={index}>
                <td>{item.genericName}</td>
                <td>{item.itemName}</td>
                <td>{item.batchNo}</td>
                <td>{item.requestingQuantity}</td>
                <td>{item.expiryDate}</td>
                <td>{item.salePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="sSPReportsStock-pagination">
          <span>0 to {stockData.length} of {stockData.length}</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 1 of 1</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>
    </div>
  );
}

export default SSPReportsStock;
