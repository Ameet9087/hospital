/* Ajhar Tamboli sSPReportsReqDis.jsx 19-09-24 */


import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSPharmacy/sSPReportsReqDis.css";
import { useReactToPrint } from 'react-to-print';
import { API_BASE_URL } from '../../../api/api';

function SSPReportsReqDis() {
  const printRef = useRef();
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
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
    documentTitle: 'Requisition/Dispatch Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleExportToExcel = () => {
    const tableData = [
      ['Req.ID', 'Dis.ID', 'Requested Date', 'Dispatch Date', 'Item Name', 'Request Qty', 'Dispatch Qty', 'MRP', 'TotalAmt', 'Req.User', 'Dis.User', 'Received By'],
      ...stockData.map(item => [
        item.reqId, // Assuming reqId is the field for request ID
        item.disId, // Assuming disId is the field for dispatch ID
        item.requestedDate,
        item.dispatchDate,
        item.itemName,
        item.requestingQuantity,
        item.dispatchQuantity, // Assuming dispatchQuantity is the field for dispatch quantity
        item.salePrice,
        item.totalAmount, // Assuming totalAmount is the field for total amount
        item.reqUser, // Assuming reqUser is the field for requested user
        item.disUser, // Assuming disUser is the field for dispatch user
        item.receivedBy, // Assuming receivedBy is the field for received by
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Requisition_Dispatch_Report.xlsx');
  };

  return (
    <div className="sSPReportsReqDis-active-imaging-request">
      <header className='sSPReportsReqDis-header'>
        <div className="sSPReportsReqDis-status-filters">
          <h4><i className="fa-solid fa-star-of-life"></i>Requisition/Dispatch Report</h4>
        </div>
      </header>
      <div className="sSPReportsReqDis-controls">
      <div className="sSPReportsReqDis-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>
      <button className="sSPReportsReqDis-star-button">☆</button>
    <button className="sSPReportsReqDis-more-btn">-</button>
      <button className="sSPReportsReqDis-ok-button">OK</button>
    </div>

        <div className="sSPReportsReqDis-filter">
          <button className='sSPReportsReqDis-print-btn' onClick={() => { /* Handle report generation */ }}>
            Show Report
          </button>
        </div>
      </div>
      <div className="sSPReportsReqDis-search-N-results">
        <div className="sSPReportsReqDis-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="sSPReportsReqDis-results-info">
          Showing {stockData.length} results
          <button className='sSPReportsReqDis-print-btn' onClick={handleExportToExcel}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className='sSPReportsReqDis-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <h2>Requisition/Dispatch Report</h2>
          <p>Printed On: {new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Req.ID</th>
                <th>Dis.ID</th>
                <th>Requested Date</th>
                <th>Dispatch Date</th>
                <th>Item Name</th>
                <th>Request Qty</th>
                <th>Dispatch Qty</th>
                <th>MRP</th>
                <th>TotalAmt</th>
                <th>Req.User</th>
                <th>Dis.User</th>
                <th>Received By</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr key={index}>
                  <td>{item.reqId}</td>
                  <td>{item.disId}</td>
                  <td>{item.requestedDate}</td>
                  <td>{item.dispatchDate}</td>
                  <td>{item.itemName}</td>
                  <td>{item.requestingQuantity}</td>
                  <td>{item.dispatchQuantity}</td>
                  <td>{item.salePrice}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.reqUser}</td>
                  <td>{item.disUser}</td>
                  <td>{item.receivedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sSPReportsReqDis-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Req.ID</th>
              <th>Dis.ID</th>
              <th>Requested Date</th>
              <th>Dispatch Date</th>
              <th>Item Name</th>
              <th>Request Qty</th>
              <th>Dispatch Qty</th>
              <th>MRP</th>
              <th>TotalAmt</th>
              <th>Req.User</th>
              <th>Dis.User</th>
              <th>Received By</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item, index) => (
              <tr key={index}>
                <td>{item.reqId}</td>
                <td>{item.disId}</td>
                <td>{item.requestedDate}</td>
                <td>{item.dispatchDate}</td>
                <td>{item.itemName}</td>
                <td>{item.requestingQuantity}</td>
                <td>{item.dispatchQuantity}</td>
                <td>{item.salePrice}</td>
                <td>{item.totalAmount}</td>
                <td>{item.reqUser}</td>
                <td>{item.disUser}</td>
                <td>{item.receivedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="sSPReportsReqDis-pagination">
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

export default SSPReportsReqDis;
