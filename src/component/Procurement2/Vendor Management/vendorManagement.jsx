import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './vendorManagement.css';
import AddVendorManagement from './addVendorManagement.jsx';

const VendorManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVendor, setSelectedVendor] = useState(null); // For editing vendor
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [fromDate, setFromDate] = useState('2024-08-09'); // State for 'From' date
  const [toDate, setToDate] = useState('2026-08-16'); // State for 'To' date
  const itemsPerPage = 10;

  const handleAddVendorManagement = () => {
    setSelectedVendor(null); // Clear selected vendor when adding new one
    setShowPopup(true);
  };

  const handleEditVendor = (vendor) => {
    setSelectedVendor(vendor); // Set the selected vendor for editing
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchVendors();
  }, [fromDate, toDate]); // Re-fetch vendors when date range changes

  const fetchVendors = () => {
    axios.get('http://localhost:8086/api/vendormanagement/getall')
      .then(response => {
        setVendors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vendor data:', error);
        setLoading(false);
      });
  };

  const handleAddUpdate = async (vendor) => {
    const method = selectedVendor ? 'PUT' : 'POST'; // Use PUT if vendorData is present, otherwise POST
    const url = selectedVendor ? `http://localhost:8086/api/vendormanagement/update/${vendor.vendor_id}` : 'http://localhost:8086/api/vendormanagement/add'; // Adjust the URL as needed

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendor), // Send the vendor data
      });
      fetchVendors();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Vendor added/updated successfully:', result);
    } catch (error) {
      console.error('Error adding/updating vendor:', error);
    }
  };

  // Filter vendors based on search query and date range
  const filteredVendors = vendors.filter(vendor => {
    const registeredDate = new Date(vendor.registeredDate);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    // Check if the vendor name matches the search query and if the registered date falls within the range
    return (
      vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      registeredDate >= fromDateObj && registeredDate <= toDateObj
    );
  });

  // Pagination logic
  const indexOfLastVendor = currentPage * itemsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - itemsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  return (
    <div className="vendorManagement-container">
      <div className="vendorManagement-firstRow">
        <div className="vendorManagement-addBtn">
          <button className="vendorManagement-add-button" onClick={handleAddVendorManagement}>
            + Add Vendor Management
          </button>
        </div>
      </div>

      <div className="vendorManagement-controls">
        <div className="vendorManagement-date-range">
          <label>From: <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></label>
          <label>To: <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></label>
          <button className="vendorManagement-star-button">☆</button>
          <button className="vendorManagement-ok-button">OK</button>
        </div>
      </div>

      <div className="vendorManagement-search-N-result">
        <div className="vendorManagement-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Vendor Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </div>
        <div className="vendorManagement-results-info">
          <span>Showing {currentVendors.length} / {filteredVendors.length} results</span>
          <button className="vendorManagement-print-button">
            <i className="fa-solid fa-print"></i>Print
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Vendor ID</th>
              <th>Vendor Name</th>
              <th>Contact Person</th>
              <th>Contact Number</th>
              <th>Email Address</th>
              <th>Vendor Address</th>
              <th>Tax ID</th>
              <th>Vendor Rating</th>
              <th>Vendor Type</th>
              <th>Registered Date</th>
              <th>Associated Contracts</th>
              <th>Payment Terms</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentVendors.map((vendor, index) => (
              <tr key={index}>
                <td>{vendor.vendor_id}</td>
                <td>{vendor.vendorName}</td>
                <td>{vendor.contactPerson}</td>
                <td>{vendor.contactNumber}</td>
                <td>{vendor.email}</td>
                <td>{vendor.address}</td>
                <td>{vendor.taxId}</td>
                <td>{vendor.rating}</td>
                <td>{vendor.vendorType}</td>
                <td>{vendor.registeredDate}</td>
                <td>{vendor.associatedContracts}</td>
                <td>{vendor.paymentsTerms}</td>
                <td>{vendor.status}</td>
                <td>
                  <button className="vendorManagement-edit-button" onClick={() => handleEditVendor(vendor)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {/* Popup for adding/editing vendor management */}
      {showPopup && (
        <div className="vendorManagement-modal">
          <div className="vendorManagement-modal-content">
            <AddVendorManagement onClose={handleClosePopup} vendorData={selectedVendor} onSubmit={handleAddUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;
