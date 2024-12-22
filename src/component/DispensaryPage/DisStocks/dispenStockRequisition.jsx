import React, { useState, useEffect, useRef } from 'react';
import "../DisStocks/dispenStockRequisition.css";
import DispenStockRequisitionCreateReq from './dispenStockRequisitionCreateReq';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { API_BASE_URL } from '../../api/api';

function DispenStockRequisition() {
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const printRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState({
    pharmacyRequisitionId: null,
    availableQtyInStore: null,
    items: [], // Initialize items as an empty array
  });

  // Fetch all requisitions on component mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/requisitions`)
      .then((response) => response.json())
      .then((data) => {
        setRequisitions(data);
        setFilteredRequisitions(data);
      })
      .catch((error) => console.error('Error fetching requisitions:', error));
  }, []);

  // Show the requisition creation popup
  const handleCreateRequisitionClick = () => setShowCreateRequisition(true);
  const closePopups = () => setShowCreateRequisition(false);

  // Handle status filter changes
  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
    setFilteredRequisitions(
      filter === "All" ? requisitions : requisitions.filter((req) => req.status === filter)
    );
  };

  // View requisition details
  const handleViewClick = (requisition) => {
    console.log("Selected Requisition:", requisition);
    setSelectedRequisition({
      pharmacyRequisitionId: requisition.requisitionId,
      availableQtyInStore: requisition.availableQtyInStore,
      items: [], // Start with an empty array to be updated after fetch
    });
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => setShowModal(false);

  // Fetch requisition details when the modal is shown
  useEffect(() => {
    if (showModal && selectedRequisition?.pharmacyRequisitionId) {
      const fetchRequisitionDetails = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/pharmacyRequisitions/requisitonid/${selectedRequisition.pharmacyRequisitionId}`
          );
          const data = response.data;

          // Update the selected requisition with fetched items
          setSelectedRequisition((prev) => ({
            ...prev,
            items: Array.isArray(data) ? data : [], // Ensure the response is an array
          }));
        } catch (error) {
          console.error("Error fetching requisition details:", error);
        }
      };

      fetchRequisitionDetails();
    }
  }, [showModal, selectedRequisition?.pharmacyRequisitionId]);

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Requisition_Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  return (
    <div className="dispenStockRequisition-active-imaging-request">
      {showCreateRequisition ? (
        <DispenStockRequisitionCreateReq onClose={closePopups} />
      ) : (
        <>
          <header className="dispenStockRequisition-header">
            <button className="dispenStockRequisition-CreateRequisition" onClick={handleCreateRequisitionClick}>
              Create Requisition
            </button>
            <div className="dispenStockRequisition-checkBox">
              <label>
                <input
                  type="checkbox"
                  checked={statusFilter === "All"}
                  onChange={() => handleStatusFilterChange("All")}
                />
                All
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={statusFilter === "Completed"}
                  onChange={() => handleStatusFilterChange("Completed")}
                />
                Completed
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={statusFilter === "Pending"}
                  onChange={() => handleStatusFilterChange("Pending")}
                />
                Pending
              </label>
            </div>
          </header>
          <div className="dispenStockRequisition-controls">
            <div className="dispenStockRequisition-date-range">
              <label>
                From:
                <input type="date" defaultValue="2024-08-09" />
              </label>
              <label>
                To:
                <input type="date" defaultValue="2024-08-16" />
              </label>
            </div>
          </div>
          <div className="dispenStockRequisition-search-N-results">
            <div className="dispenStockRequisition-search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search" />
            </div>
            <div className="dispenStockRequisition-results-info">
              Showing {filteredRequisitions.length} / {requisitions.length} results
              <button className="dispenStockRequisition-print-btn" onClick={handlePrint}><i className="fa-solid fa-file-excel"></i> Export</button>
              <button className="dispenStockRequisition-print-btn" onClick={handlePrint}><i className="fa-solid fa-print"></i> Print</button>
            </div>
          </div>
          <div style={{ display: 'none' }}>
            <div ref={printRef}>
              <h2>Requisition Report</h2>
              <p>Date and Time: {new Date().toLocaleString()}</p>
              <table>
                <thead>
                  <tr>
                    <th>Requisition ID</th>
                    <th>Requested By</th>
                    <th>Requested From</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequisitions.map((req, index) => (
                    <tr key={index}>
                      <td>{req.requisitionId}</td>
                      <td>{req.requestBy}</td>
                      <td>{req.requestFrom}</td>
                      <td>{req.date}</td>
                      <td>{req.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="dispenStockRequisition-table-N-paginat">
            <table>
              <thead>
                <tr>
                  <th>Requisition ID</th>
                  <th>Requested By</th>
                  <th>Requested From</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequisitions.map((req, index) => (
                  <tr key={index}>
                    <td>{req.requisitionId}</td>
                    <td>{req.requestBy}</td>
                    <td>{req.requestFrom}</td>
                    <td>{req.date}</td>
                    <td>{req.status}</td>
                    <td>
                      <button className="dispenStockRequisition-view-button">Receive item</button>
                      <button
                        className="dispensarystockrequ-view"
                        onClick={() => handleViewClick(req)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showModal && (
        <div className="dispensarystockreq-modal-dialog">
          <div className="dispensarystockreq-modal-content">
            <div className="dispensarystockreqdetail-modal-header">
              <h5 className="dispensarystockreq-modal-title" id="viewModalLabel">
                Requisition Details
              </h5>
            </div>
            <div className="dispensarystockreq-modal-body">
              <>
                <div className="dispensarystockreq-requisition-details">
                  <p>
                    <strong>Requisition No:</strong> {selectedRequisition.pharmacyRequisitionId}
                  </p>
                  <p>
                    <strong>Requested Store:</strong> {selectedRequisition.availableQtyInStore}
                  </p>
                </div>
                <table className="dispensarystockreq-table">
                  <thead>
                    <tr>
                      <th>Generic Name</th>
                      <th>Medicine Name</th>
                      <th>Item Code</th>
                      <th>Unit</th>
                      <th>Quantity</th>
                      <th>Dispatched Qty</th>
                      <th>Pending Qty</th>
                      <th>Received Qty</th>
                      <th>Status</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRequisition.items && selectedRequisition.items.length > 0 ? (
                      selectedRequisition.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.genericName}</td>
                          <td>{item.itemName || "N/A"}</td>
                          <td>{item.batchNo}</td>
                          <td>{item.unit || "N/A"}</td>
                          <td>{item.requiredQuantity}</td>
                          <td>{item.dispatchQty}</td>
                          <td>{item.requiredQuantity - item.dispatchQty}</td>
                          <td>{item.receivedQty || 0}</td>
                          <td>{item.status || "Pending"}</td>
                          <td>{item.remark || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          Loading or no items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            </div>
            <div className="dispensarystockreq-modal-footer">
              <button
                type="button"
                className="dispensarystockreq-modal-btn"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DispenStockRequisition;
