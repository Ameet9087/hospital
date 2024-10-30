/* Ajhar Tamboli patientQueueDisplay.jsx 09-10-24 */


import React, { useState, useEffect } from 'react';
import "./queuePrioritization.css";
import AddQueuePrioritization from './addQueuePrioritization';

const QueuePrioritization = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [labTests, setLabTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState(null); // State to hold the item being edited
  const itemsPerPage = 10;

  const handleQueuePrioritization = (item = null) => {
    setEditingItem(item); // Set the item to edit, or null for adding
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setEditingItem(null); // Clear the editing item
    setShowPopup(false); // Hide the popup
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/patientsqueue/allpatients');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLabTests(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddUpdate = async (formData) => {
    // Determine the correct API URL based on whether we're editing or adding a new item
    const apiUrl = editingItem
      ? `http://localhost:8080/api/patientsqueue/update/${editingItem.id}` // Use editingItem.id for the update
      : 'http://localhost:8080/api/patientsqueue/add'; // URL for adding a new item

    const method = editingItem ? 'PUT' : 'POST'; // Set the correct method

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to save patient queue data'); // Error handling
      }

      const result = await response.json(); // Parse the response JSON
      console.log(result); // Log the result (handle it as needed)

      // Optionally, refresh the queue list or handle the response further
      fetchData(); // Call your fetchData function to refresh the list
      handleClosePopup(); // Close the form after successful submission
    } catch (error) {
      console.error('Error:', error); // Log any errors that occur
      // Optionally, handle errors (e.g., show a notification)
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  const filteredLabTests = labTests.filter((test) => {
    const patientId = test?.id?.toString() || '';
    const priority = test?.priority?.toString() || '';
    const queueNumber = test?.queueNumber?.toString() || '';
    const status = test?.status?.toString() || '';

    return (
      patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      queueNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastTest = currentPage * itemsPerPage;
  const indexOfFirstTest = indexOfLastTest - itemsPerPage;
  const currentTests = filteredLabTests.slice(indexOfFirstTest, indexOfLastTest);

  return (
    <div className="queuePrioritization-container">
      <div className="queuePrioritization-firstRow">
        <div className="queuePrioritization-addBtn">
          <button className="queuePrioritization-add-button" onClick={() => handleQueuePrioritization()}>+ Add Queue Prioritization</button>
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
          <span>Showing {currentTests.length} / {filteredLabTests.length} results</span>
          <button className="queuePrioritization-print-button"><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Priority Level</th>
            <th>Queue Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTests.map((test, index) => (
            <tr key={index}>
              <td>{test.id}</td>
              <td>{test.priority}</td>
              <td>{test.queueNumber}</td>
              <td>{test.status}</td>
              <td>
                <button className="queuePrioritization-edit-button" onClick={() => handleQueuePrioritization(test)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="queuePrioritization-modal">
          <div className="queuePrioritization-modal-content">
            <AddQueuePrioritization
              onClose={handleClosePopup}
              editingItem={editingItem}
              onSubmit={handleAddUpdate} // Pass the add/update handler
            />
          </div>
        </div>
      )}

      <div className="nGOpatientRegistration-pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          « Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredLabTests.length / itemsPerPage)}
        </span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredLabTests.length / itemsPerPage)))} disabled={currentPage === Math.ceil(filteredLabTests.length / itemsPerPage)}>
          Next »
        </button>
      </div>
    </div>
  );
};

export default QueuePrioritization;
