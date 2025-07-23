/* Ajhar Tamboli socialWelfareSupport.jsx 08-10-24 */

import React, { useState, useEffect } from 'react';
import "./socialWelfareSupport.css";
import AddSocialWelfareSupport from './addSocialWelfareSupport';

const SocialWelfareSupport = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [socialSupports, setSocialSupports] = useState([]);
  const [selectedSupport, setSelectedSupport] = useState(null); // State for selected support to edit
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [itemsPerPage] = useState(10); // Items per page
  const [searchQuery, setSearchQuery] = useState(''); // Keep the search query for Patient ID
  const [welfareTypeQuery, setWelfareTypeQuery] = useState(''); // Keep the search query for welfare type

  const fetchSocialWelfareSupport = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/socialwelfaresupport/getall`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSocialSupports(data);
    } catch (error) {
      console.error('Error fetching social welfare support data:', error);
    }
  };

  useEffect(() => {
    fetchSocialWelfareSupport();
  }, []);

  const handleAddSocialWelfareSupport = () => {
    setSelectedSupport(null); // Clear the form for adding a new support
    setShowPopup(true); // Show the popup
  };

  const handleAddUpdateSubmit = async (data) => {
    try {
      let response;

      // Check if the social welfare support ID exists to determine if it's an update
      if (data.socialwelfaresupportId) {
        response = await fetch(`${API_BASE_URL}/socialwelfaresupport/update/${data.socialwelfaresupportId}`, {
          method: 'PUT', // Use PUT for updates
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        // Add new support
        response = await fetch(`${API_BASE_URL}/socialwelfaresupport/add`, {
          method: 'POST', // Use POST for adding new entries
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const result = await response.json(); // Parse JSON response
      console.log('Success:', result);

      // Reload data after successful add/update
      fetchSocialWelfareSupport();

      // Close the popup
      setShowPopup(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditSocialWelfareSupport = (support) => {
    setSelectedSupport(support); // Set the selected support for editing
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSupport(null); // Reset selected support when closing
  };

  // Pagination Logic
  const indexOfLastSupport = currentPage * itemsPerPage; // Index of last item on current page
  const indexOfFirstSupport = indexOfLastSupport - itemsPerPage; // Index of first item on current page

  // Filtered social supports based on search queries
  const filteredSupports = socialSupports.filter(support => {
    const matchesPatientId = support.ngoPatient.patientId.toString().includes(searchQuery);
    const matchesWelfareType = support.welfareType.toLowerCase().includes(welfareTypeQuery.toLowerCase());
    return matchesPatientId && matchesWelfareType; // Match both criteria
  });

  const currentSupports = filteredSupports.slice(indexOfFirstSupport, indexOfLastSupport); // Current items
  const totalPages = Math.ceil(filteredSupports.length / itemsPerPage); // Total pages

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1); // Go to next page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1); // Go to previous page
  };

  return (
    <div className="socialWelfareSupport-container">
      <div className="socialWelfareSupport-firstRow">
        <div className="socialWelfareSupport-addBtn">
          <button className="socialWelfareSupport-add-button" onClick={handleAddSocialWelfareSupport}>
            + Add Social Welfare Support
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
      <div className="socialWelfareSupport-search-N-result">
        <div className="socialWelfareSupport-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Welfare Type..."
            value={welfareTypeQuery}
            onChange={(e) => setWelfareTypeQuery(e.target.value)} // Keep the search query
          />
        </div>

        <div className="socialWelfareSupport-results-info">
          <span>Showing {currentSupports.length} / {filteredSupports.length} results</span>
          <button className="socialWelfareSupport-print-button">
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Support ID</th>
            <th>Patient ID</th>
            <th>Welfare Type</th>
            <th>Service Provider</th>
            <th>Support Duration</th>
            <th>Eligibility Criteria</th>
            <th>Welfare Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSupports.map((support, index) => (
            <tr key={index}>
              <td>{support.socialwelfaresupportId}</td>
              <td>{support.ngoPatient.patientId}</td>
              <td>{support.welfareType}</td>
              <td>{support.serviceProvider}</td>
              <td>{support.supportDuration}</td>
              <td>{support.eligibilityCriteria}</td>
              <td>{support.welfareStatus}</td>
              <td>
                <button
                  className="socialWelfareSupport-edit-button"
                  onClick={() => handleEditSocialWelfareSupport(support)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="socialWelfareSupport-modal">
          <div className="socialWelfareSupport-modal-content">
            <AddSocialWelfareSupport
              support={selectedSupport} // Pass selected support for editing
              onClose={handleClosePopup}
              onSubmit={handleAddUpdateSubmit}
            />
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

export default SocialWelfareSupport;
