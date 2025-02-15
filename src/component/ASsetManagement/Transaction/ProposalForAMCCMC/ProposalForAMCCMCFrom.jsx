import React, { useState, useRef, useEffect } from "react";
import "./ProposalForAMCCMCFrom.css"; // Adjust the CSS file name
import CustomModal from "../../../../CustomModel/CustomModal";
import ProposalForAMCCMC from "./ProposalForAMCCMCPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
import * as XLSX from "xlsx";

const ProposalForAMCCMCFrom = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [amcProposalData, setAmcProposalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch AMC Proposal data
  useEffect(() => {
    fetch(`${API_BASE_URL}/amc-cms-proposals`)
      .then((res) => res.json())
      .then((data) => {
        setAmcProposalData(data);
        setFilteredData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Search functionality
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = amcProposalData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(lowercasedSearchTerm)
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, amcProposalData]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AMC_CMC_Proposals");
    XLSX.writeFile(workbook, "AMC_CMC_Proposals.xlsx");
  };

  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <h4>Proposal For AMC/CMC Report</h4>
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
    <div className="ProposalForAMCCMCFrom-container">
      <div className="ProposalForAMCCMCFrom-addBtn">
        <button className="ProposalForAMCCMCFrom-add-button" onClick={openPopup}>
          + Add New Proposal for AMC/CMC
        </button>
      </div>

      <div className="ProposalForAMCCMCFrom-search-N-result">
        <div className="ProposalForAMCCMCFrom-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ProposalForAMCCMCFrom-results-info">
          <span>
            Showing {filteredData.length} / {amcProposalData.length} results
          </span>
          <button
            className="ProposalForAMCCMCFrom-print-button"
            onClick={handleExportToExcel}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="ProposalForAMCCMCFrom-print-button"
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
              {["Proposal ID", "Customer Name", "Product Name", "AMC/CMC Type", "Start Date", "End Date", "Price"].map((header, index) => (
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
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.proposalId}</td>
                <td>{item.proposalTo}</td>
                <td>{item.equipmentMasterDTO?.equipmentName}</td>
                <td>{item.type}</td>
                <td>{item.proposalFromDate}</td>
                <td>{item.proposalToDate}</td>
                <td>{item.proposalCharges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <ProposalForAMCCMC closePopup={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default ProposalForAMCCMCFrom;
