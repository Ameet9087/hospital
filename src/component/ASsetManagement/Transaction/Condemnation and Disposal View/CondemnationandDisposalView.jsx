import React, { useState, useRef, useEffect } from "react";
import "./CondemnationAnddisposalView.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../../../api/api";
import CondemnationandDisposalViewViewPopUp from "./CondemnationandDisposalViewPopUp";

const CondemnationandDisposalViewView = () => {
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

  return (
    <div className="CondemnationandDisposalView-container">
      <div className="CondemnationandDisposalView-addBtn">
        <button className="CondemnationandDisposalView-add-button" onClick={openPopup}>
          + Add New Condemnation and Disposal View
        </button>
      </div>

      <div className="CondemnationandDisposalView-search-N-result">
        <div className="CondemnationandDisposalView-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="CondemnationandDisposalView-results-info">
          <span>
            Showing {filteredBreakDownDetails.length} / {breakDownDetails.length} results
          </span>
          <button
            className="CondemnationandDisposalView-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="CondemnationandDisposalView-print-button"
            onClick={() => window.print()}
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
                "Approval By",

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
                <td>{breakdown.sN}</td>
                <td>{breakdown.approvedBy}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <CondemnationandDisposalViewViewPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default CondemnationandDisposalViewView;
