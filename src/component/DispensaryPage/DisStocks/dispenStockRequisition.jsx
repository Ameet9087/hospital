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
    items: [],
  });

  // Fetch all requisitions on component mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/pharmacyRequisitions`)
      .then((response) => response.json())
      .then((data) => {
        setRequisitions(data);
        console.log("requisitions data", data);
      })
      .catch((error) => console.error('Error fetching requisitions:', error));
  }, []);

  const handleCreateRequisitionClick = () => setShowCreateRequisition(true);
  const closePopups = () => setShowCreateRequisition(false);

 

  const handleViewClick = async (requisition) => {
    console.log("onclick", requisition);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/pharmacyRequisitions/${requisition.pharmacyRequisitionId}`
      );
      const data = response.data;
  
      setSelectedRequisition({
        pharmacyRequisitionId: data.pharmacyRequisitionId, // Use data from response
        availableQtyInStore: data.storeName, // Assuming availableQtyInStore maps to storeName
        items: data.requisitionDetailDTOs || [], // Assign requisitionDetailDTOs to items
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching requisition details:", error);
    }
  };

  const closeModal = () => setShowModal(false);

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
                {requisitions.map((req, index) => (
                  <tr key={index}>
                    <td>{req.pharmacyRequisitionId}</td>
                    <td>{req.requestedBy}</td>
                    <td>{req.storeName}</td>
                    <td>{req.requestedDate}</td>
                    <td>{req.status}</td>
                    <td>
                      {/* <button className="dispenStockRequisition-view-button">Receive item</button> */}
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
                      {/* <th>Generic Name</th> */}
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
                          {/* <td>{item.genericName || "N/A"}</td> */}
                          <td>{item?.addItemDTO?.itemMaster?.itemName  || "N/A"}</td> {/* Display itemName */}                          <td>{item.batchNo || "N/A"}</td>
                          <td>{item.unit || "N/A"}</td>
                          <td>{item.requestingQuantity || 0}</td>
                          <td>{item.dispatchQty || 0}</td>
                          <td>{(item.requiredQuantity || 0) - (item.dispatchQty || 0)}</td>
                          <td>{item.receivedQty || 0}</td>
                          <td>{item.status || "Pending"}</td>
                          <td>{item.remark || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" style={{ textAlign: "center" }}>
                          Loading or no items found.
                        </td>
                      </tr>
                    )
                    }
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
