/* Ajhar Tamboli ServiceTimeTracking.jsx 09-10-24 */


import React, { useState, useEffect } from 'react';
import "./serviceTimeTracking.css";
import AddServiceTimeTracking from "./addServiceTimeTracking.jsx";

const ServiceTimeTracking = () => {
  const [labTests, setLabTests] = useState([]); // State to hold fetched lab tests
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null); // State to hold selected test for editing
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const itemsPerPage = 10; // Number of items to display per page

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

  const handleServiceTimeTracking = (test = null) => {
    setSelectedTest(test); // Set the selected test for editing, or null for adding new
    setShowPopup(true); // Show the popup
  };

  const handleAddUpdate = async (formData) => {
    const apiUrl = selectedTest
      ? `http://localhost:8080/api/patientsqueue/update/${selectedTest.id}`
      : 'http://localhost:8080/api/patientsqueue/add';
    const method = selectedTest ? 'PUT' : 'POST';

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
  const filteredLabTests = labTests.filter(test =>
    test.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current tests based on filtered results
  const currentTests = filteredLabTests.slice(indexOfFirstTest, indexOfLastTest);

  return (
    <div className="serviceTimeTracking-container">
      <div className="serviceTimeTracking-firstRow">
        <div className="serviceTimeTracking-addBtn">
          <button className="serviceTimeTracking-add-button" onClick={() => handleServiceTimeTracking()}>+ Add Service Time Tracking</button>
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
          <button className="addserviceTimeTracking-star-button">☆</button>
          <button className="addserviceTimeTracking-ok-button">OK</button>
        </div>
      </div>
      <div className='serviceTimeTracking-search-N-result'>
        <div className="serviceTimeTracking-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </div>
        <div className="serviceTimeTracking-results-info">
          <span>Showing {currentTests.length} / {filteredLabTests.length} results</span>
          <button className="serviceTimeTracking-print-button"><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Queue ID</th>
            <th>Patient ID</th>
            <th>Arrival Time</th>
            <th>Appointment Time</th>
            <th>Completed Time</th>
            <th>Service Time</th>
            <th>Wait Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTests.map((test, index) => (
            <tr key={index}>
              <td>{test.queueNumber}</td>
              <td>{test.id}</td>
              <td>{test.arrivalTime}</td>
              <td>{test.appointmentTime}</td>
              <td>{test.completedTime}</td>
              <td>{test.serviceStartTime}</td>
              <td>{test.waitTime}</td>
              <td>{test.status}</td>
              <td>
                <button className="serviceTimeTracking-edit-button" onClick={() => handleServiceTimeTracking(test)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal Popup */}
      {showPopup && (
        <div className="serviceTimeTracking-modal">
          <div className="serviceTimeTracking-modal-content">
            <AddServiceTimeTracking
              onClose={handleClosePopup}
              onSubmit={handleAddUpdate}
              selectedTest={selectedTest} // Pass the selected test for editing
            />
          </div>
        </div>
      )}
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
