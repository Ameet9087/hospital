import React, { useState, useRef, useEffect } from "react";
import "./NewCondemnationReasonMaster.css";
import CondemnationReasonMasterPopUp from "./CondemnationReasonMasterPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput } from "../../../../FloatingInputs";

const NewCondemnationReasonMaster = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [condemnationReasons, setCondemnationReasons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/condemnation-reasons`)
      .then((res) => res.json())
      .then((data) => setCondemnationReasons(data))
      .catch((err) => {
        console.error("Error fetching condemnation reasons:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredCondemnationReasons = condemnationReasons?.filter((reason) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      String(reason.condemnationReasons)?.toLowerCase().includes(lowercasedQuery) ||
      String(reason.description)?.toLowerCase().includes(lowercasedQuery) ||
      String(reason.status)?.toLowerCase().includes(lowercasedQuery)
    );
  });

  // Export to CSV
  const handleExport = () => {
    const headers = ["Condemnation Reason", "Description", "Status"];
    const rows = filteredCondemnationReasons.map((reason) => [
      reason.condemnationReasons,
      reason.description,
      reason.status,
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.map((item) => `"${item}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "condemnation_reasons.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print the table
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Condemnation Reasons</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Condemnation Reasons</h1>
          <table>
            <thead>
              <tr>
                <th>Condemnation Reason</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCondemnationReasons
        .map(
          (reason) => `
                  <tr>
                    <td>${reason.condemnationReasons}</td>
                    <td>${reason.description}</td>
                    <td>${reason.status}</td>
                  </tr>
                `
        )
        .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="newCondemnationReasonMaster-container">
      <div className="newCondemnationReasonMaster-addBtn">
        <button
          className="newCondemnationReasonMaster-add-button"
          onClick={openPopup}
        >
          + Add New Condemnation Reason Master
        </button>
      </div>

      <div className="newCondemnationReasonMaster-search-N-result">
        <div className="newCondemnationReasonMaster-search-bar">
          <FloatingInput
          label={"search"}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="newCondemnationReasonMaster-results-info">
          <span>
            Showing {filteredCondemnationReasons?.length} /{" "}
            {condemnationReasons?.length} results
          </span>
          <button
            className="newCondemnationReasonMaster-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="newCondemnationReasonMaster-print-button"
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
              {["Condemnation Reason", "Description", "Status"].map(
                (header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] }}
                    className="resizable-th"
                  >
                    <div className="header-content">
                      <span>{header}</span>
                      <div
                        className="resizer"
                        onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                      ></div>
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredCondemnationReasons?.map((reason, index) => (
              <tr key={index}>
                <td>{reason.condemnationReasons}</td>
                <td>{reason.description}</td>
                <td>{reason.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <CondemnationReasonMasterPopUp onClose={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default NewCondemnationReasonMaster;
