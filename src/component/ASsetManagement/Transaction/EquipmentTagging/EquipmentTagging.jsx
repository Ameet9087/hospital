import React, { useState, useRef, useEffect } from "react";
import "./EquipmentTagging.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import EquipmentTaggingForm from "./EquipmentTaggingForm";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../../../api/api";

const EquipmentTagging = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [equipmentTaggings, setEquipmentTaggings] = useState([]);
  const [filteredTaggings, setFilteredTaggings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch equipment tagging data
  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-tagging`)
      .then((res) => res.json())
      .then((data) => {
        setEquipmentTaggings(data);
        setFilteredTaggings(data);
      })
      .catch((err) => {
        console.error("Error fetching equipment tagging data:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = equipmentTaggings.filter((tagging) =>
      `${tagging.equipmentMasterDTO?.equipmentName || ""} ${tagging.partDTO?.partName || ""} ${tagging.status || ""}`
        .toLowerCase()
        .includes(query)
    );

    setFilteredTaggings(filtered);
  };

  // Handle export to Excel
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredTaggings.map((tagging) => ({
        "Equipment Name": tagging.equipmentMasterDTO?.equipmentName || "N/A",
        "Item Name": tagging.partDTO?.partName || "N/A",
        Status: tagging.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Equipment Tagging");
    XLSX.writeFile(workbook, "Equipment_Tagging.xlsx");
  };

  // Handle print functionality
  // Handle print functionality
const handlePrint = () => {
    const printContent = tableRef.current.outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Equipment Tagging Report</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };
  

  return (
    <div className="Equipment-Tagging-container">
      {/* Add New Equipment Tagging Button */}
      <div className="Equipment-Tagging-addBtn">
        <button className="Equipment-Tagging-add-button" onClick={openPopup}>
          + Add New Equipment Tagging
        </button>
      </div>

      {/* Search and Result Info */}
      <div className="Equipment-Tagging-search-N-result">
        <div className="Equipment-Tagging-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="Equipment-Tagging-results-info">
          <span>
            Showing {filteredTaggings?.length} / {equipmentTaggings?.length} results
          </span>
          <button
            className="Equipment-Tagging-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="Equipment-Tagging-print-button"
            onClick={handlePrint}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Equipment Name", "Item Name", "Status"].map((header, index) => (
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
            {filteredTaggings.map((tagging) => (
              <tr key={tagging.taggingId}>
                <td>{tagging.equipmentMasterDTO?.equipmentName || "N/A"}</td>
                <td>{tagging.partDTO?.partName || "N/A"}</td>
                <td>{tagging.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Form */}
      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentTaggingForm />
        </CustomModal>
      )}
    </div>
  );
};

export default EquipmentTagging;
