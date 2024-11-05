/* Ajhar Tamboli bloodReq.jsx 19-09-24 */


import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
// import "../BloodRequest/bloodReq.css"
import "../BloodRequest/bloodReq.css"
import { useReactToPrint } from 'react-to-print';

function BloodReq() {
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
      const response = await fetch('http://localhost:8080/api/......./getAll');
      
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
    documentTitle: 'Blood Request :',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleExportToExcel = () => {
    const tableData = [
      ['Req.ID', ' Patient Name', 'Required Units', 'Request Date', 'Required Date', 'Status', 'Hospital Name', 'Contact Information', 'Doctor Name', 'Blood Group'],
      ...stockData.map(item => [
        item.reqId, // Assuming reqId is the field for request ID
        item.patientName, 
        item.requiredUnits,
        item.requestedDate,
        item.requiredDate,
        item.status,
        item.hospitalName,
        item.contactInformation,
        item.doctorName, 
        item.bloodGroup, 
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Requisition_Dispatch_Report.xlsx');
  };

  return (
    <div className="bloodReq-active-imaging-request">
      <header className='bloodReq-header'>
        <div className="bloodReq-status-filters">
          <h4><i className="fa-solid fa-star-of-life"></i>Blood Request :</h4>
        </div>
      </header>
      <div className="bloodReq-controls">
      <div className="bloodReq-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>
     
    </div>

        <div className="bloodReq-filter">
          <button className='bloodReq-print-btn' onClick={() => { /* Handle report generation */ }}>
            Show Report
          </button>
        </div>
      </div>
      <div className="bloodReq-search-N-results">
        <div className="bloodReq-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="bloodReq-results-info">
          Showing {stockData.length} results
          <button className='bloodReq-print-btn' onClick={handleExportToExcel}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className='bloodReq-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <h2>Blood Request :</h2>
          <p>Printed On: {new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Req.ID</th>
                <th> Patient Name</th>
                <th>Required Units</th>
                <th>Request Date</th>
                <th>Required Date</th>
                <th>Status</th>
                <th>Hospital Name</th>
                <th>Contact Information</th>
                <th>Doctor Name</th>
                <th>Blood Group</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr key={index}>
                  <td>{item.reqId}</td>
                  <td>{item.patientName}</td>
                  <td>{item.requiredUnits}</td>
                  <td>{item.requestedDate}</td>
                  <td>{item.requiredDate}</td>
                  <td>{item.status}</td>
                  <td>{item.hospitalName}</td>
                  <td>{item.contactInformation}</td>
                  <td>{item.doctorName}</td>
                  <td>{item.bloodGroup}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bloodReq-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Req.ID</th>
              <th> Patient Name</th>
              <th>Required Units</th>
              <th>Request Date</th>
              <th>Required Date</th>
              <th>Status</th>
              <th>Hospital Name</th>
              <th>Contact Information</th>
              <th>Doctor Name</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item, index) => (
              <tr key={index}>
                <td>{item.reqId}</td>
                <td>{item.patientName}</td>
                <td>{item.requiredUnits}</td>
                <td>{item.requestedDate}</td>
                <td>{item.requiredDate}</td>
                <td>{item.status}</td>
                <td>{item.hospitalName}</td>
                <td>{item.contactInformation}</td>
                <td>{item.doctorName}</td>
                <td>{item.bloodGroup}</td>
       
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="bloodReq-pagination">
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

export default BloodReq;
