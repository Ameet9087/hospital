import React, { useState, useEffect, useRef } from "react";
import "../DisStocks/dispenStockRequisition.css";
import DispenStockRequisitionCreateReq from "./dispenStockRequisitionCreateReq";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import * as XLSX from 'xlsx';
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
function DispenStockRequisition() {
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
   const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

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
      .catch((error) => console.error("Error fetching requisitions:", error));
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

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  //   documentTitle: "Requisition_Report",
  //   pageStyle: `
  //     @page {
  //       size: A4;
  //       margin: 20mm;
  //     }
  //   `,
  // });
  // const handleExport = () => {
  //   const ws = XLSX.utils.table_to_sheet(tableRef.current);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport');
  //   XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx');
  // };
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



  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport');
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx');
  };




  return (
    <div className="dispenStockRequisition-active-imaging-request">
      {showCreateRequisition ? (
        <DispenStockRequisitionCreateReq onClose={closePopups} />
      ) : (
        <>
          <header className="dispenStockRequisition-header">
            <button
              className="dispenStockRequisition-CreateRequisition"
              onClick={handleCreateRequisitionClick}
            >
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
              Showing {requisitions.length}/ {requisitions.length} results
              <button
                className="dispenStockRequisition-print-btn"
                onClick={handleExport}

              >
                <i className="fa-solid fa-file-excel"></i> Export
              </button>
              <button
                className="dispenStockRequisition-print-btn"
                onClick={handlePrint}
              >
                <i className="fa-solid fa-print"></i> Print
              </button>
            </div>
          </div>

          <div className="table-container">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Requisition ID",
                    "Requested By",
                    "Requested From",
                    "Date",
                    "Status",
                    "Action",
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
                        className="dispenStockRequisition-print-btn"
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

      {/* {showModal && ( */}
         <CustomModal
         isOpen={showModal}
         onClose={() => setShowModal(false)}
         title="Requisition Details"
       >
        <div  >
          <div>
            <div className="dispensarystockreqdetail-modal-header">
              <h5
                className="dispensarystockreq-modal-title"
                id="viewModalLabel"
              >
                Requisition Details
              </h5>
            </div>
            <div className="dispensarystockreq-modal-body">
              <>
                <div className="dispensarystockreq-requisition-details">
                  <p>
                    <strong>Requisition No:</strong>{" "}
                    {selectedRequisition.pharmacyRequisitionId}
                  </p>
                  <p>
                    <strong>Requested Store:</strong>{" "}
                    {selectedRequisition.availableQtyInStore}
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
                    {selectedRequisition.items &&
                    selectedRequisition.items.length > 0 ? (
                      selectedRequisition.items.map((item, index) => (
                        <tr key={index}>
                          {/* <td>{item.genericName || "N/A"}</td> */}
                          <td>
                            {item?.addItemDTO?.itemMaster?.itemName || "N/A"}
                          </td>{" "}
                          {/* Display itemName */}{" "}
                          <td>{item.batchNo || "N/A"}</td>
                          <td>{item.unit || "N/A"}</td>
                          <td>{item.requestingQuantity || 0}</td>
                          <td>{item.dispatchQty || 0}</td>
                          <td>
                            {(item.requiredQuantity || 0) -
                              (item.dispatchQty || 0)}
                          </td>
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
                    )}
                  </tbody>
                </table>
              </>
            </div>
            {/* <div className="dispensarystockreq-modal-footer">
              <button
                type="button"
                className="dispensarystockreq-modal-btn"
                onClick={closeModal}
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      {/* )} */}
      </CustomModal>
    </div>
  );
}

export default DispenStockRequisition;
