import React, { useState, useRef, useEffect } from "react";
import "./CondemnationAndDisposal.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import CondemnationAndDisposalPopUp from "./CondemnationAndDisposalPopUp";
import { API_BASE_URL } from "../../../api/api";

const CondemnationAndDisposal = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [condemnationDisposalDetails, setCondemnationDisposalDetails] = useState([]); // State to store API data
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  useEffect(() => {
    fetch(`${API_BASE_URL}/condemnation-disposals`)  // Use the correct API endpoint
      .then((res) => res.json())
      .then((data) => setCondemnationDisposalDetails(data))
      .catch((err) => {
        console.log(err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter condemnation disposal details based on the search query
  const filteredCondemnationDisposalDetails = condemnationDisposalDetails.filter((disposal) => {
    return (
      (disposal.condemnation || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.disposal || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.remarks || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.recommended || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.condemnationDisposalRequestDTO?.type || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.condemnationDisposalRequestDTO?.condemnationMaterial || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.condemnationDisposalRequestDTO?.makeAndModel || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.condemnationDisposalRequestDTO?.expenditureIncurred || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.condemnationDisposalRequestDTO?.totalDowntime || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.condemnationDisposalRequestDTO?.nameOfProposer || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.condemnationDisposalRequestDTO?.nameOfOperator || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.condemnationDisposalRequestDTO?.equipmentMasterDTO?.assetNo || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (disposal.approvalBy?.doctorName || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  

  // Handle Export to Excel
  const handleExport = () => {
    const exportData = condemnationDisposalDetails.map((disposal) => ({
      "Condemnation": disposal.condemnation,
      "Disposal": disposal.disposal,
      "Remarks": disposal.remarks,
      "Recommended": disposal.recommended,
      "Type": disposal.condemnationDisposalRequestDTO.type,
      "Condemnation Material": disposal.condemnationDisposalRequestDTO.condemnationMaterial,
      "Make and Model": disposal.condemnationDisposalRequestDTO.makeAndModel,
      "Expenditure Incurred": disposal.condemnationDisposalRequestDTO.expenditureIncurred,
      "Total Downtime": disposal.condemnationDisposalRequestDTO.totalDowntime,
      "Name of Proposer": disposal.condemnationDisposalRequestDTO.nameOfProposer,
      "Name of Operator": disposal.condemnationDisposalRequestDTO.nameOfOperator,
      "Asset No": disposal.condemnationDisposalRequestDTO.equipmentMasterDTO.assetNo,
      "Doctor Name": disposal.approvalBy.doctorName,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Condemnation and Disposal");
    XLSX.writeFile(workbook, "Condemnation_Disposal.xlsx");
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
    <div className="CondemnationAndDisposal-container">
      <div className="CondemnationAndDisposal-addBtn">
        <button className="CondemnationAndDisposal-add-button" onClick={openPopup}>
          + Add New Condemnation and Disposal
        </button>
      </div>

      <div className="CondemnationAndDisposal-search-N-result">
        <div className="CondemnationAndDisposal-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="CondemnationAndDisposal-results-info">
          <span>
            Showing {filteredCondemnationDisposalDetails.length} / {condemnationDisposalDetails.length} results
          </span>
          <button
            className="CondemnationAndDisposal-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="CondemnationAndDisposal-print-button"
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
                "SN",
                "Condemnation",
                "Disposal",
                "Remarks",
                "Recommended",
                "Type",
                "Condemnation Material",
                "Make and Model",
                "Expenditure Incurred",
                "Total Downtime",
                "Name of Proposer",
                "Name of Operator",
                "Asset No",
                "Doctor Name"
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCondemnationDisposalDetails.map((disposal, index) => (
              <tr key={index}>
                <td>{disposal.condemnationDisposalId}</td>
                <td>{disposal.condemnation}</td>
                <td>{disposal.disposal}</td>
                <td>{disposal.remarks}</td>
                <td>{disposal.recommended}</td>
                <td>{disposal.condemnationDisposalRequestDTO.type}</td>
                <td>{disposal.condemnationDisposalRequestDTO.condemnationMaterial}</td>
                <td>{disposal.condemnationDisposalRequestDTO.makeAndModel}</td>
                <td>{disposal.condemnationDisposalRequestDTO.expenditureIncurred}</td>
                <td>{disposal.condemnationDisposalRequestDTO.totalDowntime}</td>
                <td>{disposal.condemnationDisposalRequestDTO.nameOfProposer}</td>
                <td>{disposal.condemnationDisposalRequestDTO.nameOfOperator}</td>
                <td>{disposal.condemnationDisposalRequestDTO.equipmentMasterDTO.assetNo}</td>
                <td>{disposal.approvalBy.doctorName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <CondemnationAndDisposalPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default CondemnationAndDisposal;
