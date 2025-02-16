import React, { useState, useRef, useEffect } from "react";
import "./DefectRaisingBreackageRequest.css";
import DefectRaisingBreackageRequestPopUp from "./DefectRaisingBreackageRequestPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";

const DefectRaisingBreackageRequest = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [defectRequests, setDefectRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/defect-requests`)
      .then((res) => res.json())
      .then((data) => setDefectRequests([data]))
      .catch((err) => console.error(err));

  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  

  const handleExport = () => {
    const csvData = defectRequests.map((request) => ({
      DefectRequestID: request.defectRequestId,
      NatureOfDefect: request.natureOfDefect,
      ProbableCause: request.probableCause,
      DetailsOfDefectiveParts: request.detailsOfDefectiveParts,
      CostOfRepair: request.costOfRepair,
      LastRepaired: request.lastRepaired,
      LastRepairDate: request.lastRepairDate,
      LastRepairCost: request.lastRepairCost,
      ProspectiveRepair: request.prospectiveRepair,
      ExpectedDurationOfRepair: request.expectedDurationOfRepair,
      LastRepairPart: request.lastRepairPart,
      RecommendedByHOD: request.recommendedByHOD,
      ContractType: request.contractType,
      ContractFrom: request.contractFrom,
      ContractTo: request.contractTo,
      ContractDetails: request.contractDetails,
      HODRemarks: request.hodRemarks,
      EmployeeID: request.employeeDTO?.employeeId,
      Parts: request.parts.length,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(csvData[0]).join(","),
        ...csvData.map((row) => Object.values(row).join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "defect_requests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDefectRequests = defectRequests.filter((request) => {
    const searchTermLower = searchTerm.toLowerCase();
    // Iterate through all keys of the request object and check if any value includes the search term
    return Object.values(request).some((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return value.toString().toLowerCase().includes(searchTermLower);
      }
      if (typeof value === "object" && value !== null) {
        // Handle nested objects
        return Object.values(value).some((nestedValue) =>
          typeof nestedValue === "string" || typeof nestedValue === "number"
            ? nestedValue.toString().toLowerCase().includes(searchTermLower)
            : false
        );
      }
      return false;
    });
  });

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
    <div className="DefectRaisingBreackageRequest-container">
      <div className="DefectRaisingBreackageRequest-addBtn">
        <button
          className="DefectRaisingBreackageRequest-add-button"
          onClick={openPopup}
        >
          + Add New Defect Raising/Breackage Requests
        </button>
      </div>

      <div className="DefectRaisingBreackageRequest-search-N-result">
        <div className="DefectRaisingBreackageRequest-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="DefectRaisingBreackageRequest-results-info">
          <span>
            Showing {filteredDefectRequests.length} / {defectRequests.length} results
          </span>
          <button
            className="DefectRaisingBreackageRequest-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="DefectRaisingBreackageRequest-print-button"
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
              {["Defect Request ID", "Nature of Defect", "Probable Cause", "Details of Defective Parts", "Cost of Repair", "Last Repaired", "Last Repair Date", "Last Repair Cost", "Prospective Repair", "Expected Duration of Repair", "Last Repair Part", "Recommended By HOD", "Contract Details"].map((header, index) => (
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
            {filteredDefectRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.defectRequestId}</td>
                <td>{request.natureOfDefect}</td>
                <td>{request.probableCause}</td>
                <td>{request.detailsOfDefectiveParts}</td>
                <td>{request.costOfRepair}</td>
                <td>{request.lastRepaired}</td>
                <td>{request.lastRepairDate}</td>
                <td>{request.lastRepairCost}</td>
                <td>{request.prospectiveRepair}</td>
                <td>{request.expectedDurationOfRepair}</td>
                <td>{request.lastRepairPart}</td>
                <td>{request.recommendedByHOD}</td>

                <td>{request.contractDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <DefectRaisingBreackageRequestPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default DefectRaisingBreackageRequest;
