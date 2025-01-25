import React, { useState, useEffect, useRef } from 'react';
import './PurchaseOrder.css'; // Ensure you have this CSS file
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../api/api';
import axios from 'axios';

const SubstoreDispatchCom = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [requestdata, setRequestData] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedRequisition, setSelectedRequisition] = useState(null); // Selected requisition data for modal

  useEffect(() => {
    // Fetch requisition data
    fetch(`${API_BASE_URL}/pharmacyRequisitions`)
      .then((response) => response.json())
      .then((data) => {
        setRequestData(data);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching requisitions:', error));
  }, []);

  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Convert table to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Add sheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Download the file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Trigger the browser print dialog
  };

  // Function to open modal with requisition details
  const openModal = (requisition) => {
    setSelectedRequisition(requisition);
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRequisition(null);
  };

  // Function to fetch detailed requisition data
  const handleViewClick = async (requisition) => {
    console.log('View clicked for requisition:', requisition);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/pharmacyRequisitions/${requisition.pharmacyRequisitionId}`
      );
      const data = response.data;

      // Set selected requisition with detailed data
      setSelectedRequisition({
        pharmacyRequisitionId: data.pharmacyRequisitionId,
        storeName: data.storeName,
        items: data.requisitionDetailDTOs || [],
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching requisition details:', error);
    }
  };

  // Function to handle the save action
  const handleSave = async () => {
    const updatedItems = selectedRequisition.items.map((item) => ({
      requisitionDetailId: item.requisitionDetailId, // Include the ID if it's available
      addItem: {
        addItemId: item.addItemDTO?.addItemId || item.addItemDTO?.itemMaster?.id, // Fallback to the correct value
      },
      dispatchQty: item.dispatchQty || 0, // Ensure no undefined values
      requestingQuantity: item.requestingQuantity || 0, // If requestingQuantity is available
      date: item.date || new Date().toISOString().split('T')[0], // Default to today's date
      time: item.time || new Date().toLocaleTimeString(), // Default to the current time
      status: item.status || 'Pending', // If status is available, otherwise default to 'Pending'
      remark: item.remark || '', // Ensure remarks are included if available
      pharmacyRequisition: {
        pharmacyRequisitionId: selectedRequisition.pharmacyRequisitionId, // Include pharmacyRequisitionId
      },
    }));

    console.log(updatedItems); // Logging for debugging

    try {
      const response = await axios.put(
        `${API_BASE_URL}/hospital/${selectedRequisition.pharmacyRequisitionId}/update-stock`,
        updatedItems
      );
      alert(response.data); // Alert with success message
      setShowModal(false); // Close the modal after saving
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  };


  return (
    <div className="purchase-order-container">
      <div className="purchase-order-header"></div>

      {/* Date range filter */}
      <div className="purchase-data-order">
        <div className="purchase-order-date-range">
          <label htmlFor="from-date">From:</label>
          <input type="date" id="from-date" />
          <label htmlFor="to-date">To:</label>
          <input type="date" id="to-date" />
        </div>
      </div>

      {/* Search and action buttons */}
      <div className="purchase-order-search-container">
        <input type="text" className="purchase-order-search-box" placeholder="Search" />
        <div className="purchase-order-search-right">
          <span className="purchase-results-count-span">Showing 0 / 0 results</span>
          <button className="purchase-order-print-button" onClick={handleExport}>
            Export
          </button>
          <button className="purchase-order-print-button" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {['Req.No', 'Requested By', 'Requested From', 'Date', 'Status', 'Dispatch qty', 'Remark', 'Actions'].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requestdata.length > 0 ? (
              requestdata.map((item, index) => (
                <tr key={index}>
                  <td>{item.pharmacyRequisitionId}</td>
                  <td>{item.requestedBy || 'N/A'}</td>
                  <td>{item.storeName}</td>
                  <td>{item.requestedDate || 'N/A'}</td>
                  <td>{item.status}</td>
                  <td>{item.dispatchQty}</td>
                  <td>{item.remark || 'N/A'}</td>
                  <td>
                    <button onClick={() => handleViewClick(item)}>View item</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center' }}>
                  Loading or no items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for requisition details */}
      {showModal && (
        <div className="dispensarystockreq-modal-dialog">
          <div className="dispensarystockreq-modal-content">
            <div className="dispensarystockreqdetail-modal-header">
              <h5 className="dispensarystockreq-modal-title" id="viewModalLabel">
                Requisition Details
              </h5>
            </div>
            <div className="dispensarystockreq-modal-body">
              <div className="dispensarystockreq-requisition-details">
                <p>
                  <strong>Requisition No:</strong> {selectedRequisition.pharmacyRequisitionId}
                </p>
                <p>
                  <strong>Requested Store:</strong> {selectedRequisition.storeName}
                </p>
              </div>
              <table className="dispensarystockreq-table">
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Item Code</th>
                    <th>Unit</th>
                    <th>Required Quantity</th>
                    <th>Dispatched Qty</th>
                    <th>Available Qty in PHARMA</th>
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
                        <td>{item?.addItemDTO?.itemMaster?.itemName || 'N/A'}</td>
                        <td>{item.batchNo || 'N/A'}</td>
                        <td>{item.unit || 'N/A'}</td>
                        <td>{item.requestingQuantity || 0}</td>
                        <td>
                          {/* Input box for Dispatch Qty */}
                          <input
                            type="number"
                            value={item.dispatchQty || 0}
                            onChange={(e) => {
                              const updatedItems = [...selectedRequisition.items];
                              updatedItems[index].dispatchQty = parseInt(e.target.value, 10);
                              setSelectedRequisition({ ...selectedRequisition, items: updatedItems });
                            }}
                          />
                        </td>
                        <td>{item.addItemDTO.itemQty || 'N/A'}</td>
                        <td>{(item.requestingQuantity || 0) - (item.dispatchQty || 0)}</td>
                        <td>{item.receivedQty || 0}</td>
                        <td>{item.status || 'Pending'}</td>
                        <td>{item.remark || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center' }}>
                        Loading or no items found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="dispensarystockreq-modal-footer">
              <button type="button" className="dispensarystockreq-modal-btn" onClick={closeModal}>
                Close
              </button>
              <button type="button" className="dispensarystockreq-modal-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubstoreDispatchCom;