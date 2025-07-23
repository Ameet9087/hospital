import React, { useState, useRef, useEffect } from "react";
import "./EquipmentRecievForm.css";
import EquipmentRecievFormPopUp from "./EquipmentRecievFormPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { API_BASE_URL } from "../../../api/api";

const EquipmentRecievForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labTest, setLabTest] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-receive-takeovers`);
        const data = await response.json();
        setLabTest(data); // Update state with API response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleNewSubmission = (newData) => {
    // Update the table with the new submission
    setLabTest((prevData) => [...prevData, newData]);
    closePopup(); // Close popup after submission
  };

 

  const handleExport = () => {
    const doc = new jsPDF();
    const table = tableRef.current;

    const headers = Array.from(table.querySelectorAll("thead tr th")).map(
      (th) => th.innerText
    );
    const tableData = Array.from(table.querySelectorAll("tbody tr")).map((tr) =>
      Array.from(tr.querySelectorAll("td")).map((td) => td.innerText)
    );

    doc.autoTable({
      head: [headers],
      body: tableData,
    });

    doc.save("Equipment_Transfer_Handover_Form.pdf");
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
    <div className="EquipmentRecievForm-container">
      <div className="EquipmentRecievForm-addBtn">
        <button
          className="EquipmentRecievForm-add-button"
          onClick={openPopup}
        >
          + Add New Equipment Reciev Form
        </button>
      </div>
      <div className="EquipmentRecievForm-search-N-result">
        <div className="EquipmentRecievForm-results-info">
          <span>
            Showing {labTest.length} / {labTest.length} results
          </span>
          <button className="EquipmentRecievForm-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="EquipmentRecievForm-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Person In Charge",
                "Date of Receive",
                "Time of Receive",
                "Equipment Name",
                "Serial No",
                "Department",
                "Sub Location",
                "Manual Receive No",

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
                      onMouseDown={(e) => startResizing(tableRef, setColumnWidths)(index)(e)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labTest.map((row, index) => (
              <tr key={index}>
                <td>{row.takeoverId || "N/A"}</td>
                <td>{row.personInCharge || "N/A"}</td>
                <td>{row.dateOfReceive || "N/A"}</td>
                <td>{row.timeOfReceive || "N/A"}</td>
                <td>{row.equipmentTransferHandoverDTO?.equipmentMasterDTO?.equipmentName || "N/A"}</td>
                <td>{row.equipmentTransferHandoverDTO?.equipmentMasterDTO?.serialNo || "N/A"}</td>
                <td>{row.equipmentTransferHandoverDTO?.equipmentMasterDTO?.department?.departmentName || "N/A"}</td>
                <td>{row.equipmentTransferHandoverDTO?.equipmentMasterDTO?.assetLocationMaster?.subLocation || "N/A"}</td>
                <td>{row.manualReceive || "N/A"}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentRecievFormPopUp onSubmit={handleNewSubmission} onClose={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default EquipmentRecievForm;
