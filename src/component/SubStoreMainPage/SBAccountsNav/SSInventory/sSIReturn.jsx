/* Ajhar Tamboli sSIReturn.jsx 19-09-24 */


import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSInventory/sSIReturn.css";
import { useReactToPrint } from 'react-to-print';
import SSIRetunReturnItemBtn from './sSIRetunReturnItemBtn';
import SSIPatientConsumNewPCbtn from './sSIPatientConsumNewPCbtn';
import { API_BASE_URL } from '../../../api/api';
import CustomModal from '../../../CustomModel/CustomModal';

function SSIReturn() {
  const printRef = useRef();
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
  const [returns, setReturns] = useState([]);
  const [showNewPatientConsumption, setShowNewPatientConsumption] = useState(false); // State to control New Patient Consumption


  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };
  const handleNewPatientConsumptionClick = () => {
    setShowNewPatientConsumption(true); // Show the new patient consumption component
  };
  const handleBack = () => {
    setShowNewPatientConsumption(false); // Hide the new patient consumption component and go back to the main content
  };
  const closePopups = () => {
    setShowCreateRequisition(false);
    setShowViewRequisition(false);
    setShowNewPatientConsumption(false); // Hide the new patient consumption component

  };

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/inventory-return/getAll`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        
        // const filteredData = data.filter(item => item.storeName === store)
        setReturns(data); // Adjust based on your API response structure
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Retrun Item Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleViewClick = () => {
    setShowViewRequisition(true);
  };

  // Function to handle exporting the table to an Excel file
  const handleExportToExcel = () => {
    // Get the table data
    const tableData = [
      ['  Store Name',  ' Date', 'Returned By', 'Remarks', ]
      
    ];
    

    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Convert the workbook to an Excel file and trigger the download
    XLSX.writeFile(workbook, 'Retrun Item_Report.xlsx');
  };

  return (
    <div className="sSIReturn-active-imaging-request">
           
      <>
        <header className='sSIReturn-header'>
          <div className="sSIReturn-status-filters">
          <button className="sSIReturn-new-patient-button"
                          onClick={handleNewPatientConsumptionClick} // Handle button click
>Returns Item</button>
          </div>
          <div className="sSIReturn-filterBySubCategory">

<label>Select Inventory:</label>
    <select>
      <option value="">GENERAL-INVENTORY</option>
    
    </select>
</div>
        </header>
        <div className="sSIReturn-controls">

<div className="sSIReturn-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>
      <button className="sSIReturn-star-button">☆</button>
    <button className="sSIReturn-more-btn">-</button>
      <button className="sSIReturn-ok-button">OK</button>
    </div>
    </div>
        <div className="sSIReturn-search-N-results">
          <div className="sSIReturn-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSIReturn-results-info">
            Showing 2 / 2 results
            <button className='sSIReturn-print-btn' onClick={handleExportToExcel}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSIReturn-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <h2>Retrun Item Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                <th> Store Name</th>
                  <th>Date</th>
                  <th>Returned By</th>
                <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
            {returns.length > 0 ? (
              returns.map((item, index) => (
                <tr key={index}>
                  <td>{item.storeName}</td>
                  <td>{item.returnDate}</td>
                  <td>{item.returnedBy}</td>
                  <td>{item.remarks}</td>
                  <td><button className="action-button">Action</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-rows-message">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
            </table>
          </div>
        </div>
        <div className="sSIReturn-table-N-paginat">
          <table>
            <thead>
              <tr>
              <th> Store Name</th>
                  <th>Date</th>
                  <th>Returned By</th>
                <th>Remarks</th>
                  <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
            {returns.length > 0 ? (
              returns.map((item, index) => (
                <tr key={index}>
                  <td>{item.storeName}</td>
                  <td>{item.returnDate}</td>
                  <td>{item.returnBy}</td>
                  <td>{item.remarks}</td>
                  <td><button className="action-button">Action</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-rows-message">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
          </table>
          {/* <div className="sSIReturn-pagination">
            <span>0 to 0 of 0</span>
            <button>First</button>
            <button>Previous</button>
            <span>Page 0 of 0</span>
            <button>Next</button>
            <button>Last</button>
          </div> */}
        </div>
      </>
     <CustomModal isOpen={showNewPatientConsumption} onClose={handleBack}>

<SSIRetunReturnItemBtn /> 
</CustomModal>
    </div>
  );
}

export default SSIReturn;
