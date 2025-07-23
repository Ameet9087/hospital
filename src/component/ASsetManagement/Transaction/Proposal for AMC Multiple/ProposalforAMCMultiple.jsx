import React, { useState, useRef, useEffect } from "react";
import "./ProposalForAMCMultiple.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import ProposalforAMCMultiplePopUp from "./ProposalforAMCMultiplePopUp";
import { API_BASE_URL } from "../../../api/api";

const ProposalforAMCMultiple = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [proposals, setProposals] = useState([]); // State to store proposal data
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  useEffect(() => {
    // Fetch data from the API
    fetch(`${API_BASE_URL}/proposals-amc-multiple`)
      .then((res) => res.json())
      .then((data) => setProposals(data))
      .catch((err) => {
        console.error("Error fetching proposals data:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter proposals based on the search query
  const filteredProposals = proposals.filter((proposal) => {
    return (
      proposal.proposalDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.proposalTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.contractType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.proposalFromDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.proposalToDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.proposalCharges.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.proposalDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.previousAmcDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.lastYearAmcCharge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.significantTerms.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.terms.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.approvalBy?.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle Export to Excel
  const handleExport = () => {
    const exportData = filteredProposals.map((proposal) => ({
      "Proposal ID": proposal.proposalId,
      "Proposal Date": proposal.proposalDate,
      "Proposal To": proposal.proposalTo,
      "Contract Type": proposal.contractType,
      "From Date": proposal.proposalFromDate,
      "To Date": proposal.proposalToDate,
      "Charges": proposal.proposalCharges,
      "Details": proposal.proposalDetails,
      "Previous AMC Details": proposal.previousAmcDetails,
      "Last Year AMC Charge": proposal.lastYearAmcCharge,
      "Significant Terms": proposal.significantTerms,
      "Terms": proposal.terms,
      "Approval By": proposal?.approvalBy?.doctorName,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Proposals");
    XLSX.writeFile(workbook, "AMC_Proposals.xlsx");
  };

  return (
    <div className="BreakDownDetails-container">
      <div className="BreakDownDetails-addBtn">
        <button className="BreakDownDetails-add-button" onClick={openPopup}>
          + Add New ProposalforAMCMultiple
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
            Showing {filteredProposals.length} / {proposals.length} results
          </span>
          <button
            className="BreakDownDetails-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="BreakDownDetails-print-button"
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
                "Proposal Date",
                "Proposal To",
                "Contract Type",
                "From Date",
                "To Date",
                "Charges",
                "Details",
                "Previous AMC Details",
                "Last Year AMC Charge",
                "Significant Terms",
                "Terms",
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
            {filteredProposals.map((proposal, index) => (
              <tr key={index}>
                <td>{proposal.proposalDate}</td>
                <td>{proposal.proposalTo}</td>
                <td>{proposal.contractType}</td>
                <td>{proposal.proposalFromDate}</td>
                <td>{proposal.proposalToDate}</td>
                <td>{proposal.proposalCharges}</td>
                <td>{proposal.proposalDetails}</td>
                <td>{proposal.previousAmcDetails}</td>
                <td>{proposal.lastYearAmcCharge}</td>
                <td>{proposal.significantTerms}</td>
                <td>{proposal.terms}</td>
                <td>{proposal?.approvalBy?.doctorName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <ProposalforAMCMultiplePopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default ProposalforAMCMultiple;
