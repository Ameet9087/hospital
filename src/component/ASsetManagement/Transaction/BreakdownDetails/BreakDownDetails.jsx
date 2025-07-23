import React, { useState, useRef, useEffect } from "react";
import "./BreakDownDetails.css";
import BreakDownDetailsPopUp from "./BreakDownDetailsPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import * as XLSX from "xlsx";

const BreakDownDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [breakDownDetails, setBreakDownDetails] = useState([]); // State to store breakdown data
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  useEffect(() => {
    fetch(`${API_BASE_URL}/breakdowns`)
      .then((res) => res.json())
      .then((data) => setBreakDownDetails(data))
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

  // Filter breakdown details based on the search query
  const filteredBreakDownDetails = breakDownDetails.filter((breakdown) => {
    return (
      breakdown.breakdownDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.breakdownTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.breakdownDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.partsReplaced.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.dateOfInvoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.complaintStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.workCompletionDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.workCompletionTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.remark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.repairableParts.some((part) =>
        part.partName.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      breakdown.guaranteedParts.some((part) =>
        part.partName.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      breakdown.replaceItems.some((item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  // Handle Export to Excel
  const handleExport = () => {
    const exportData = breakDownDetails.map((breakdown) => ({
      "Breakdown Date": breakdown.breakdownDate,
      "Breakdown Time": breakdown.breakdownTime,
      "Details": breakdown.breakdownDetails,
      "Parts Replaced": breakdown.partsReplaced,
      "Company Name": breakdown.companyName,
      "Invoice No": breakdown.invoiceNo,
      "Date of Invoice": breakdown.dateOfInvoice,
      "Complaint Status": breakdown.complaintStatus,
      "Work Completion Date": breakdown.workCompletionDate,
      "Work Completion Time": breakdown.workCompletionTime,
      "Remark": breakdown.remark,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Breakdown Details");
    XLSX.writeFile(workbook, "Breakdown_Details.xlsx");
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
    <div className="BreakDownDetails-container">
      <div className="BreakDownDetails-addBtn">
        <button className="BreakDownDetails-add-button" onClick={openPopup}>
          + Add New Break Down Details
        </button>
      </div>

      <div className="BreakDownDetails-search-N-result">
        <div className="BreakDownDetails-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="BreakDownDetails-results-info">
          <span>
            Showing {filteredBreakDownDetails.length} / {breakDownDetails.length} results
          </span>
          <button
            className="BreakDownDetails-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="BreakDownDetails-print-button"
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
                "Breakdown Date",
                "Breakdown Time",
                "Breakdown Details",
                "Parts Replaced",
                "Company Name",
                "Invoice No",
                "Date of Invoice",
                "Complaint Status",
                "Work Completion Date",
                "Work Completion Time",
                "Remark"
              
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
            {filteredBreakDownDetails.map((breakdown, index) => (
              <tr key={index}>
                <td>{breakdown.breakdownDate}</td>
                <td>{breakdown.breakdownTime}</td>
                <td>{breakdown.breakdownDetails}</td>
                <td>{breakdown.partsReplaced}</td>
                <td>{breakdown.companyName}</td>
                <td>{breakdown.invoiceNo}</td>
                <td>{breakdown.dateOfInvoice}</td>
                <td>{breakdown.complaintStatus}</td>
                <td>{breakdown.workCompletionDate}</td>
                <td>{breakdown.workCompletionTime}</td>
                <td>{breakdown.remark}</td>
                
                
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <BreakDownDetailsPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default BreakDownDetails;
