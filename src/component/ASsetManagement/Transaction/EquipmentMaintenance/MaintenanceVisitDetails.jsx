import React, { useState, useRef, useEffect } from "react";
import "./MaintenanceVisitDetails.css";
import MaintenanceVisitDetailsPopUp from "./MaintenanceVisitDetailsPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";

const MaintenanceVisitDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [maintenanceVisits, setMaintenanceVisits] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/maintenance-visits`)
      .then((res) => res.json())
      .then((data) => setMaintenanceVisits(data))
      .catch((err) => {
        console.error("Error fetching maintenance visits:", err);
      });
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredVisits = maintenanceVisits.filter((visit) => {
    const breakdownDetails = visit.breakdownDetails || {};
    const complaintDTO = breakdownDetails.complaintDTO || {};
    const equipmentMaster = complaintDTO.equipmentMaster || {};

    return (
      visit.visitingDate?.toLowerCase().includes(searchQuery) ||
      visit.visitingTime?.toLowerCase().includes(searchQuery) ||
      visit.repairDetails?.toLowerCase().includes(searchQuery) ||
      breakdownDetails.breakdownDate?.toLowerCase().includes(searchQuery) ||
      breakdownDetails.breakdownTime?.toLowerCase().includes(searchQuery) ||
      equipmentMaster.equipmentName?.toLowerCase().includes(searchQuery) ||
      equipmentMaster.assetNo?.toLowerCase().includes(searchQuery) ||
      equipmentMaster.serialNo?.toLowerCase().includes(searchQuery) ||
      equipmentMaster.modelNo?.toLowerCase().includes(searchQuery)
    );
  });

  const handleExport = () => {
    const csvData = [
      [
        "Visiting Date",
        "Visiting Time",
        "Repair Details",
        "Next Schedule",
        "Breakdown Date",
        "Breakdown Time",
        "Equipment Name",
        "Asset No",
        "Serial No",
        "Model No",
        "Location",
        "Category",
        "Depreciation",
        "Responsible Person",
        "Vendor Name",
        "Vendor Contact"
      ],
      ...filteredVisits.map((visit) => {
        const breakdownDetails = visit.breakdownDetails || {};
        const complaintDTO = breakdownDetails.complaintDTO || {};
        const equipmentMaster = complaintDTO.equipmentMaster || {};
        const assetCateMasterDTO = equipmentMaster.assetCateMasterDTO || {};
        const employee = equipmentMaster.employee || {};
        const vendor = equipmentMaster.vendor || {};

        return [
          visit.visitingDate,
          visit.visitingTime,
          visit.repairDetails,
          visit.nextSchedule,
          breakdownDetails.breakdownDate,
          breakdownDetails.breakdownTime,
          equipmentMaster.equipmentName,
          equipmentMaster.assetNo,
          equipmentMaster.serialNo,
          equipmentMaster.modelNo,
          equipmentMaster.locationPath,
          assetCateMasterDTO.assetCategory,
          assetCateMasterDTO.depreciation,
          `${employee.firstName} ${employee.lastName || ""}`,
          vendor.vendorName,
          vendor.contactNumber
        ];
      })
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MaintenanceVisits.csv";
    link.click();
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
    <div className="MaintenanceVisitDetails-container">
      <div className="MaintenanceVisitDetails-addBtn">
        <button
          className="MaintenanceVisitDetails-add-button"
          onClick={openPopup}
        >
          + Add New Equipment Maintenance Visit Details
        </button>
      </div>

      <div className="MaintenanceVisitDetails-search-N-result">
        <div className="MaintenanceVisitDetails-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="MaintenanceVisitDetails-results-info">
          <span>
            Showing {filteredVisits.length} / {maintenanceVisits.length} results
          </span>
          <button
            className="MaintenanceVisitDetails-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="MaintenanceVisitDetails-print-button"
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
              {["Visiting Date", "Visiting Time", "Repair Details", "Next Schedule", "Breakdown Date", "Breakdown Time", "Equipment Name", "Asset No", "Serial No", "Model No"].map((header, index) => (
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
            {filteredVisits.map((visit, index) => {
              const breakdownDetails = visit.breakdownDetails || {};
              const complaintDTO = breakdownDetails.complaintDTO || {};
              const equipmentMaster = complaintDTO.equipmentMaster || {};
              return (
                <tr key={index}>
                  <td>{visit.visitingDate}</td>
                  <td>{visit.visitingTime}</td>
                  <td>{visit.repairDetails}</td>
                  <td>{visit.nextSchedule}</td>
                  <td>{breakdownDetails.breakdownDate}</td>
                  <td>{breakdownDetails.breakdownTime}</td>
                  <td>{equipmentMaster.equipmentName}</td>
                  <td>{equipmentMaster.assetNo}</td>
                  <td>{equipmentMaster.serialNo}</td>
                  <td>{equipmentMaster.modelNo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <MaintenanceVisitDetailsPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default MaintenanceVisitDetails;
