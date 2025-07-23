import React, { useState, useRef, useEffect } from "react";
import "./EquipmentTransformHandoverForm.css";
import EquipmentTransformHandoverFormPopUp from "./EquipmentTransformHandoverFormPopUp";
import { API_BASE_URL } from "../../../api/api";
import jsPDF from "jspdf"; // Import jsPDF for exporting PDF
import "jspdf-autotable"; // Import the autotable plugin for table support
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";

const EquipmentTransformHandoverForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labTest, setLabTest] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch(`${API_BASE_URL}/equipment-transfer-handover`)
      .then((res) => res.json())
      .then((data) => setLabTest(data))
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


  // Function for exporting the table data to PDF
  const handleExport = () => {
    const doc = new jsPDF();
    const table = tableRef.current;

    // Create an array to hold the table data in a format suitable for jsPDF
    const tableData = [];
    const headers = Array.from(table.querySelectorAll("thead tr th")).map(
      (th) => th.innerText
    );
    tableData.push(headers);

    Array.from(table.querySelectorAll("tbody tr")).forEach((tr) => {
      const row = Array.from(tr.querySelectorAll("td")).map((td) => td.innerText);
      tableData.push(row);
    });

    // Use jsPDF's autoTable plugin to add the table to the PDF
    doc.autoTable({
      head: [headers],
      body: tableData.slice(1), // Skip headers in body data
    });

    // Save the PDF
    doc.save("Equipment_Transfer_Handover_Form.pdf");
  };

  return (
    <div className="EquipmentTransformHandoverForm-container">
    <div className="equi-transform-handover-form-header">
    <div className="EquipmentTransformHandoverForm-addBtn">
        <button
          className="EquipmentTransformHandoverForm-add-button"
          onClick={openPopup}
        >
          + Add New Equipment Transform Handover Form
        </button>
      </div>
      <div className="EquipmentTransformHandoverForm-search-N-result">
        <div className="EquipmentTransformHandoverForm-results-info">
          <span>
            Showing {labTest?.length} / {labTest?.length} results
          </span>
          <button className="EquipmentTransformHandoverForm-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="EquipmentTransformHandoverForm-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
    </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Transfer/Handover No",
                "Equipment Name",
                "Asset No",
                "Serial No",
                "Location",
                "Department",
                "Date Of Transfer/Handover",
                "Time Of Transfer/Handover",
                "Handed By",
                "Location Received",
                "Remarks",
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
            {labTest.map((row, index) => (
              <tr key={index}>
                <td>{row.transferId || "N/A"}</td>
                <td>{row.equipmentMasterDTO?.equipmentName || "N/A"}</td>
                <td>{row.equipmentMasterDTO?.assetNo || "N/A"}</td>
                <td>{row.equipmentMasterDTO?.serialNo || "N/A"}</td>
                <td>{row.equipmentMasterDTO?.assetLocationMaster?.subLocation || "N/A"}</td>
                <td>{row.equipmentMasterDTO?.department?.departmentName || "N/A"}</td>
                <td>{row.dateOfTransfer || "N/A"}</td>
                <td>{row.timeOfTransfer || "N/A"}</td>
                <td>{row.handedByDTO?.firstName || "N/A"}</td>
                <td>{row.equipmentMasterDTO?.assetLocationMaster?.subLocation || "N/A"}</td>
                <td>{row.remarks || "N/A"}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>



      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentTransformHandoverFormPopUp />
        </CustomModal>

      )}
    </div>
  );
};

export default EquipmentTransformHandoverForm;
