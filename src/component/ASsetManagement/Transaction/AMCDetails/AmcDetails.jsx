import React, { useState, useRef, useEffect } from "react";
import "./AmcDetails.css";
import CustomModal from "../../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import AmcDetailsForm from "./AmcDetailsForm";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
const AmcDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [amcDetails, setAmcDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/amc-details`)
      .then((res) => res.json())
      .then((data) => setAmcDetails(data))
      .catch((err) => {
        console.error("Error fetching AMC details data:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredAmcDetails = amcDetails.filter((detail) => {
    return (
      detail.contractType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detail.manualContractNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detail.equipmentMasterDTO?.equipmentName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      detail.equipmentMasterDTO?.vendor?.vendorName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      detail.contractFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detail.contractTo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleExport = () => {
    const exportData = amcDetails.map((detail) => ({
      "Contract Type": detail.contractType,
      "Manual Contract No": detail.manualContractNo,
      "Equipment Name": detail.equipmentMasterDTO?.equipmentName || "",
      "Supplier": detail.equipmentMasterDTO?.vendor?.vendorName || "",
      "Contract From": detail.contractFrom,
      "Contract To": detail.contractTo,
      "Cost of Contract": detail.costOfContract,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AMC Details");
    XLSX.writeFile(workbook, "AMC_Details.xlsx");
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
    <div className="AmcTracker-container">
      <div className="AmcTracker-addBtn">
        <button className="AmcTracker-add-button" onClick={openPopup}>
          + Add New AMC Detail
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
            onClick={handlePrint}
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
                "Contract Type",
                "Manual Contract No",
                "Equipment Name",
                "Supplier",
                "Contract From",
                "Contract To",
                "Cost of Contract",
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
                <td>{detail.contractType}</td>
                <td>{detail.manualContractNo}</td>
                <td>{detail.equipmentMasterDTO?.equipmentName || ""}</td>
                <td>{detail.equipmentMasterDTO?.vendor?.vendorName || ""}</td>
                <td>{detail.contractFrom}</td>
                <td>{detail.contractTo}</td>
                <td>{detail.costOfContract}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <AmcDetailsForm />
        </CustomModal>
      )}
    </div>
  );
};

export default AmcDetails;
