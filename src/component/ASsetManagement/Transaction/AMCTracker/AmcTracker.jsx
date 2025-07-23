import React, { useState, useRef, useEffect } from "react";
import "./AMCTracker.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import AmcTrackerPopUp from "./AmcTrackerPopUp";
import { API_BASE_URL } from "../../../api/api";

const AmcTracker = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [amcTrackers, setAmcTrackers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  
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

  useEffect(() => {
    fetch(`${API_BASE_URL}/amc-tracker`)
      .then((res) => res.json())
      .then((data) => setAmcTrackers(data))
      .catch((err) => {
        console.error("Error fetching AMC tracker data:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredAmcTrackers = amcTrackers.filter((tracker) => {
    return (
      tracker.contractType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tracker.datePeriod.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tracker.assetCateMasterDTO?.assetCategory
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      tracker.vendorDTO?.vendorName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      tracker.equipmentMasterDTO?.equipmentName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      tracker.fromDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tracker.toDate.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleExport = () => {
    const exportData = amcTrackers.map((tracker) => ({
      "Contract Type": tracker.contractType,
      "Date Period": tracker.datePeriod,
      "Category": tracker.assetCateMasterDTO?.assetCategory || "",
      "Supplier": tracker.vendorDTO?.vendorName || "",
      "Equipment Name": tracker.equipmentMasterDTO?.equipmentName || "",
      "From Date": tracker.fromDate,
      "To Date": tracker.toDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AMC Tracker Details");
    XLSX.writeFile(workbook, "AMC_Tracker_Details.xlsx");
  };

  return (
    <div className="AmcTracker-container">
      <div className="AmcTracker-addBtn">
        <button className="AmcTracker-add-button" onClick={openPopup}>
          + Add New AMC Tracker
        </button>
      </div>

      <div className="AmcTracker-search-N-result">
        <div className="AmcTracker-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="AmcTracker-results-info">
          <span>
            Showing {filteredAmcTrackers.length} / {amcTrackers.length} results
          </span>
          <button className="AmcTracker-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="AmcTracker-print-button"
            onClick={handlePrint}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="AmcTracker-table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Contract Type",
                "Date Period",
                "Category",
                "Supplier",
                "Equipment Name",
                "From Date",
                "To Date",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="AmcTracker-resizable-th"
                >
                  <div className="AmcTracker-header-content">
                    <span>{header}</span>
                    <div
                      className="AmcTracker-resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAmcTrackers.map((tracker, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{tracker.contractType}</td>
                <td>{tracker.datePeriod}</td>
                <td>{tracker.assetCateMasterDTO?.assetCategory || ""}</td>
                <td>{tracker.vendorDTO?.vendorName || ""}</td>
                <td>{tracker.equipmentMasterDTO?.equipmentName || ""}</td>
                <td>{tracker.fromDate}</td>
                <td>{tracker.toDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <AmcTrackerPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default AmcTracker;
