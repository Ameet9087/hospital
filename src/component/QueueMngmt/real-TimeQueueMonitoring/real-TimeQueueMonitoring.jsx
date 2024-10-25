/* Ajhar Tamboli real-TimeQueueMonitoring.jsx 09-10-24 */


import React, { useState, useEffect } from 'react';
import "./real-TimeQueueMonitoring.css";
import AddRealTimeQueueMonitoring from './addReal-TimeQueueMonitoring';

const RealTimeQueueMonitoring = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [labTests, setLabTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 10 items per page
  const [selectedData, setSelectedData] = useState(null);

  const handleAddRealTimeQueueMonitoring = (data) => {
    setSelectedData(data);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedData(null);
  };

  const handleAddUpdate = async (formData) => {
    const apiUrl = selectedData
      ? `http://localhost:8080/api/patientsqueue/update/${selectedData.id}`
      : 'http://localhost:8080/api/patientsqueue/add';
    const method = selectedData ? 'PUT' : 'POST';

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

  const fetchLabTests = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/patientsqueue/allpatients');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setLabTests(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchLabTests();
  }, []);

  // Calculate pagination indexes
  const indexOfLastTest = currentPage * itemsPerPage;
  const indexOfFirstTest = indexOfLastTest - itemsPerPage;

  // Filter the lab tests based on the search term
  const filteredTests = labTests.filter(test =>
    test.priority !== null && test.priority !== undefined &&
    test.priority.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current items to display
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

  return (
    <div className="realTimeQueueMonitoring-container">
      <div className="realTimeQueueMonitoring-firstRow">
        <div className="realTimeQueueMonitoring-addBtn">
          <button className="realTimeQueueMonitoring-add-button" onClick={() => handleAddRealTimeQueueMonitoring(null)}>+ Add Real-Time Queue Monitoring</button>
        </div>
      </div>

      <div className="addQueuePrioritization-controls">
        <div className="addQueuePrioritization-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
          <button className="addQueuePrioritization-star-button">☆</button>
          <button className="addQueuePrioritization-ok-button">OK</button>
        </div>
      </div>

      <div className='queuePrioritization-search-N-result'>
        <div className="queuePrioritization-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Priority..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="queuePrioritization-results-info">
          <span>Showing {currentTests.length} / {filteredTests.length} results</span>
          <button className="queuePrioritization-print-button"><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Queue ID</th>
            <th>Patient ID</th>
            <th>Arrival Time</th>
            <th>Priority Level</th>
            <th>Appointment Time</th>
            <th>Appointment No</th>
            <th>Scheduled Time</th>
            <th>Service Type</th>
            <th>Room/Location</th>
            <th>Queue Position</th>
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
              <td>{test.priority}</td>
              <td>{test.appointmentTime}</td>
              <td>{test.appointmentNumber}</td>
              <td>{test.scheduledTime}</td>
              <td>{test.serviceType}</td>
              <td>{test.roomNumber}</td>
              <td>{test.position}</td>
              <td>{test.status}</td>
              <td>
                <button className="realTimeQueueMonitoring-edit-button" onClick={() => handleAddRealTimeQueueMonitoring(test)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="realTimeQueueMonitoring-modal">
          <div className="realTimeQueueMonitoring-modal-content">
            <AddRealTimeQueueMonitoring onClose={handleClosePopup}
              selectedData={selectedData}
              onSubmit={handleAddUpdate} />
          </div>
        </div>
      )}

      <div className="nGOpatientRegistration-pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          « Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredTests.length / itemsPerPage)}
        </span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredTests.length / itemsPerPage)))} disabled={currentPage === Math.ceil(filteredTests.length / itemsPerPage)}>
          Next »
        </button>
      </div>
    </div>
  );
};

export default RealTimeQueueMonitoring;
