/* Ajhar Tamboli healthEducationPrograms.jsx 08-10-24 */

import React, { useState, useEffect } from 'react';
import "./healthEducationPrograms.css";
import AddhealthEducationPrograms from './addhealthEducationPrograms';
import axios from 'axios';

const HealthEducationPrograms = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [healthPrograms, setHealthPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10); 

  // Fetching health education programs data
  const fetchHealthEducationPrograms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/healtheducationprograms/getall`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setHealthPrograms(data);
    } catch (error) {
      console.error('Error fetching health education programs data:', error);
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };

  useEffect(() => {
    fetchHealthEducationPrograms();
  }, []);

  // Handle opening the popup for adding a new program
  const handleAddHealthEducationPrograms = () => {
    setSelectedProgram(null);
    setShowPopup(true);
  };

  // Handle opening the popup for editing an existing program
  const handleEditHealthEducationPrograms = (program) => {
    setSelectedProgram(program);
    setShowPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Add or update health education program data
  const handleAddUpdate = async (data, existingData) => {
    const addApiUrl = `${API_BASE_URL}/healtheducationprograms/add`;
    const updateApiUrl = `${API_BASE_URL}/healtheducationprograms/update/${existingData?.programId}`;

    try {
      if (existingData) {
        await axios.put(updateApiUrl, data);
        console.log('Record updated successfully');
      } else {
        await axios.post(addApiUrl, data);
        console.log('Record added successfully');
      }

      fetchHealthEducationPrograms(); // Refresh the data
      handleClosePopup(); // Close the popup
    } catch (error) {
      console.error('Error submitting health education program data:', error);
    }
  };

  // Filter programs based on search query
  const filteredPrograms = healthPrograms.filter(program => 
    program.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.topicsCovered.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredPrograms.length / recordsPerPage);
  const currentRecords = filteredPrograms.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="healthEducationPrograms-container">
      <div className="healthEducationPrograms-firstRow">
        <div className="healthEducationPrograms-addBtn">
          <button className="healthEducationPrograms-add-button" onClick={handleAddHealthEducationPrograms}>
            + Add Health Education Programs
          </button>
        </div>
      </div>
      <div className="addhealthEducationPrograms-controls">
        <div className="addhealthEducationPrograms-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
          <button className="addhealthEducationPrograms-star-button">☆</button>
          <button className="addhealthEducationPrograms-ok-button">OK</button>
        </div>
      </div>
      <div className='healthEducationPrograms-search-N-result'>
        <div className="healthEducationPrograms-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="healthEducationPrograms-results-info">
          <span>Showing {currentRecords.length} / {filteredPrograms.length} results</span>
          <button className="healthEducationPrograms-print-button">
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Program ID</th>
            <th>Program Name</th>
            <th>Target Audience</th>
            <th>Program Date</th>
            <th>Instructor Name</th>
            <th>Topics Covered</th>
            <th>Feedback</th>
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
                <td>{program.programId}</td>
                <td>{program.programName}</td>
                <td>{program.targetAudience}</td>
                <td>{program.programDate}</td>
                <td>{program.instructorName}</td>
                <td>{program.topicsCovered}</td>
                <td>{program.feedback}</td>
                <td>
                  <button className="healthEducationPrograms-edit-button" onClick={() => handleEditHealthEducationPrograms(program)}>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showPopup && (
        <div className="healthEducationPrograms-modal">
          <div className="healthEducationPrograms-modal-content">
            <AddhealthEducationPrograms 
              program={selectedProgram} 
              onClose={handleClosePopup} 
              onSubmit={handleAddUpdate} 
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

export default HealthEducationPrograms;
