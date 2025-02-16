import React, { useState, useRef, useEffect } from "react";
import "./MaintenanceFileMaster.css";
import CustomModal from "../../../../CustomModel/CustomModal";
import MaintenanceFileMasterPopUp from "../MaintenanceFileMaster/MaintenanceFileMasterPopUp";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { FloatingInput } from "../../../../FloatingInputs";

const MaintenanceTypeMaster = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${API_BASE_URL}/maintenance-type`)
      .then((res) => res.json())
      .then((data) => setMaintenanceTypes(data))
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter rows based on search query
  const filteredRows = maintenanceTypes.filter((type) =>
    Object.values(type)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Export table data to CSV
  const handleExport = () => {
    const headers = ["Type Name", "Code", "Description", "Status"];
    const rows = filteredRows.map((type) => [
      type.typeName,
      type.code,
      type.description,
      type.status,
    ]);
    const csvContent =
      [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "maintenance_types.csv");
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
          <title>Maintenance Types</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Maintenance Types</h1>
          <table>
            <thead>
              <tr>
                <th>Type Name</th>
                <th>Code</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRows
        .map(
          (type) => `
                  <tr>
                    <td>${type.typeName}</td>
                    <td>${type.code}</td>
                    <td>${type.description}</td>
                    <td>${type.status}</td>
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
    <div className="maintenanceTypeMaster-container">
      <div className="maintenanceTypeMaster-addBtn">
        <button className="maintenanceTypeMaster-add-button" onClick={openPopup}>
          + Add New Maintenance Type
        </button>
      </div>

      <div className="maintenanceTypeMaster-search-N-result">
        <div className="maintenanceTypeMaster-search-bar">
          <FloatingInput
          label={"search"}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="maintenanceTypeMaster-results-info">
          <span>
            Showing {filteredRows.length} / {maintenanceTypes.length} results
          </span>
          <button
            className="maintenanceTypeMaster-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="maintenanceTypeMaster-print-button"
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
              {["Type Name", "Code", "Description", "Status"].map((header, index) => (
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
            {filteredRows.map((maintenanceType, index) => (
              <tr key={index}>
                <td>{maintenanceType.typeName}</td>
                <td>{maintenanceType.code}</td>
                <td>{maintenanceType.description}</td>
                <td>{maintenanceType.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <MaintenanceFileMasterPopUp onClose={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default MaintenanceTypeMaster;
