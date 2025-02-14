/* Ajhar Tamboli sSIInventoryRequisition.jsx 19-09-24 */

import React, { useState, useEffect, useRef } from "react";
import "../SSInventory/sSIInventoryRequisition.css";
import { useReactToPrint } from "react-to-print";
import SSSIInvenReqCreateReq from "./sSSIInvenReqCreateReq";
import SSSIInvenReqView from "./sSSIInvenReqView";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";
import SSIReceivedRequisition from "./sSIReceivedRequisition";
import * as XLSX from 'xlsx';
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";

function SSIInventoryRequisition() {
  const { store } = useParams();
  const tableRef = useRef();
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [storeFilter, setStoreFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [showReceived, setShowReceived] = useState(false);

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/inventory-requisitions`)
      .then((response) => response.json())
      .then((data) => {
        setRequisitions(data);
        setFilteredRequisitions(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = requisitions.filter((req) => {
      return (
        (statusFilter === "all" || req.status === statusFilter) &&
        (storeFilter === "" || req.storeName === storeFilter)
      );
    });
    setFilteredRequisitions(filtered);
  }, [statusFilter, storeFilter, requisitions]);

  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };

  const handleViewClick = (req) => {
    console.log(req);

    setDatas(req);
    setShowViewRequisition(true);
  };

  const closePopups = () => {
    setShowCreateRequisition(false);
    setShowViewRequisition(false);
  };
  const handleReceived = (item) => {
    setSelectedItem(item);
    setShowReceived(true);
  };
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'InventeryRequisition'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'InventeryRequisition.xlsx'); // Downloads the Excel file
  }
  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };
  return (
    <div className="sSIInventoryRequisition-active-imaging-request">
      <CustomModal isOpen={showReceived} onClose={() => setShowReceived(false)}>
        <SSIReceivedRequisition
          selectedItem={selectedItem}
          onClose={() => setShowReceived(false)}
        />
      </CustomModal>

      <CustomModal isOpen={showCreateRequisition} onClose={closePopups}>
        {/* <div className="sSIInventoryRequisition-popup-overlay">
          <div className="sSIInventoryRequisition-popup-content"> */}
        <SSSIInvenReqCreateReq />
        {/* </div>
        </div> */}
      </CustomModal>

      {/* Popup for View Requisition */}
      {showViewRequisition && (
        <div className="sSIInventoryRequisition-popup-overlay">
          <div className="sSIInventoryRequisition-popup-content">
            <SSSIInvenReqView onClose={closePopups} requisition={datas} />
          </div>
        </div>
      )}

      <header className="sSIInventoryRequisition-header">
        <button
          className="sSIInventoryRequisition-CreateRequisition"
          onClick={handleCreateRequisitionClick}
        >
          Create Requisition
        </button>
        <div className="sSIInventoryRequisition-status-filters">
          <h4>List by Requisition Status: </h4>
          <label>
            <input
              type="radio"
              name="status-filter"
              value="Pending"
              checked={statusFilter === "Pending"}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            Pending
          </label>
          <label>
            <input
              type="radio"
              name="status-filter"
              value="Complete"
              checked={statusFilter === "Complete"}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            Complete
          </label>
          <label>
            <input
              type="radio"
              name="status-filter"
              value="Cancelled"
              checked={statusFilter === "Cancelled"}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            Cancelled
          </label>
          <label>
            <input
              type="radio"
              name="status-filter"
              value="Withdrawn"
              checked={statusFilter === "Withdrawn"}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            Withdrawn
          </label>
          <label>
            <input
              type="radio"
              name="status-filter"
              value="all"
              checked={statusFilter === "all"}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            All
          </label>
        </div>

        {/* <div className="sSIInventoryRequisition-filter">
          <label><i className="fa-solid fa-filter"></i> Filter by Store:</label>
          <select onChange={(e) => setStoreFilter(e.target.value)}>
            <option value="">ALL</option>
            <option value="GENERAL-INVENTORY">GENERAL-INVENTORY</option>
          </select>
        </div> */}
      </header>
      <div className="sSIInventoryRequisition-controls">
        {/* <div className="sSIInventoryRequisition-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
          <button className="sSIInventoryRequisition-star-button">☆</button>
          <button className="sSIInventoryRequisition-more-btn">-</button>
          <button className="sSIInventoryRequisition-ok-button">OK</button>
        </div> */}
      </div>

      <div className="sSIInventoryRequisition-search-N-results">
        <div className="sSIInventoryRequisition-search-bar">
          
          <FloatingInput 
          label={"Search"} 
          type="search" 
          />
        </div>
        <div className="sSIInventoryRequisition-results-info">
          Showing {filteredRequisitions.length} / {filteredRequisitions.length}{" "}
          results
          <button
            className="sSIInventoryRequisition-print-button"
            onClick={handleExport}
          >
            <i class="fa-solid fa-print"></i> Export
          </button>
          <button
            className="sSIInventoryRequisition-print-button"
            onClick={printList}
          >
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="sSIInventoryRequisition-table-N-paginat">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Req.No</th>
              <th>Requested To</th>
              <th>Date</th>
              <th>Status</th>
              <th>Verification Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequisitions.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>GENERAL-INVENTORY</td>
                <td>{req.requisitionDate}</td>
                <td>{req.status}</td>
                <td>{req.verifyOrNot}</td>
                <td>
                  <div className="sSIInventoryRequisition-view-btn">
                    <button
                      className="sSIInventoryRequisition-view"
                      onClick={() => handleViewClick(req)}
                    >
                      View
                    </button>
                    {req.status == "Dispatch" && (
                      <button
                        className="sSIInventoryRequisition-view"
                        onClick={() => handleReceived(req)}
                      >
                        Received
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="sSIInventoryRequisition-pagination">
          <span>0 to {filteredRequisitions.length} of {filteredRequisitions.length}</span>
          <button disabled>First</button>
          <button disabled>Previous</button>
          <span>Page 1 of 1</span>
          <button disabled>Next</button>
          <button disabled>Last</button>
        </div> */}
      </div>
    </div>
  );
}

export default SSIInventoryRequisition;
