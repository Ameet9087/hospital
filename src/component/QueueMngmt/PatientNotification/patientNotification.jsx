/* Ajhar Tamboli patientNotification.jsx 10-10-24 */


import React, { useState, useEffect } from 'react';
import "./patientNotification.css";
import AddPatientNotification from "./addPatientNotification.jsx";

const PatientNotification = () => {
  const [labTests, setLabTests] = useState([]); // State to hold fetched lab tests
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [recordsPerPage] = useState(10); // Number of records per page
  const [selectedNotification, setSelectedNotification] = useState(null); // State for selected notification
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  // Fetch lab tests from the API
  useEffect(() => {
    fetchLabTests();
  }, []); // Empty dependency array to run only on mount

  const fetchLabTests = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/patientsqueue/allpatients');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLabTests(data); // Set the fetched data to state
    } catch (error) {
      console.error('Failed to fetch lab tests:', error);
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
  const filteredLabTests = labTests.filter(test =>
    test.notificationStatus?.toLowerCase().includes(searchTerm.toLowerCase())
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
    const apiUrl = selectedNotification ? `http://localhost:8080/api/patientsqueue/update/${formData.id}` : 'http://localhost:8080/api/patientsqueue/add';
    const method = selectedNotification ? 'PUT' : 'POST';

    console.log('Sending Data:', formData); // Log the data being sent

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
      // Optionally, handle errors (e.g., show a notification)
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="patientNotification-container">
      <div className="patientNotification-firstRow">
        <div className="patientNotification-addBtn">
          <button className="patientNotification-add-button" onClick={() => handlePatientNotification()}>
            + Add Patient Notification
          </button>
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
          <button className="addpatientNotification-star-button">☆</button>
          <button className="addpatientNotification-ok-button">OK</button>
        </div>
      </div>
      <div className='patientNotification-search-N-result'>
        <div className="patientNotification-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Notification Status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="patientNotification-results-info">
          <span>Showing {currentRecords.length} of {filteredLabTests.length} results</span>
          <button className="patientNotification-print-button"><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Queue ID</th>
            <th>Patient ID</th>
            <th>Patient Mo.No</th>
            <th>Remark</th>
            <th>Notifications Status</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((test, index) => (
            <tr key={index}>
              <td>{test.queueNumber}</td>
              <td>{test.id}</td>
              <td>{test.mobile}</td>
              <td>{test.remark}</td>
              <td>{test.notificationStatus}</td>
              <td>{test.status}</td>
              <td>
                <button className="patientNotification-edit-button" onClick={() => handlePatientNotification(test)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal Popup */}
      {showPopup && (
        <div className="patientNotification-modal">
          <div className="patientNotification-modal-content">
            <AddPatientNotification onClose={handleClosePopup}
              notification={selectedNotification}
              onSubmit={handleAddUpdate} />
          </div>
        </div>
      )}

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
