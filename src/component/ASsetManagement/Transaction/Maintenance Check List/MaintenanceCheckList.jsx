import React, { useState, useRef, useEffect } from "react";
import "./Maintenancechecklist.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import MaintenanceChecklistPopUp from "./MaintenanceChecklistPopUp";
import { API_BASE_URL } from "../../../api/api";

const MaintenanceCheckList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [maintenanceData, setMaintenanceData] = useState([]); // State to store maintenance checklist data
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  useEffect(() => {
    fetch(`${API_BASE_URL}/maintenance-checklist`)
      .then((res) => res.json())
      .then((data) => setMaintenanceData(data))
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

  // Filter maintenance data based on the search query
  const filteredMaintenanceData = maintenanceData.filter((item) => {
    return (
      item.checkListType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.remarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.checkListStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.checkListRemarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.maintenanceChecklistTypeMaster.typeofChecklist
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.equipmentMasterDTO.equipmentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.equipmentMasterDTO.assetNo
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  // Handle Export to Excel
  const handleExport = () => {
    const exportData = maintenanceData.map((item) => ({
      "Checklist Type": item.checkListType,
      Remarks: item.remarks,
      Status: item.checkListStatus,
      "Checklist Remarks": item.checkListRemarks,
      "Type of Checklist": item.maintenanceChecklistTypeMaster.typeofChecklist,
      "Equipment Name": item.equipmentMasterDTO.equipmentName,
      "Asset No": item.equipmentMasterDTO.assetNo,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Maintenance Data");
    XLSX.writeFile(workbook, "Maintenance_Checklist.xlsx");
  };
  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <h4>Maintainance CHecklist Report</h4>
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
    <div className="MaintenanceCheckList-container">
      <div className="MaintenanceCheckList-addBtn">
        <button className="MaintenanceCheckList-add-button" onClick={openPopup}>
          + Add New Maintenance Check list
        </button>
      </div>

      <div className="MaintenanceCheckList-search-N-result">
        <div className="MaintenanceCheckList-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="MaintenanceCheckList-results-info">
          <span>
            Showing {filteredMaintenanceData.length} / {maintenanceData.length} results
          </span>
          <button
            className="MaintenanceCheckList-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="MaintenanceCheckList-print-button"
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
              {["Checklist Type", "Remarks", "Status", "Checklist Remarks", "Type of Checklist", "Equipment Name", "Asset No"].map((header, index) => (
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
            {filteredMaintenanceData.map((item, index) => (
              <tr key={index}>
                <td>{item.checkListType}</td>
                <td>{item.remarks}</td>
                <td>{item.checkListStatus}</td>
                <td>{item.checkListRemarks}</td>
                <td>{item.maintenanceChecklistTypeMaster.typeofChecklist}</td>
                <td>{item.equipmentMasterDTO.equipmentName}</td>
                <td>{item.equipmentMasterDTO.assetNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <MaintenanceChecklistPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default MaintenanceCheckList;
