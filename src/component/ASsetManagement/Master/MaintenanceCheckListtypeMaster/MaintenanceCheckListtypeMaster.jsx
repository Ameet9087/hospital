import React, { useState, useEffect, useRef } from "react";
import "./MaintenanceCheckListtypeMaster.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import MaintenanceCheckListtypeMasterPopUp from "./MaintenanceCheckListtypeMasterPopUp";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput } from "../../../../FloatingInputs";

const MaintenanceChecklisttypeMaster = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [packageTableRows, setPackageTableRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const tableRef = useRef(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/maintenance-checklists`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const formattedData = data.map((item, index) => ({
          sn: index + 1,
          typeOfChecklist: item.typeofChecklist,
          remarks: item.remarks,
          checkListDescription: item.checkLists.map((cl) => cl.description).join(", "),
          status: item.status,
        }));
        setPackageTableRows(formattedData);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchChecklists();
  }, []);

  // Filter rows based on search query
  const filteredRows = packageTableRows.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      row.sn.toString().includes(query) ||
      row.typeOfChecklist.toLowerCase().includes(query) ||
      row.remarks.toLowerCase().includes(query) ||
      row.checkListDescription.toLowerCase().includes(query) ||
      row.status.toLowerCase().includes(query)
    );
  });

  // Export table data to CSV
  const handleExport = () => {
    const headers = ["SN", "Type Of Checklist", "Remarks", "Check List Description", "Status"];
    const rows = filteredRows.map((row) => [
      row.sn,
      row.typeOfChecklist,
      row.remarks,
      row.checkListDescription,
      row.status,
    ]);
    const csvContent =
      [headers, ...rows]
        .map((row) => row.map((item) => `"${item}"`).join(","))
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "maintenance_checklists.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print the table
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Maintenance Checklist Types</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Maintenance Checklist Types</h1>
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Type Of Checklist</th>
                <th>Remarks</th>
                <th>Check List Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRows
        .map(
          (row) => `
                  <tr>
                    <td>${row.sn}</td>
                    <td>${row.typeOfChecklist}</td>
                    <td>${row.remarks}</td>
                    <td>${row.checkListDescription}</td>
                    <td>${row.status}</td>
                  </tr>
                `
        )
        .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Render table
  const renderTable = () => (
    <div className="maintenanceChecklistMaster-table">
      <table ref={tableRef}>
        <thead>
          <tr>
            {["SN", "Type Of Checklist", "Remarks", "Check List Description", "Status"].map(
              (header, index) => (
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
              )
            )}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={index}>
              <td>{row.sn}</td>
              <td>{row.typeOfChecklist}</td>
              <td>{row.remarks}</td>
              <td>{row.checkListDescription}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="maintenanceChecklistMaster-container">
      <div className="maintenanceChecklistMaster-addBtn">
        <button
          className="maintenanceChecklistMaster-add-button"
          onClick={() => setShowPopup(true)}
        >
          + Add New Maintenance Checklist Type
        </button>
      </div>

      <div className="maintenanceChecklistMaster-search-N-result">
        <div className="maintenanceChecklistMaster-search-bar">
          <FloatingInput
          label={"Search"}
           type="text"
           placeholder="Search..."
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="maintenanceChecklistMaster-results-info">
          <button
            className="maintenanceChecklistMaster-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="maintenanceChecklistMaster-print-button"
            onClick={handlePrint}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      {renderTable()}

      <CustomModal isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <MaintenanceCheckListtypeMasterPopUp
          onSave={(newChecklist) => {
            const newRow = {
              sn: packageTableRows.length + 1,
              typeOfChecklist: newChecklist.typeofChecklist,
              remarks: newChecklist.remarks,
              checkListDescription: newChecklist.checkLists
                .map((cl) => cl.description)
                .join(", "),
              status: newChecklist.status,
            };
            setPackageTableRows([...packageTableRows, newRow]);
            setShowPopup(false);
          }}
          onClose={() => setShowPopup(false)}
        />
      </CustomModal>
    </div>
  );
};

export default MaintenanceChecklisttypeMaster;
