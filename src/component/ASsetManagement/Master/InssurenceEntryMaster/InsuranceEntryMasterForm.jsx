import React, { useState, useRef, useEffect } from "react";
import "./InsuranceEntryMasterForm.css";
import InsuranceEntryMasterFormPopUp from "./InsuranceEntryMasterFormPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput } from "../../../../FloatingInputs";

const NewInsuranceEntryMasterForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [insuranceEntries, setInsuranceEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch insurance entries from API
  useEffect(() => {
    const fetchInsuranceEntries = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/insurance-entries`);
        if (!response.ok) {
          throw new Error("Failed to fetch insurance entries.");
        }
        const data = await response.json();
        setInsuranceEntries(data || []);
      } catch (err) {
        console.error("Error fetching insurance entries:", err);
      }
    };

    fetchInsuranceEntries();
  }, [showPopup]);

  // Function to refresh data after a new entry is saved
  const refreshData = () => {
    fetchInsuranceEntries();
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filtered insurance entries based on search query
  const filteredInsuranceEntries = insuranceEntries.filter((entry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.entryNumber?.toString().toLowerCase().includes(query) ||
      entry.insuranceCompanyName?.toLowerCase().includes(query) ||
      entry.address?.toLowerCase().includes(query) ||
      entry.policyNumber?.toLowerCase().includes(query) ||
      entry.policyType?.toLowerCase().includes(query) ||
      entry.policyFormDate?.toLowerCase().includes(query) ||
      entry.policyToDate?.toLowerCase().includes(query)
    );
  });

  // Export to CSV functionality
  const handleExport = () => {
    const headers = [
      "Entry Number",
      "Insurance Company Name",
      "Address",
      "Policy Number",
      "Policy Type",
      "Policy Form Date",
      "Policy To Date",
    ];
    const rows = filteredInsuranceEntries.map((entry) => [
      entry.entryNumber,
      entry.insuranceCompanyName,
      entry.address,
      entry.policyNumber,
      entry.policyType,
      entry.policyFormDate,
      entry.policyToDate,
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.map((item) => `"${item}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "insurance_entries.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Insurance Entries</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Insurance Entries</h1>
          <table>
            <thead>
              <tr>
                <th>Entry Number</th>
                <th>Insurance Company Name</th>
                <th>Address</th>
                <th>Policy Number</th>
                <th>Policy Type</th>
                <th>Policy Form Date</th>
                <th>Policy To Date</th>
              </tr>
            </thead>
            <tbody>
              ${filteredInsuranceEntries
        .map(
          (entry) => `
                  <tr>
                    <td>${entry.entryNumber}</td>
                    <td>${entry.insuranceCompanyName}</td>
                    <td>${entry.address}</td>
                    <td>${entry.policyNumber}</td>
                    <td>${entry.policyType}</td>
                    <td>${entry.policyFormDate}</td>
                    <td>${entry.policyToDate}</td>
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
    <div className="newInsuranceEntryMasterForm-container">
      <div className="newInsuranceEntryMasterForm-addBtn">
        <button
          className="newInsuranceEntryMasterForm-add-button"
          onClick={openPopup}
        >
          + Add New Insurance Entry Master Form
        </button>
      </div>

      <div className="EquipmentMaster-search-N-result">
        <div className="EquipmentMaster-search-bar">
          <FloatingInput
          label={"search"}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="EquipmentMaster-results-info">
          <span>
            Showing {filteredInsuranceEntries.length} /{" "}
            {insuranceEntries.length} results
          </span>
          <button
            className="EquipmentMaster-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="EquipmentMaster-print-button"
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
                "Entry Number",
                "Insurance Company Name",
                "Address",
                "Policy Number",
                "Policy Type",
                "Policy Form Date",
                "Policy To Date",
              ].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }}>
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
            {filteredInsuranceEntries.length > 0 ? (
              filteredInsuranceEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.entryNumber}</td>
                  <td>{entry.insuranceCompanyName}</td>
                  <td>{entry.address}</td>
                  <td>{entry.policyNumber}</td>
                  <td>{entry.policyType}</td>
                  <td>{entry.policyFormDate}</td>
                  <td>{entry.policyToDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <InsuranceEntryMasterFormPopUp onClose={closePopup} onSave={refreshData} />
        </CustomModal>
      )}
    </div>
  );
};

export default NewInsuranceEntryMasterForm;
