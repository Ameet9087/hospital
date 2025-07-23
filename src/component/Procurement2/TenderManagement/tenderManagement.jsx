/* Ajhar Tamboli tenderManagement.jsx 11-10-24 */

import React, { useState, useEffect } from 'react';
import "./tenderManagement.css";
import AddTenderManagement from './addTenderManagement';

const TenderManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [labTests, setLabTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("2024-08-09");
  const [toDate, setToDate] = useState("2026-08-16");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedTender, setSelectedTender] = useState(null);

  const handleAddTenderManagement = () => {
    setSelectedTender(null);
    setShowPopup(true);
  };

  const handleEditTenderManagement = (tender) => {
    setSelectedTender(tender);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchTenderManagement();
  }, []);

  const fetchTenderManagement = async () => {
    try {
      const response = await fetch('http://localhost:8086/api/tendermanagement/getall');
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
    const method = selectedTender ? 'PUT' : 'POST';
    const url = selectedTender
      ? `http://localhost:8086/api/tendermanagement/update/${formData.tender_id}`
      : 'http://localhost:8086/api/tendermanagement/add';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      fetchTenderManagement();
    } catch (error) {
      console.error('Error adding/updating Tender:', error);
    }
  };

  const filteredLabTests = labTests.filter(test => {
    const testDate = new Date(test.tenderIssuingDate);
    const from = new Date(fromDate);
    const to = new Date(toDate);

    // Check if tender name includes the search term and if the tender date is within the selected range
    return (
      test.tenderName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      testDate >= from && testDate <= to
    );
  });

  const totalPages = Math.ceil(filteredLabTests.length / itemsPerPage);
  const currentItems = filteredLabTests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="tenderManagement-container">
      <div className="tenderManagement-firstRow">
        <div className="tenderManagement-addBtn">
          <button className="tenderManagement-add-button" onClick={handleAddTenderManagement}>
            +Add Tender Management
          </button>
        </div>
      </div>
      <div className="tenderManagement-controls">
        <div className="tenderManagement-date-range">
          <label>
            From:
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </label>
          <label>
            To:
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </label>
          <button className="tenderManagement-star-button">☆</button>
          <button className="tenderManagement-ok-button">OK</button>
        </div>
      </div>
      <div className='tenderManagement-search-N-result'>
        <div className="tenderManagement-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Tender Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="tenderManagement-results-info">
          <span>Showing {currentItems.length} / {filteredLabTests.length} results</span>
          <button className="tenderManagement-print-button"><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Tender ID</th>
            <th>Vendor ID</th>
            <th>Tender Name/Description</th>
            <th>Department</th>
            <th>Tender Issuing Date</th>
            <th>Submission Deadline</th>
            <th>Vendors Participating</th>
            <th>Vendor Proposals/Quotes</th>
            <th>Winning Vendor</th>
            <th>Contract ID</th>
            <th>Tender Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((test, index) => (
            <tr key={index}>
              <td>{test.tender_id}</td>
              <td>{test.vendormanagement.vendor_id}</td>
              <td>{test.tenderName}</td>
              <td>{test.department}</td>
              <td>{test.tenderIssuingDate}</td>
              <td>{test.submissionDeadline}</td>
              <td>{test.vendorsParticipating}</td>
              <td>{test.vendorsProposal}</td>
              <td>{test.winningVendor}</td>
              <td>{test.contractId}</td>
              <td>{test.tenderAmount}</td>
              <td>{test.status}</td>
              <td>
                <button className="tenderManagement-edit-button" onClick={() => handleEditTenderManagement(test)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="tenderManagement-modal">
          <div className="tenderManagement-modal-content">
            <AddTenderManagement onClose={handleClosePopup} selectedTender={selectedTender} onSubmit={handleAddUpdate} />
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
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default TenderManagement;
