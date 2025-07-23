/* Ajhar Tamboli patientNotification.jsx 10-10-24 */


import React, { useState, useEffect, useRef } from 'react';
import "./patientNotification.css";
import AddPatientNotification from "./addPatientNotification.jsx";
import * as XLSX from 'xlsx';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns.js';
import useCustomAlert from '../../../alerts/useCustomAlert';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api.js';


const PatientNotification = () => {
  const [labTests, setLabTests] = useState([]); // State to hold fetched lab tests
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [recordsPerPage] = useState(10); // Number of records per page
  const [selectedNotification, setSelectedNotification] = useState(null); // State for selected notification
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(Array(12).fill("auto"));


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

  const handlePatientNotification = (notification = null) => {
    setSelectedNotification(notification); // Set selected notification for editing
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
    setSelectedNotification(null); // Clear selected notification
  };

  // Filter lab tests based on the search term
  // Filter lab tests based on the search term across multiple fields
  const filteredLabTests = labTests.filter(test =>
    Object.values(test).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  // Calculate total number of pages
  const totalPages = Math.ceil(filteredLabTests.length / recordsPerPage);

  // Get current records to display
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredLabTests.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddUpdate = async (formData) => {
    const apiUrl = selectedNotification ? `${API_BASE_URL}/patientsqueue/update/${formData.id}` : `${API_BASE_URL}/patientsqueue/add`;
    const method = selectedNotification ? 'PUT' : 'POST';

    console.log('Sending Data:', formData); // Log the data being sent
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
        const errorText = await response.text(); // Get the error message from the response
        throw new Error(`Failed to save patient queue data: ${errorText}`);
      }

      const result = await response.json();
      console.log(result); // Handle the result as needed

      fetchLabTests();
      handleClosePopup(); // Close the form after successful submission
    } catch (error) {
      console.error('Error:', error);
      warning('Failed to Add or Update');

      // Optionally, handle errors (e.g., show a notification)
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Print the table displaying only currentRecords
  const printTable = () => {
    const printContent = `
    <table>
      <thead>
        <tr>
          <th>Queue ID</th>
          <th>Patient ID</th>
          <th>Patient Mo.No</th>
          <th>Remark</th>
          <th>Notifications Status</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${currentRecords
        .map(
          (test) => `
            <tr>
              <td>${test.queueNumber}</td>
              <td>${test.id}</td>
              <td>${test.mobile}</td>
              <td>${test.remark}</td>
              <td>${test.notificationStatus}</td>
              <td>${test.status}</td>
            </tr>
          `
        )
        .join('')}
      </tbody>
    </table>`;

    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Patient Queue</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Export only the currentRecords to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(currentRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PatientQueue");

    // Generate Excel file and download
    XLSX.writeFile(workbook, "PatientQueueData_CurrentPage.xlsx");
  };

  return (
    <div className="patientNotification-container">
      <div className="patientNotification-firstRow">
        <div className="patientNotification-addBtn">
          <button className="patientNotification-add-button" onClick={() => handlePatientNotification()}>
            + Add Patient Notification
          </button>
          <CustomAlerts />

        </div>
      </div>
      <div className="addpatientNotification-controls">
        <div className="addpatientNotification-date-range">
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
      <div className='patientNotification-search-N-result'>
        <div className="patientNotification-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="patientNotification-results-info">
          <span>Showing {currentRecords.length} of {filteredLabTests.length} results</span>
          <button
            className="patientQueueDisplay-print-button"
            onClick={exportToExcel}
          >
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className="patientQueueDisplay-print-button" onClick={printTable}>
            <i className="fa-solid fa-print"></i> Print
          </button>        </div>
      </div>


      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Queue ID", "Patient ID", "Patient Mo.No", "Remark", "Notifications Status", "Status", "Actions"].map((header, index) => (
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
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
              </tr>
            ) : (
              currentRecords.map((test) => (
                <tr key={test.id}>
                  <td>{test.queueNumber}</td>
                  <td>{test.id}</td>
                  <td>{test.mobile}</td>
                  <td>{test.remark}</td>
                  <td>{test.notificationStatus}</td>
                  <td>{test.status}</td>
                  <td>
                    <button className="queuePrioritization-edit-button" onClick={() => handlePatientNotification(test)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      {/* {showPopup && (
        <div className="patientNotification-modal">
          <div className="patientNotification-modal-content">
            <AddPatientNotification onClose={handleClosePopup}
              notification={selectedNotification}
              onSubmit={handleAddUpdate} />
          </div>
        </div>
      )} */}

      <CustomModal isOpen={showPopup} onClose={handleClosePopup}>
        <AddPatientNotification notification={selectedNotification} onSubmit={handleAddUpdate}/>
      </CustomModal>
      <div className="nGOpatientRegistration-pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          « Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next »
        </button>
      </div>
    </div>
  );
};

export default PatientNotification;
