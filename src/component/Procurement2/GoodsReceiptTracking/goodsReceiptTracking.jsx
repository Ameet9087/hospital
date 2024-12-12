/* Ajhar Tamboli goodsReceiptTracking.jsx 11-10-24 */


import React, { useState, useEffect } from 'react';
import "./goodsReceiptTracking.css";
import AddGoodsReceiptTracking from "./addGoodsReceiptTracking";

const GoodsReceiptTracking = () => {
  const [labTests, setLabTests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordsPerPage = 10; // Show 10 records per page
  const [searchTerm, setSearchTerm] = useState(""); // Search term for item name
  const [startDate, setStartDate] = useState("2024-08-09"); // Default start date
  const [endDate, setEndDate] = useState("2026-08-16"); // Default end date

  useEffect(() => {
    fetchGoodsReceiptData();
  }, []);

  const fetchGoodsReceiptData = async () => {
    try {
      const response = await fetch("http://localhost:8086/api/goodsreceipt/getall");
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setLabTests(data);
      setTotalPages(Math.ceil(data.length / recordsPerPage));
    } catch (error) {
      console.error('Error fetching goods receipt data:', error);
    }
  };

  const handleAddGoodsReceiptTracking = () => {
    setSelectedData(null);
    setShowPopup(true);
  };

  const handleEditGoodsReceiptTracking = (data) => {
    setSelectedData(data);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedData(null);
  };

  const handleAddUpdate = async (formattedData) => {
    const method = selectedData ? 'PUT' : 'POST';
    const url = selectedData
      ? `http://localhost:8086/api/goodsreceipt/update/${formattedData.reciept_id}`
      : 'http://localhost:8086/api/goodsreceipt/add';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      console.log('PurchaseOrder added/updated successfully:', result);
      fetchGoodsReceiptData();
    } catch (error) {
      console.error('Error adding/updating Receipt:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Handle date range changes
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  // Filter and search the labTests data
  const filteredData = labTests.filter((test) => {
    const receiptDate = new Date(test.receiptDate);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if the item name matches the search term and if the receipt date is within the selected range
    const matchesSearch = test.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const isWithinDateRange = receiptDate >= start && receiptDate <= end;

    return matchesSearch && isWithinDateRange;
  });

  // Calculate pagination based on filtered data
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex); // Slicing the filtered data for the current page
  const totalFilteredPages = Math.ceil(filteredData.length / recordsPerPage); // Total pages for filtered data

  return (
    <div className="goodsReceiptTracking-container">
      <div className="goodsReceiptTracking-firstRow">
        <div className="goodsReceiptTracking-addBtn">
          <button className="goodsReceiptTracking-add-button" onClick={handleAddGoodsReceiptTracking}>
            + Add Goods Receipt Tracking
          </button>
        </div>
      </div>

      <div className="goodsReceiptTracking-controls">
        <div className="goodsReceiptTracking-date-range">
          <label>
            From:
            <input type="date" value={startDate} onChange={handleStartDateChange} />
          </label>
          <label>
            To:
            <input type="date" value={endDate} onChange={handleEndDateChange} />
          </label>
          <button className="goodsReceiptTracking-star-button">☆</button>
          <button className="goodsReceiptTracking-ok-button">OK</button>
        </div>
      </div>

      <div className="goodsReceiptTracking-search-N-result">
        <div className="goodsReceiptTracking-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Item Name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="goodsReceiptTracking-results-info">
          <span>Showing {currentData.length} of {filteredData.length} results</span>
          <button className="goodsReceiptTracking-print-button">
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Goods Receipt ID</th>
            <th>Purchase Order ID</th>
            <th>Vendor ID</th>
            <th>Receipt Date</th>
            <th>Item Name/Description</th>
            <th>Quantity Ordered</th>
            <th>Quantity Received</th>
            <th>Unit Price</th>
            <th>Total Amount</th>
            <th>Goods Inspection Status</th>
            <th>Delivery Status</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((test, index) => (
            <tr key={index}>
              <td>{test.reciept_id}</td>
              <td>{test.purchaseOrder.order_id}</td>
              <td>{test.purchaseOrder.vendormanagement.vendor_id}</td>
              <td>{test.receiptDate}</td>
              <td>{test.itemName}</td>
              <td>{test.quantityOrdered}</td>
              <td>{test.quantityRecieved}</td>
              <td>{test.unitPrice}</td>
              <td>{test.totalAmount}</td>
              <td>{test.goodsInspectionStatus}</td>
              <td>{test.deliveryStatus}</td>
              <td>{test.remarks}</td>
              <td>
                <button className="goodsReceiptTracking-edit-button" onClick={() => handleEditGoodsReceiptTracking(test)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="goodsReceiptTracking-modal">
          <div className="goodsReceiptTracking-modal-content">
            <AddGoodsReceiptTracking onClose={handleClosePopup} selectedData={selectedData} onSubmit={handleAddUpdate} />
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
          Page {currentPage} of {totalFilteredPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalFilteredPages))}
          disabled={currentPage === totalFilteredPages}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default GoodsReceiptTracking;
