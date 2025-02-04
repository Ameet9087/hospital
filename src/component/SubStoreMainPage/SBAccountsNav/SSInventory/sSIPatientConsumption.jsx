/* Ajhar Tamboli sSIPatientConsumption.jsx 19-09-24 */

import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSInventory/sSIPatientConsumption.css";
import { useReactToPrint } from 'react-to-print';
import SSIPatientConsumNewPCbtn from './sSIPatientConsumNewPCbtn';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/api';
import CustomModal from '../../../CustomModel/CustomModal';

function SSIPatientConsumption() {
  const printRef = useRef();
  const {store} = useParams();
  const [fromDate, setFromDate] = useState('2024-08-14');
  const [toDate, setToDate] = useState('2024-08-21');
  const [patientConsumptions, setPatientConsumptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
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
    const fetchPatientConsumptions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/patient-consumption/getAll`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredData = data.filter((item) => item.substoreId == store);

        // Fetch patient details and map the patient name
        const updatedData = await Promise.all(
          filteredData.map(async (consumption) => {
            const patientResponse = await fetch(`${API_BASE_URL}/inpatients/${consumption.patientId}`);
            if (patientResponse.ok) {
              const patientData = await patientResponse.json();
              return { ...consumption, patientName: patientData.firstName };
            }
            return { ...consumption, patientName: 'Unknown' };
          })
        );

        setPatientConsumptions(updatedData);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientConsumptions();
  }, [store]);


  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Patient Consumption Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });


  // Function to handle exporting the table to an Excel file
  const handleExportToExcel = () => {
    // Get the table data
    const tableData = [
      [ 'Patient Name', 'Consumption Date', 'Entered By', 'Remarks'],
      
    ];
   

    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Convert the workbook to an Excel file and trigger the download
    XLSX.writeFile(workbook, 'PatientConsumption_Report.xlsx');
  };

  return (
    <div className="sSIPatientConsumption-active-imaging-request">
            
      <>
        <header className='sSIPatientConsumption-header'>
          <div className="sSIPatientConsumption-status-filters">
          <button className="sSIPatientConsumption-new-patient-button"
                          onClick={handleNewPatientConsumptionClick} // Handle button click
>+ New Patient Consumption</button>
          </div>
        </header>
          
          <div className="sSIPatientConsumption-controls">

<div className="sSIPatientConsumption-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>
      {/* <button className="sSIPatientConsumption-star-button">☆</button>
    <button className="sSIPatientConsumption-more-btn">-</button>
      <button className="sSIPatientConsumption-ok-button">OK</button> */}
    </div>
    </div>
        <div className="sSIPatientConsumption-search-N-results">
          <div className="sSIPatientConsumption-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSIPatientConsumption-results-info">
            Showing 2 / 2 results
            <button className='sSIPatientConsumption-print-btn' onClick={handleExportToExcel}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSIPatientConsumption-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <h2>Patient Consumption Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Consumption Date</th>
                  <th>Entered By</th>
                <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
            {patientConsumptions.length > 0 ? (
              patientConsumptions.map((consumption, index) => (
                <tr key={index}>
                  <td>{consumption.patientName}</td>
                  <td>{consumption.consumptionDate}</td>
                  <td>{consumption.enteredBy}</td>
                  <td>{consumption.remark}</td>
                  <td><button className="action-button">Action</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Rows To Show</td>
              </tr>
            )}
          </tbody>
            </table>
          </div>
        </div>
        <div className="sSIPatientConsumption-table-N-paginat">
          <table>
            <thead>
              <tr>
                  <th>Patient Name</th>
                  <th>Consumption Date</th>
                  <th>Entered By</th>
                <th>Remarks</th>
                  <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
            {patientConsumptions.length > 0 ? (
              patientConsumptions.map((consumption, index) => (
                <tr key={index}>
                  <td>{consumption.patientName}</td>
                  <td>{consumption.consumptionDate}</td>
                  <td>{consumption.enteredBy}</td>
                  <td>{consumption.remark}</td>
                  <td><button className="action-button">Action</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Rows To Show</td>
              </tr>
            )}
          </tbody>
          </table>
          {/* <div className="sSIPatientConsumption-pagination">
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
<SSIPatientConsumNewPCbtn  /> /
</CustomModal>
    </div>
  );
}

export default SSIPatientConsumption;
