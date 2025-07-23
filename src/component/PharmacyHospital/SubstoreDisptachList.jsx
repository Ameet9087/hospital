import React, { useState, useEffect, useRef } from "react";
import "./PurchaseOrder.css"; // Ensure you have this CSS file
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../api/api";
import axios from "axios";

const SubstoreDisptachList = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [requisitions, setRequisitions] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedRequisition, setSelectedRequisition] = useState(null); // Selected requisition data for modal

  useEffect(() => {
    fetch(`${API_BASE_URL}/subpharm-requisitions`)
      .then((response) => response.json())
      .then((data) => setRequisitions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Convert table to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseOrderReport"); // Add sheet to workbook
    XLSX.writeFile(wb, "PurchaseOrderReport.xlsx"); // Download the file
  };

  // Function to trigger print
  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
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
    console.log(requisition);

    setShowModal(true);
    setSelectedRequisition(requisition);
  };

  // Function to handle the save action
  const handleSave = async () => {
    const updateData = selectedRequisition?.subPharmRequisitionItems?.map(
      (item) => ({
        subPharmRequisitionItemId: item.subPharmRequisitionItemId,
        dispatchQuantity: item.dispatchQty,
      })
    );
    console.log(updateData); // Logging for debugging

    try {
      const response = await fetch(`${API_BASE_URL}/subpharm-requisitions/${selectedRequisition.pharRequisitionId}/update?status=Dispatch`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Update successfully');
        setShowModal(false);
      } else {
        console.error('Error updating requisition:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="purchase-order-container">
      <div className="purchase-order-header"></div>
      <div className="purchase-order-search-container">
        <input
          type="text"
          className="purchase-order-search-box"
          placeholder="Search"
        />
        <div className="purchase-order-search-right">
          <span className="purchase-results-count-span">
            Showing 0 / 0 results
          </span>
          <button
            className="purchase-order-print-button"
            onClick={handleExport}
          >
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
              {[
                "Req.No",
                "Requested From",
                "Date",
                "Status",
                "Remark",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requisitions.length > 0 ? (
              requisitions.map((item, index) => (
                <tr key={index}>
                  <td>{item.pharRequisitionId}</td>
                  <td>{item.subStore.subStoreName}</td>
                  <td>{item.requestedDate || "N/A"}</td>
                  <td>{item.status}</td>
                  <td>{item.remarks || "N/A"}</td>
                  <td>
                    <button className="setting-terms-add-terms-btn" onClick={() => handleViewClick(item)}>
                      View item
                    </button>
                  </td>
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
      </div>

      {/* Modal for requisition details */}
      {showModal && (
        <div className="dispensarystockreq-modal-dialog">
          <div className="dispensarystockreq-modal-content">
            <div className="dispensarystockreqdetail-modal-header">
              <h5
                className="dispensarystockreq-modal-title"
                id="viewModalLabel"
              >
                Requisition Details
              </h5>
            </div>
            <div className="dispensarystockreq-modal-body">
              <div className="dispensarystockreq-requisition-details">
                <p>
                  <strong>Requisition No:</strong>{" "}
                  {selectedRequisition.pharRequisitionId}
                </p>
                <p>
                  <strong>Requested Store:</strong>{" "}
                  {selectedRequisition?.subStore?.subStoreName}
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
                  {
                    selectedRequisition.subPharmRequisitionItems.length > 0 ? (
                      selectedRequisition.subPharmRequisitionItems.map(
                        (item, index) => (
                          <tr key={index}>
                            <td>{item?.items?.itemMaster?.itemName || "N/A"}</td>
                            <td>{item?.items?.batchNo || "N/A"}</td>
                            <td>
                              {item?.items?.itemMaster?.unitsOfMeasurement.name ||
                                "N/A"}
                            </td>
                            <td>{item?.requiredQuantity || 0}</td>
                            <td>
                              {/* Input box for Dispatch Qty */}
                              <input
                                type="number"
                                value={item?.dispatchQty || 0}
                                onChange={(e) => {
                                  const updatedItems =
                                    selectedRequisition.subPharmRequisitionItems.map(
                                      (currentItem, idx) => {
                                        // Update the dispatchQty of the correct item
                                        if (idx === index) {
                                          return {
                                            ...currentItem,
                                            dispatchQty:
                                              parseInt(e.target.value, 10) || 0, // Handle case where input might be empty
                                          };
                                        }
                                        return currentItem;
                                      }
                                    );

                                  // Update the state with the modified items array
                                  setSelectedRequisition({
                                    ...selectedRequisition,
                                    subPharmRequisitionItems: updatedItems,
                                  });
                                }}
                              />
                            </td>
                            <td>{item.items?.itemQty || "N/A"}</td>
                            <td>
                              {(item?.requiredQuantity || 0) -
                                (item.dispatchQty || 0)}
                            </td>
                            <td>{item?.receivedQty || 0}</td>
                            <td>{selectedRequisition?.status || "Pending"}</td>
                            <td>{item?.remark || "N/A"}</td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          Loading or no items found.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
            <div className="dispensarystockreq-modal-footer">
              <button
                type="button"
                className="setting-terms-add-terms-btn"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="setting-terms-add-terms-btn"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubstoreDisptachList;
