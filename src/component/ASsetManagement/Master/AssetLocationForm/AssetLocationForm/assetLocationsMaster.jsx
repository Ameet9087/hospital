import React, { useState, useRef, useEffect } from "react";
import "./assetLocationsMaster.css";
import AssetLocationsMasterPopUp from "./assetLocationsMasterPopUp";
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../../api/api";
import { FloatingInput } from "../../../../../FloatingInputs";

const NewAssetLocationsMaster = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [assetLocations, setAssetLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/asset-location`);
      if (!response.ok) {
        throw new Error("Failed to fetch asset locations.");
      }
      const data = await response.json();
      setAssetLocations(data || []);
    } catch (err) {
      console.error("Error fetching asset locations:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showPopup]);

  // Refresh asset locations after adding a new location
  const refreshAssetLocations = () => {
    fetchData();
  };

  // Open and close popup functions
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter asset locations based on search query
  const filteredLocations = assetLocations.filter((location) =>
    [
      location?.subLocation,
      location?.locationType,
      location?.underLocation?.locationName,
      location?.mainLocation?.locationName,
      location?.areaSq,
      location?.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Export table data to CSV
  const exportToCSV = () => {
    const csvContent = [
      ["Sub Location", "Location Type", "Under Location", "Main Location", "Area in Sq Feet", "Status"],
      ...filteredLocations.map((location) => [
        location?.subLocation || "N/A",
        location?.locationType || "N/A",
        location?.underLocation?.locationName || "N/A",
        location?.mainLocation?.locationName || "N/A",
        location?.areaSq || "N/A",
        location?.status || "N/A",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AssetLocations.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Print the table content
  const printTable = () => {
    const printContent = document.querySelector(".table-container").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Asset Locations</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="newAssetLocationsMaster-container">
      <div className="newAssetLocationsMaster-addBtn">
        <button className="newAssetLocationsMaster-add-button" onClick={openPopup}>
          + Add New Asset Locations
        </button>
      </div>
      <div className="newAssetLocationsMaster-search-N-result">
        <div className="newAssetLocationsMaster-search-bar">
          <FloatingInput
          label={"search"}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="newAssetLocationsMaster-results-info">
          <span>
            Showing {filteredLocations.length} / {assetLocations.length} results
          </span>
          <button className="newAssetLocationsMaster-print-button" onClick={exportToCSV}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="newAssetLocationsMaster-print-button" onClick={printTable}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Sub Location", "Location Type", "Under Location", "Main Location", "Area in Sq Feet", "Status"].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <tr key={index}>
                  <td>{location?.subLocation || "N/A"}</td>
                  <td>{location?.locationType || "N/A"}</td>
                  <td>{location?.underLocation?.locationName || "N/A"}</td>
                  <td>{location?.mainLocation?.locationName || "N/A"}</td>
                  <td>{location?.areaSq || "N/A"}</td>
                  <td>{location?.status || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <AssetLocationsMasterPopUp onClose={closePopup} onLocationAdded={refreshAssetLocations} />
        </CustomModal>
      )}
    </div>
  );
};

export default NewAssetLocationsMaster;
