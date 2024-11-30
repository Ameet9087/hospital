/* Ajhar Tamboli patientQueueDisplay.jsx 09-10-24 */


import React, { useState, useEffect, useRef } from 'react';
import "./patientQueueDisplay.css";
import AddPatientQueueDisplay from "./addPatientQueueDisplay";
import * as XLSX from 'xlsx';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';


const PatientQueueDisplay = () => {
  const [labTests, setLabTests] = useState([]); // Patient data
  const [showPopup, setShowPopup] = useState(false); // For showing the popup
  const [selectedPatient, setSelectedPatient] = useState(null); // For editing patient data
  const [isEditing, setIsEditing] = useState(false); // To determine whether it's an add or edit action

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const recordsPerPage = 10; // Number of records per page

  const { success, warning, error, CustomAlerts } = useCustomAlert();

  // Search state
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState([70, 70, 120, 60, 85, 120, 80, 110, 90, 80, 70, 80]); // Set initial widths for columns

  // Fetch data from the API
  useEffect(() => {
    fetchPatientsQueue();
  }, []);

  const fetchPatientsQueue = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/patientsqueue/allpatients`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Patient Data:', data); // Log the fetched data
        setLabTests(data); // Set the fetched data
      } else {
        console.error('Failed to fetch patient queue data');
        warning('Failed to fetch Data');

      }
    } catch (error) {
      console.error('Error fetching patient queue:', error);
      warning('Failed to fetch Data');

    }
  };

  // Filter labTests based on search term
  // Filter labTests based on search term across multiple fields
  const filteredLabTests = labTests.filter(patient => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Check if any field contains the search term
    return (
      lowerCaseSearchTerm === '' || // Show all if the search term is empty
      (patient.queueNumber && patient.queueNumber.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.id && patient.id.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.name && patient.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.ageGender && patient.ageGender.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.department && patient.department.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.consultationType && patient.consultationType.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.appointmentNumber && patient.appointmentNumber.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.serviceProvider && patient.serviceProvider.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.mobile && patient.mobile.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.appointmentTime && patient.appointmentTime.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (patient.status && patient.status.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });


  // Pagination calculations
  const totalResults = filteredLabTests.length;
  const totalPages = Math.ceil(totalResults / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredLabTests.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddUpdate = async (formData) => {
    const apiUrl = selectedPatient ? `${API_BASE_URL}/patientsqueue/update/${formData.id}` : `${API_BASE_URL}/patientsqueue/add`;
    const method = selectedPatient ? 'PUT' : 'POST';

    console.log('Sending Data:', formData); // Log the data being sent
    success('Successfull Add or Update');


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

      fetchPatientsQueue();
      handleClosePopup(); // Close the form after successful submission
    } catch (error) {
      console.error('Error:', error);
      warning('Failed to Add or Update');

      // Optionally, handle errors (e.g., show a notification)
    }
  };

  // Show popup for adding a new patient
  const handleAddPatientQueueDisplay = () => {
    setSelectedPatient(null); // Clear previous selection
    setIsEditing(false); // Not editing, this is a new addition
    setShowPopup(true); // Show the popup
  };

  // Show popup for editing a patient
  const handleEditPatientQueueDisplay = (patient) => {
    setSelectedPatient(patient); // Set selected patient data for editing
    setIsEditing(true); // It's an edit action
    setShowPopup(true); // Show the popup
  };
  // Print the table
  const printTable = () => {
    const printContent = document.querySelector(".patientQueueDisplay-container").innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Patient Queue</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(labTests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PatientQueue");

    // Generate Excel file and download
    XLSX.writeFile(workbook, "PatientQueueData.xlsx");
  };
  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPatient(null); // Clear selection when closing
  };

  return (
    <div className="patientQueueDisplay-container">
      <div className="patientQueueDisplay-firstRow">
        <div className="patientQueueDisplay-addBtn">
          <button className="patientQueueDisplay-add-button" onClick={handleAddPatientQueueDisplay}>
            +Add Patient Queue Display
          </button>
          <CustomAlerts />

        </div>
      </div>

      <div className="patientQueueDisplay-controls">
        <div className="patientQueueDisplay-date-range">
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

      <div className='patientQueueDisplay-search-N-result'>
        <div className="patientQueueDisplay-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>
        <div className="patientQueueDisplay-results-info">
          <span>Showing {currentRecords.length} / {totalResults} results</span>
          <button
            className="patientQueueDisplay-print-button"
            onClick={exportToExcel}
          >
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className="patientQueueDisplay-print-button" onClick={printTable}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Queue ID", "Patient ID", "Patient Name", "Age", "Department",
                "Consultation Type", "Appo. No", "Service Provider",
                "Mobile No", "Appo. Time", "Status", "Actions"
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
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan="12" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
              </tr>
            ) : (
              currentRecords.map((test) => (
                <tr key={test.id}>
                  <td>{test.queueNumber}</td>
                  <td>{test.id}</td>
                  <td>{test.name}</td>
                  <td>{test.ageGender}</td>
                  <td>{test.department}</td>
                  <td>{test.consultationType}</td>
                  <td>{test.appointmentNumber}</td>
                  <td>{test.serviceProvider}</td>
                  <td>{test.mobile}</td>
                  <td>{test.appointmentTime}</td>
                  <td>{test.status}</td>
                  <td>
                    <button className="patientQueueDisplay-edit-button" onClick={() => handleEditPatientQueueDisplay(test)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showPopup} onClose={handleClosePopup}>
        <AddPatientQueueDisplay selectedQueue={selectedPatient} onSubmit={handleAddUpdate}/>
      </CustomModal>

      {/* {showPopup && (
        <div className="patientQueueDisplay-modal">
          <div className="patientQueueDisplay-modal-content">
            <AddPatientQueueDisplay
              onClose={handleClosePopup}
              onSubmit={handleAddUpdate}
              selectedQueue={selectedPatient} // Pass data to the popup for editing
            />
          </div>
        </div>
      )} */}

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

export default PatientQueueDisplay;
