import React, { useState, useRef, useEffect } from "react";
import "./NewEquipmentInstallationDetails.css";
import EquipmentInstallationDetailsPopUp from "./EquipmentInstallationDetailsPopUp";
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../../api/api";

const NewEquipmentInstallationDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [installations, setInstallations] = useState([]); // To store installation details

  useEffect(() => {
    // Fetch installation data
    fetch(`${API_BASE_URL}/installations`)
      .then((res) => res.json())
      .then((data) => setInstallations(data)) // Store data in state
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
    <div className="newEquipmentInstallationDetails-container">
      <div className="newEquipmentInstallationDetails-addBtn">
        <button
          className="newEquipmentInstallationDetails-add-button"
          onClick={openPopup}
        >
          + Add New Equipment Installation Details
        </button>
      </div>

      <div className="newEquipmentInstallationDetails-search-N-result">
        <div className="newEquipmentInstallationDetails-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="newEquipmentInstallationDetails-results-info">
          <span>
            Showing {installations.length} / {installations.length} results
          </span>
          <button className="newEquipmentInstallationDetails-print-button">
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="newEquipmentInstallationDetails-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Installation No",
                "Equipment Name",
                "Serial No",
                "Location",
                "Asset No",
                "Software Version No",
                "Installation Date",
                "Installation Time",
                "Installed By",
                "Technical Details",
                "Remarks",
                "Warranty Details",
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
            {installations.length > 0 &&
              installations.map((installation, index) => (
                <tr key={index}>
                  <td>{installation.installationId}</td>
                  <td>{installation.equipmentDTO.equipmentName}</td>
                  <td>{installation.equipmentDTO.serialNo}</td>
                  <td>{installation.equipmentDTO.assetLocationMaster.subLocation}</td>
                  <td>{installation.equipmentDTO.assetNo}</td>
                  <td>{installation.equipmentDTO.softwareVersion}</td>
                  <td>{installation.installationDate}</td>
                  <td>{installation.installationTime}</td>
                  <td>{installation.installedBy}</td>
                  <td>{installation.technicalDetails}</td>
                  <td>{installation.remark}</td>
                  <td>{installation.equipmentDTO.warrantyDetails}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentInstallationDetailsPopUp onClose={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default NewEquipmentInstallationDetails;
