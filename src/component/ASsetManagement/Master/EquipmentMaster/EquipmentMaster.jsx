import React, { useState, useRef, useEffect } from "react";
import "./EquipmentMaster.css";
import EquipmentMasterPopUp from "./EquipmentMasterPopUp";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

const EquipmentMaster = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [equipmentMasters, setEquipmentMasters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-masters`)
      .then((res) => res.json())
      .then((data) => setEquipmentMasters(data))
      .catch((err) => {
        console.error("Failed to fetch equipment masters:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredEquipmentMasters = equipmentMasters.filter((master) => {
    return (
      master.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      master.equipmentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      master.equipmentOwner?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleExport = () => {
    const csvHeader = [
      "Type",
      "EQP No",
      "Type of Equipment",
      "Equipment Owner",
      "Equipment Name",
    ];
    const csvData = filteredEquipmentMasters.map((master) => [
      master.type,
      master.equipmentMasterId,
      master.typeOfEquipment,
      master.equipmentOwner,
      master.equipmentName,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeader.join(","), ...csvData.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "equipment_masters.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const printContent = `
      <html>
        <head>
          <title>Equipment Masters</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Equipment Masters</h1>
          <table>
            <thead>
              <tr>
                ${[
        "Type",
        "EQP No",
        "Type of Equipment",
        "Equipment Owner",
        "Equipment Name",
      ]
        .map((header) => `<th>${header}</th>`)
        .join("")}
              </tr>
            </thead>
            <tbody>
              ${filteredEquipmentMasters
        .map(
          (master) => `
                    <tr>
                      <td>${master.type}</td>
                      <td>${master.equipmentMasterId}</td>
                      <td>${master.typeOfEquipment}</td>
                      <td>${master.equipmentOwner}</td>
                      <td>${master.equipmentName}</td>
                    </tr>
                  `
        )
        .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="EquipmentMaster-container">
      <div className="EquipmentMaster-addBtn">
        <button className="EquipmentMaster-add-button" onClick={openPopup}>
          + Add New Equipment Master
        </button>
      </div>

      <div className="EquipmentMaster-search-N-result">
        <div className="EquipmentMaster-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="EquipmentMaster-results-info">
          <span>
            Showing {filteredEquipmentMasters.length} /{" "}
            {equipmentMasters.length} results
          </span>
          <button
            className="EquipmentMaster-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="EquipmentMaster-print-button"
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
                "Type",
                "EQP No",
                "Type of Equipment",
                "Equipment Owner",
                "Equipment Name",
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
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEquipmentMasters.map((master, index) => (
              <tr key={index}>
                <td>{master.type}</td>
                <td>{master.equipmentMasterId}</td>
                <td>{master.typeOfEquipment}</td>
                <td>{master.equipmentOwner}</td>
                <td>{master.equipmentName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentMasterPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default EquipmentMaster;
