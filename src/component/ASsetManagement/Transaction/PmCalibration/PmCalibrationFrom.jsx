import React, { useState, useRef, useEffect } from "react";
import "./PmCalibrationFrom.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import PmCalibrationFromPopUp from "./PmCalibrationFromPopUp";
import { API_BASE_URL } from "../../../api/api";

const PmCalibrationForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [pmCalibrationData, setPmCalibrationData] = useState([]);
  const [labTest, setLabTest] = useState(null);
  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: "",
      serialno: "",
      modelno: "",
      periodtype: "",
      scheduledMaintenanceDate: "",
      nextScheduleDate: "",
      remarks: "",
    },
  ]);

  // Fetch PM Calibration data
  useEffect(() => {
    fetch(`${API_BASE_URL}/pm-calibration`)
      .then((res) => res.json())
      .then((data) => setPmCalibrationData(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`/labTestSetting/getAll`)
      .then((res) => res.json())
      .then((data) => setLabTest(data))
      .catch((err) => {
        console.log(err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  // Add a new row to the table
  const handleAddRow = () => {
    setPackageTableRows((prevRows) => [
      ...prevRows,
      {
        sn: prevRows.length + 1,
        serialno: "",
        modelno: "",
        periodtype: "",
        scheduledMaintenanceDate: "",
        nextScheduleDate: "",
        remarks: "",
      },
    ]);
  };

  // Delete a row from the table
  const handleDeleteRow = (rowIndex) => {
    setPackageTableRows((prevRows) =>
      prevRows
        .filter((_, index) => index !== rowIndex)
        .map((row, idx) => ({ ...row, sn: idx + 1 })) // Recalculate SN
    );
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
          <h4>PM Calibration Report</h4>
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
    <div className="PmCalibrationForm-container">
      <div className="PmCalibrationForm-addBtn">
        <button className="PmCalibrationForm-add-button" onClick={openPopup}>
          + Add New PM Calibration form
        </button>
      </div>

      <div className="PmCalibrationForm-search-N-result">
        <div className="PmCalibrationForm-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="PmCalibrationForm-results-info">
          <span>Showing {labTest?.length} / {labTest?.length} results</span>
          <button className="PmCalibrationForm-print-button">
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="PmCalibrationForm-print-button" onClick={handlePrint}>
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
                "Serial No.",
                "Model No.",
                "Period Type",
                "Scheduled Maintenance Date",
                "Next Schedule Date",
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
            {pmCalibrationData.map((item, index) => (
              <tr key={index}>
                <td>{item.calibrationId}</td>
                <td>{item.equipmentMasterDTO.serialNo}</td>
                <td>{item.equipmentMasterDTO.modelNo}</td>
                <td>{item.periodType}</td>
                <td>{item.scheduledMaintenanceDate}</td>
                <td>{item.nextScheduleDate}</td>
                <td>{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          {/* Pass closePopup as a prop to PmCalibrationFromPopUp */}
          <PmCalibrationFromPopUp closePopup={closePopup} />
        </CustomModal>
      )}

    </div>
  );
};

export default PmCalibrationForm;
