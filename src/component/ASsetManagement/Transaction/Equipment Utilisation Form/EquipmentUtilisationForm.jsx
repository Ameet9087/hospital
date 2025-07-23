import React, { useState, useRef, useEffect } from "react";
import "./Equipmentutilisationform.css";
import CustomModal from "../../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import EquipmentUtilisationFormPopUp from "./EquipmentUtilisationFormPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";

const EquipmentUtilisationForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [utilisationDetails, setUtilisationDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch utilisation data
  useEffect(() => {
    const fetchUtilisationData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-utilisation`);
        if (!response.ok) {
          throw new Error('Failed to fetch utilisation data');
        }
        const data = await response.json();
        setUtilisationDetails(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching utilisation data:", error);
      }
    };

    fetchUtilisationData();
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter utilisation details based on search query
  const filteredUtilisationDetails = utilisationDetails.filter((utilisation) => {
    const searchStr = searchQuery.toLowerCase();
    const equipmentData = utilisation.equipmentMasterDTO || {};
    const patientsStr = (utilisation.ipAdmissionsDTO || [])
      .map(ip => ip.patient?.firstName || '')
      .join(' ');
    const servicesStr = (utilisation.serviceDetailsDTO || [])
      .map(service => service.serviceName || '')
      .join(' ');

    return (
      utilisation.utilisationDate?.toLowerCase().includes(searchStr) ||
      utilisation.remarks?.toLowerCase().includes(searchStr) ||
      equipmentData.equipmentName?.toLowerCase().includes(searchStr) ||
      equipmentData.assetNo?.toLowerCase().includes(searchStr) ||
      equipmentData.serialNo?.toLowerCase().includes(searchStr) ||
      equipmentData.modelNo?.toLowerCase().includes(searchStr) ||
      equipmentData.equipmentNo?.toLowerCase().includes(searchStr) ||
      patientsStr.toLowerCase().includes(searchStr) ||
      servicesStr.toLowerCase().includes(searchStr)
    );
  });

  // Format patient names for display
  const formatPatientNames = (ipAdmissions) => {
    if (!ipAdmissions || !Array.isArray(ipAdmissions)) return '';
    return ipAdmissions
      .map(admission => admission.patient?.firstName || '')
      .filter(name => name)
      .join(', ');
  };

  // Format services for display
  const formatServices = (services) => {
    if (!services || !Array.isArray(services)) return '';
    return services
      .map(service => service.serviceName || '')
      .filter(name => name)
      .join(', ');
  };

  // Handle Export to Excel
  const handleExport = () => {
    const exportData = filteredUtilisationDetails.map((utilisation) => ({
      "Utilisation Date": utilisation.utilisationDate,
      "Equipment Name": utilisation.equipmentMasterDTO?.equipmentName || '',
      "Asset No": utilisation.equipmentMasterDTO?.assetNo || '',
      "Equipment No": utilisation.equipmentMasterDTO?.equipmentNo || '',
      "Serial No": utilisation.equipmentMasterDTO?.serialNo || '',
      "Model No": utilisation.equipmentMasterDTO?.modelNo || '',
      "Patients": formatPatientNames(utilisation.ipAdmissionsDTO),
      "Services": formatServices(utilisation.serviceDetailsDTO),
      "Remarks": utilisation.remarks || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Equipment Utilisation");
    XLSX.writeFile(workbook, "Equipment_Utilisation_Report.xlsx");
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
    <div className="EquipmentUtilisationForm-container">
      <div className="EquipmentUtilisationForm-addBtn">
        <button className="EquipmentUtilisationForm-add-button" onClick={openPopup}>
          + Add New Equipment Utilisation Form
        </button>
      </div>

      <div className="EquipmentUtilisationForm-search-N-result">
        <div className="EquipmentUtilisationForm-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="EquipmentUtilisationForm-results-info">
          <span>
            Showing {filteredUtilisationDetails.length} / {utilisationDetails.length} results
          </span>
          <button
            className="EquipmentUtilisationForm-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="EquipmentUtilisationForm-print-button"
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
                "Utilisation Date",
                "Equipment Name",
                "Asset No",
                "Equipment No",
                "Serial No",
                "Model No",
                "Patients",
                "Services",
                "Remarks"
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
            {filteredUtilisationDetails.map((utilisation, index) => (
              <tr key={index}>
                <td>{utilisation.utilisationDate}</td>
                <td>{utilisation.equipmentMasterDTO?.equipmentName}</td>
                <td>{utilisation.equipmentMasterDTO?.assetNo}</td>
                <td>{utilisation.equipmentMasterDTO?.equipmentNo}</td>
                <td>{utilisation.equipmentMasterDTO?.serialNo}</td>
                <td>{utilisation.equipmentMasterDTO?.modelNo}</td>
                <td>{formatPatientNames(utilisation.ipAdmissionsDTO)}</td>
                <td>{formatServices(utilisation.serviceDetailsDTO)}</td>
                <td>{utilisation.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentUtilisationFormPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default EquipmentUtilisationForm;