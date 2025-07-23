import React, { useState, useEffect } from 'react';
import "./contractManagement.css";
import AddContractManagement from "./addContractManagement";

const ContractManagement = () => {
  const [labTests, setLabTests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("2024-08-09"); // Default date
  const [toDate, setToDate] = useState("2025-08-16"); // Default date
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContract, setSelectedContract] = useState(null); // For edit functionality
  const recordsPerPage = 10;

  // Fetch data from the API
  useEffect(() => {
    fetchContract();
  }, []);

  const fetchContract = () => {
    fetch("http://localhost:8086/api/contractmanagement/getall")
      .then(response => response.json())
      .then(data => setLabTests(data))
      .catch(error => console.error("Error fetching data:", error));
  }

  const handleAddContractManagement = () => {
    setSelectedContract(null); // Clear selected contract when adding
    setShowPopup(true);
  };

  const handleEditContractManagement = (contract) => {
    setSelectedContract(contract); // Set selected contract for editing
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddUpdate = async (formData) => {
    const method = selectedContract ? 'PUT' : 'POST';
    const url = selectedContract
      ? `http://localhost:8086/api/contractmanagement/update/${formData.contract_id}`
      : 'http://localhost:8086/api/contractmanagement/add';

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
      fetchContract();
    } catch (error) {
      console.error('Error adding/updating Contract:', error);
    }
  };

  // Handle date range filter when OK is clicked
  const handleDateFilter = () => {
    // Perform the filtering when "OK" button is clicked
    setCurrentPage(1); // Reset to the first page
  };

  // Filter contracts based on the search term and date range
  const filteredContracts = labTests.filter(test => {
    const matchesSearch = (test.status || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange = new Date(test.contractStartDate) >= new Date(fromDate) &&
      new Date(test.contractStartDate) <= new Date(toDate);

    return matchesSearch && matchesDateRange;
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredContracts.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentContracts = filteredContracts.slice(startIndex, endIndex);

  return (
    <div className="contractManagement-container">
      <div className="contractManagement-firstRow">
        <div className="contractManagement-addBtn">
          <button className="contractManagement-add-button" onClick={handleAddContractManagement}>
            +Add Contract Management
          </button>
        </div>
      </div>
      {/* Date range filter */}
      <div className="contractManagement-controls">
        <div className="contractManagement-date-range">
          <label>
            From:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <button className="contractManagement-star-button">☆</button>
          <button className="contractManagement-ok-button" onClick={handleDateFilter}>
            OK
          </button>
        </div>
      </div>
      {/* Search bar and results */}
      <div className='contractManagement-search-N-result'>
        <div className="contractManagement-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="contractManagement-results-info">
          <span>Showing {currentContracts.length} / {filteredContracts.length} results</span>
          <button className="contractManagement-print-button"><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Contract ID</th>
            <th>Vendor ID</th>
            <th>Contract Start Date</th>
            <th>Contract End Date</th>
            <th>Contract Status</th>
            <th>Contract Amount</th>
            <th>Contract Terms & Conditions</th>
            <th>Payment Schedule</th>
            <th>Associated Purchase Orders</th>
            <th>Renewal Date</th>
            <th>Remarks</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentContracts.map((test, index) => (
            <tr key={index}>
              <td>{test.contract_id}</td>
              <td>{test.vendormanagement.vendor_id}</td>
              <td>{test.contractStartDate}</td>
              <td>{test.contractEndDate}</td>
              <td>{test.status}</td>
              <td>{test.contractAmount}</td>
              <td>{test.contractTermsAndConditions}</td>
              <td>{test.paymentSchedule}</td>
              <td>{test.associatedPurchaseOrders}</td>
              <td>{test.renewalDate}</td>
              <td>{test.remarks}</td>
              <td>{test.status}</td>
              <td>
                <button className="contractManagement-edit-button" onClick={() => handleEditContractManagement(test)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Popup for add/edit */}
      {showPopup && (
        <div className="contractManagement-modal">
          <div className="contractManagement-modal-content">
            <AddContractManagement onClose={handleClosePopup} contract={selectedContract} onSubmit={handleAddUpdate} />
          </div>
        </div>
      )}
      {/* Pagination */}
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

export default ContractManagement;
