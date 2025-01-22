import React, { useState, useRef, useEffect } from "react";
import "./AMCMulti.css";
import CustomModal from "../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import AMCDetailsMulti from "./AMCDetailsmulti";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";

const AMCMulti = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [amcDetails, setAmcDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://192.168.143.48:8080/api/amc-details-multi")
      .then((res) => res.json())
      .then((data) => setAmcDetails(data))
      .catch((err) => {
        console.error("Error fetching AMC details:", err);
      });
  }, [showPopup]);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const filteredAmcDetails = amcDetails.filter((detail) => {
    return (
      detail.manualContractNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detail.vendorDTO?.vendorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detail.proposalForAmcMultipleDTO?.proposalTo
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  const handleExport = () => {
    const exportData = filteredAmcDetails.map((detail) => ({
      "Manual Contract No": detail.manualContractNo,
      "Contract From": detail.contractFrom,
      "Contract To": detail.contractTo,
      "Vendor Name": detail.vendorDTO?.vendorName || "",
      "Proposal To": detail.proposalForAmcMultipleDTO?.proposalTo || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AMC_Details");
    XLSX.writeFile(workbook, "AMC_Details.xlsx");
  };

  return (
    <div className="AmcTracker-container">
      <div className="AmcTracker-addBtn">
        <button className="AmcTracker-add-button" onClick={openPopup}>
          + Add New AMC Detail Multi
        </button>
      </div>

      <div className="AmcTracker-search-N-result">
        <div className="AmcTracker-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="AmcTracker-results-info">
          <span>
            Showing {filteredAmcDetails.length} / {amcDetails.length} results
          </span>
          <button className="AmcTracker-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="AmcTracker-print-button"
            onClick={() => window.print()}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="AmcTracker-table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Manual Contract No",
                "Contract From",
                "Contract To",
                "Vendor Name",
                "Proposal To",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="AmcTracker-resizable-th"
                >
                  <div className="AmcTracker-header-content">
                    <span>{header}</span>
                    <div
                      className="AmcTracker-resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAmcDetails.map((detail, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{detail.manualContractNo}</td>
                <td>{detail.contractFrom}</td>
                <td>{detail.contractTo}</td>
                <td>{detail.vendorDTO?.vendorName || ""}</td>
                <td>{detail.proposalForAmcMultipleDTO?.proposalTo || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <AMCDetailsMulti />
        </CustomModal>
      )}
    </div>
  );
};

export default AMCMulti;
