import React, { useState, useEffect, useRef } from "react";
import "./CondemnationanddisposalRequest.css";
import * as XLSX from "xlsx";
import CustomModal from "../../../../CustomModel/CustomModal";
import CondemnationAndDisposalRequestPopUp from "./CondemnationAndDisposalRequestPopUp";
import { API_BASE_URL } from "../../../api/api";

const CondemnationAndDisposalRequest = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]); // State to store the fetched data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const tableRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${API_BASE_URL}/condemnationRequest`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter data based on the search query
  const filteredData = data.filter((item) => {
    return (
      item.capitalItem?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.condemnationMaterial?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.makeAndModel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameOfProposer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameOfOperator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.remarks?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Export data to Excel
  const handleExport = () => {
    const exportData = data.map((item, index) => ({
      "S/N": index + 1,
      "Capital Item": item.capitalItem,
      "Type": item.type,
      "Condemnation Material": item.condemnationMaterial,
      "Make and Model": item.makeAndModel,
      "Life Recommended": item.lifeRecommended,
      "Expenditure Incurred": item.expenditureIncurred,
      "Total Downtime": item.totalDowntime,
      "Name of Proposer": item.nameOfProposer,
      "Name of Operator": item.nameOfOperator,
      "Remarks": item.remarks,
      "Recommended": item.recommended ? "Yes" : "No",
      "Condemnation": item.condemnation ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Condemnation Requests");
    XLSX.writeFile(workbook, "Condemnation_Requests.xlsx");
  };
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


  return (
    <div className="CondemnationAndDisposalRequest-container">
      <div className="CondemnationAndDisposalRequest-addBtn">
        <button
          className="CondemnationAndDisposalRequest-add-button"
          onClick={openPopup}
        >
          + Add New Condemnation and Disposal
        </button>
      </div>

      <div className="CondemnationAndDisposalRequest-search-N-result">
        <div className="CondemnationAndDisposalRequest-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="CondemnationAndDisposalRequest-results-info">
          <span>
            Showing {filteredData.length} / {data.length} results
          </span>
          <button
            className="CondemnationAndDisposalRequest-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="CondemnationAndDisposalRequest-print-button"
            onClick={handlePrint}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef} className="resizable-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Capital Item</th>
              <th>Type</th>
              <th>Condemnation Material</th>
              <th>Make and Model</th>
              <th>Life Recommended</th>
              <th>Expenditure Incurred</th>
              <th>Total Downtime</th>
              <th>Name of Proposer</th>
              <th>Name of Operator</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.capitalItem}</td>
                <td>{item.type}</td>
                <td>{item.condemnationMaterial}</td>
                <td>{item.makeAndModel}</td>
                <td>{item.lifeRecommended}</td>
                <td>{item.expenditureIncurred}</td>
                <td>{item.totalDowntime}</td>
                <td>{item.nameOfProposer}</td>
                <td>{item.nameOfOperator}</td>
                <td>{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <CondemnationAndDisposalRequestPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default CondemnationAndDisposalRequest;
