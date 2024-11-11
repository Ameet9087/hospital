/* Ajhar Tamboli bloodIssue.jsx 19-09-24 */


import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
// import "../BloodRequest/bloodIssue.css"
import "../BloodIssue/bloodIssue.css"
import { useReactToPrint } from 'react-to-print';

function BloodIssue() {
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
      ['Issue ID', ' Patient ID', 'Blood Request ID','Blood Group', 'Units Issed', 'Issue Date', 'Blood Bank ID', 'Doctor ID', 'Issued By','Status', ],
      ...stockData.map(item => [
        item.issueID, 
        item.patientID, 
        item.bloodRequestID,
        item.bloodGroup,
        item.unitsIssed,
        item.issueDate,
        item.bloodBankID,
        item.doctorID, 
        item.issuedBy, 
        item.status,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Requisition_Dispatch_Report.xlsx');
  };

  return (
    <div className="bloodIssue-active-imaging-request">
      <header className='bloodIssue-header'>
        <div className="bloodIssue-status-filters">
          <h4><i className="fa-solid fa-star-of-life"></i>Blood Issue :</h4>
        </div>
      </header>
      <div className="bloodIssue-controls">
      <div className="bloodIssue-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>

    </div>

        <div className="bloodIssue-filter">
          <button className='bloodIssue-print-btn' onClick={() => { /* Handle report generation */ }}>
            Show Report
          </button>
        </div>
      </div>
      <div className="bloodIssue-search-N-results">
        <div className="bloodIssue-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="bloodIssue-results-info">
          Showing {stockData.length} results
          <button className='bloodIssue-print-btn' onClick={handleExportToExcel}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className='bloodIssue-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <h2>Blood Request :</h2>
          <p>Printed On: {new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Issue ID</th>
                <th> Patient ID</th>
                <th>Blood Request ID</th>
                <th>Blood Group</th>
                <th>Units Issed</th>
                <th>Issue Date</th>
                <th>Blood Bank ID</th>
                <th>Doctor ID</th>
                <th>Issued By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr key={index}>
                  <td>{item.issueID}</td>
                  <td>{item.patientID}</td>
                  <td>{item.bloodRequestID}</td>
                  <td>{item.bloodGroup}</td>
                  <td>{item.unitsIssed}</td>
                  <td>{item.issueDate}</td>
                  <td>{item.bloodBankID}</td>
                  <td>{item.doctorID}</td>
                  <td>{item.issuedBy}</td>
                  <td>{item.status}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bloodIssue-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Issue ID</th>
              <th> Patient ID</th>
              <th>Blood Request ID</th>
              <th>Blood Group</th>
              <th>Units Issed</th>
              <th>Issue Date</th>
              <th>Blood Bank ID</th>
              <th>Doctor ID</th>
              <th>Issued By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item, index) => (
              <tr key={index}>
                <td>{item.issueID}</td>
                <td>{item.patientID}</td>
                <td>{item.bloodRequestID}</td>
                <td>{item.bloodGroup}</td>
                <td>{item.unitsIssed}</td>
                <td>{item.issueDate}</td>
                <td>{item.bloodBankID}</td>
                <td>{item.doctorID}</td>
                <td>{item.issuedBy}</td>
                <td>{item.status}</td>
       
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="bloodIssue-pagination">
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

export default BloodIssue;
