/* Ajhar Tamboli ServiceTimeTracking.jsx 09-10-24 */


import React, { useState, useEffect, useRef } from 'react';
import "./serviceTimeTracking.css";
import AddServiceTimeTracking from "./addServiceTimeTracking.jsx";
import * as XLSX from 'xlsx';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns.js';
import useCustomAlert from '../../../alerts/useCustomAlert';
import CustomModal from '../../../CustomModel/CustomModal';

const ServiceTimeTracking = () => {
  const [labTests, setLabTests] = useState([]); // State to hold fetched lab tests
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null); // State to hold selected test for editing
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const itemsPerPage = 10; // Number of items to display per page
  const tableRef = useRef(); // Use a ref for the table element
  const [columnWidths, setColumnWidths] = useState([80, 80, 100, 100, 100, 80, 120, 100, 60, 120, 80, 100]); // Set initial widths for columns


  const { success, warning, error, CustomAlerts } = useCustomAlert();

  // Fetch lab tests from the API
  useEffect(() => {
    fetchLabTests();
  }, []); // Empty dependency array to run only on mount

  const fetchLabTests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/patientsqueue/allpatients`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLabTests(data); // Set the fetched data to state
    } catch (error) {
      console.error('Failed to fetch lab tests:', error);
      warning('Failed to fetch Data');

    }
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(currentTests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Queue Monitoring");
    XLSX.writeFile(workbook, "RealTimeQueueMonitoring.xlsx");
  };
  const handleServiceTimeTracking = (test = null) => {
    setSelectedTest(test); // Set the selected test for editing, or null for adding new
    setShowPopup(true); // Show the popup
  };

  const handleAddUpdate = async (formData) => {
    const apiUrl = selectedTest
      ? `${API_BASE_URL}/patientsqueue/update/${selectedTest.id}`
      : `${API_BASE_URL}/patientsqueue/add`;
    const method = selectedTest ? 'PUT' : 'POST';
    success('Successfully Add or Update');


    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save patient queue data');
      }

      const result = await response.json();
      console.log(result);
      fetchLabTests();
      handleClosePopup();
    } catch (error) {
      console.error('Error:', error);
      warning('Failed to Add or Update');

    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
    setSelectedTest(null); // Clear the selected test
  };

  // Calculate paginated results
  const indexOfLastTest = currentPage * itemsPerPage;
  const indexOfFirstTest = indexOfLastTest - itemsPerPage;

  // Filter lab tests based on search query
  // Filter lab tests based on search query
  const filteredLabTests = labTests.filter(test => {
    // Ensure the test object and properties are not null or undefined before calling toLowerCase()
    return (
      (test.status && test.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (test.queueNumber && test.queueNumber.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (test.id && test.id.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (test.arrivalTime && test.arrivalTime.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (test.appointmentTime && test.appointmentTime.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (test.completedTime && test.completedTime.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (test.serviceStartTime && test.serviceStartTime.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (test.waitTime && test.waitTime.toString().toLowerCase().includes(searchQuery.toLowerCase())) // Assuming waitTime is a number
    );
  });

  const printTable = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2 { text-align: center; }
          </style>
        </head>
        <body>
          <h2>Queue Monitoring Table</h2>
          ${tableRef.current.outerHTML} <!-- Use the tableRef content -->
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  // Get current tests based on filtered results
  const currentTests = filteredLabTests.slice(indexOfFirstTest, indexOfLastTest);

  return (
    <div className="serviceTimeTracking-container">
      <div className="serviceTimeTracking-firstRow">
        <div className="serviceTimeTracking-addBtn">
          <button className="serviceTimeTracking-add-button" onClick={() => handleServiceTimeTracking()}>+ Add Service Time Tracking</button>

          <CustomAlerts />
        </div>
      </div>
      <div className="addserviceTimeTracking-controls">
        {/* Your date range and button controls */}
        <div className="addserviceTimeTracking-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
        </div>
      </div>
      <div className='serviceTimeTracking-search-N-result'>
        <div className="serviceTimeTracking-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </div>
        <div className="serviceTimeTracking-results-info">
          <span>Showing {currentTests.length} / {filteredLabTests.length} results</span>
          <button
            className="patientQueueDisplay-print-button"
            onClick={exportToExcel}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className="serviceTimeTracking-print-button" onClick={printTable}><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>

              {[
                "Queue ID", "Patient ID", "Arrival Time",
                "Appo. Time", "Completed Time",
                "Service Time", "Wait Time",
                "Status", "Actions"
              ].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTests.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
              </tr>
            ) : (
              currentTests.map((test) => (
                <tr key={test.id}>
                  <td>{test.queueNumber}</td>
                  <td>{test.id}</td>
                  <td>{test.arrivalTime}</td>
                  <td>{test.appointmentTime}</td>
                  <td>{test.completedTime}</td>
                  <td>{test.serviceStartTime}</td>
                  <td>{test.waitTime}</td>
                  <td>{test.status}</td>
                  <td>
                    <button className="realTimeQueueMonitoring-edit-button" onClick={() => handleServiceTimeTracking(test)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal Popup */}
      {/* {showPopup && (
        <div className="serviceTimeTracking-modal">
          <div className="serviceTimeTracking-modal-content">
            <AddServiceTimeTracking
              onClose={handleClosePopup}
              onSubmit={handleAddUpdate}
              selectedTest={selectedTest} // Pass the selected test for editing
            />
          </div>
        </div>
      )} */}

      <CustomModal isOpen={showPopup} onClose={handleClosePopup}>
        <AddServiceTimeTracking selectedTest={selectedTest} onSubmit={handleAddUpdate}/>
      </CustomModal>
      <div className="nGOpatientRegistration-pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          « Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredLabTests.length / itemsPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredLabTests.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(filteredLabTests.length / itemsPerPage)}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default ServiceTimeTracking;
