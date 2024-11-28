import React, { useState, useEffect } from 'react';
import "./communityOutreach.css";
import AddcommunityOutreach from './addcommunityOutreach';
import axios from 'axios';

const CommunityOutreach = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [outreachPrograms, setOutreachPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutreachProgram, setSelectedOutreachProgram] = useState(null); // State to hold the selected outreach program for editing
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [recordsPerPage] = useState(10); // Records per page state

  const fetchCommunityOutreachData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/communityoutreach/getall`);
      setOutreachPrograms(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching community outreach data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityOutreachData();
  }, []);

  const handleAddCommunityOutreach = () => {
    setSelectedOutreachProgram(null); // Reset the selected program for adding
    setShowPopup(true);
  };

  const handleAddUpdate = async (outreachData) => {
    try {
      if (selectedOutreachProgram) {
        // Update existing outreach program
        await axios.put(`${API_BASE_URL}/communityoutreach/update/${outreachData.outreachId}`, outreachData);
        console.log('Outreach program updated:', outreachData);
      } else {
        // Add new outreach program
        await axios.post(`${API_BASE_URL}/communityoutreach/add`, outreachData);
        console.log('New outreach program added:', outreachData);
      }
      fetchCommunityOutreachData(); // Refresh the outreach programs list
    } catch (error) {
      console.error('Error adding/updating community outreach program:', error);
    }
  };

  const handleEditCommunityOutreach = (program) => {
    setSelectedOutreachProgram(program); // Set the selected program for editing
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedOutreachProgram(null); // Reset the selected program on close
  };

  const filteredOutreachPrograms = outreachPrograms.filter(program =>
    program.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalRecords = filteredOutreachPrograms.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredOutreachPrograms.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="communityOutreach-container">
      <div className="communityOutreach-firstRow">
        <div className="communityOutreach-addBtn">
          <button className="communityOutreach-add-button" onClick={handleAddCommunityOutreach}>+ Add Community Outreach</button>
        </div>
      </div>
      <div className="addcommunityOutreach-controls">
        <div className="addcommunityOutreach-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
          <button className="addcommunityOutreach-star-button">☆</button>
          <button className="addcommunityOutreach-ok-button">OK</button>
        </div>
      </div>
      <div className='communityOutreach-search-N-result'>
        <div className="communityOutreach-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="communityOutreach-results-info">
          <span>Showing {currentRecords.length} / {totalRecords} results</span>
          <button className="communityOutreach-print-button"><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Outreach ID</th>
            <th>Event Name</th>
            <th>Location</th>
            <th>Date and Time</th>
            <th>Services Provided</th>
            <th>Volunteer Name</th>
            <th>Beneficiaries</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>Loading...</td>
            </tr>
          ) : (
            currentRecords.map((program, index) => (
              <tr key={index}>
                <td>{program.communityOutreachId}</td>
                <td>{program.eventName}</td>
                <td>{program.location}</td>
                <td>{program.dateTime}</td>
                <td>{program.servicesProvided}</td>
                <td>{program.volunteerName}</td>
                <td>{program.beneficiaries}</td>
                <td>
                  <button className="communityOutreach-edit-button" onClick={() => handleEditCommunityOutreach(program)}>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showPopup && (
        <div className="communityOutreach-modal">
          <div className="communityOutreach-modal-content">
            <AddcommunityOutreach onClose={handleClosePopup} outreachProgram={selectedOutreachProgram} onSubmit={handleAddUpdate} />
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

export default CommunityOutreach;
