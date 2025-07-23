 /* Ajhar Tamboli financialAssistance.jsx 08-10-24 */


import React, { useState, useEffect } from 'react';
import "./financialAssistance.css";
import AddFinancialAssistance from './addFinancialAssistance';
import axios from 'axios';

const FinancialAssistance = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [labTests, setLabTests] = useState([]); // State to store fetched data
  const [selectedTest, setSelectedTest] = useState(null); // State to store the selected test for editing
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState(''); // State to store search input

  // Function to fetch financial assistance data from the API
  const fetchFinancialAssistance = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/financialassistance/getall`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLabTests(data); // Update the state with fetched data
    } catch (error) {
      console.error('Error fetching financial assistance data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchFinancialAssistance();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleAddFinancialAssistance = () => {
    setSelectedTest(null); // Reset selected test for adding
    setShowPopup(true); // Show the popup
  };

  const handleEditFinancialAssistance = (test) => {
    setSelectedTest(test); // Set the selected test for editing
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  const handleAddUpdate = async (data, existingData) => {
    const addApiUrl = `${API_BASE_URL}/financialassistance/add`; // API URL for adding
    const updateApiUrl = `${API_BASE_URL}/financialassistance/update/${existingData?.assistenceId}`; // API URL for updating

    try {
      if (existingData) {
        // Update existing record
        const response = await axios.put(updateApiUrl, data);
        console.log('Record updated successfully:', response.data);
      } else {
        // Add new record
        const response = await axios.post(addApiUrl, data);
        console.log('Record added successfully:', response.data);
      }
      // Fetch the updated financial assistance data
      fetchFinancialAssistance();
      handleClosePopup(); // Close the popup after submission
    } catch (error) {
      console.error('Error submitting financial assistance data:', error);
      // Handle error appropriately, e.g., show a notification to the user
    }
  };

  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Filter lab tests based on the search query
  const filteredRecords = labTests.filter((test) =>
    test.assistenceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

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

  return (
    <div className="financialAssistance-container">
      <div className="financialAssistance-firstRow">
        <div className="financialAssistance-addBtn">
          <button className="financialAssistance-add-button" onClick={handleAddFinancialAssistance}>
            + Add Financial Assistance
          </button>
        </div>
      </div>
      <div className="addfinancialAssistance-controls">
        <div className="addfinancialAssistance-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
          <button className="addfinancialAssistance-star-button">☆</button>
          <button className="addfinancialAssistance-ok-button">OK</button>
        </div>
      </div>
      <div className='financialAssistance-search-N-result'>
        <div className="financialAssistance-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>
        <div className="financialAssistance-results-info">
          <span>Showing {currentRecords.length} / {filteredRecords.length} results</span>
          <button className="financialAssistance-print-button">
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Assistance ID</th>
            <th>Patient Id</th>
            <th>Assistance Type</th>
            <th>Amount Granted</th>
            <th>Funding Source</th>
            <th>Approval Status</th>
            <th>Assistance Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((test, index) => (
            <tr key={index}>
              <td>{test.assistenceId}</td>
              <td>{test.ngoPatient.patientId}</td>
              <td>{test.assistenceType}</td>
              <td>{test.amountGranted}</td>
              <td>{test.fundingSource}</td>
              <td>{test.approvalStatus}</td>
              <td>{test.assistenceDate}</td>
              <td>
                <button className="financialAssistance-edit-button" onClick={() => handleEditFinancialAssistance(test)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="financialAssistance-modal">
          <div className="financialAssistance-modal-content">
            <AddFinancialAssistance onClose={handleClosePopup} testData={selectedTest} onSubmit={handleAddUpdate} />
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

export default FinancialAssistance;
 