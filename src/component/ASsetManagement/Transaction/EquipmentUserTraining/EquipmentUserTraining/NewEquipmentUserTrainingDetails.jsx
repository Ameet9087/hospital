import React, { useState, useRef, useEffect } from "react";
import "./NewEquipmentUserTrainingDetails.css";
import EquipmentInstallationDetailsPopUp from "./EquipmentUserTrainingDetailsPopUp";
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../../api/api";


const NewEquipmentUserTrainingDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [trainingDetails, setTrainingDetails] = useState([]);
  const [searchText, setSearchText] = useState(""); // State for search text

  useEffect(() => {
    fetch(`${API_BASE_URL}/trainingDetails`)
      .then((res) => res.json())
      .then((data) => setTrainingDetails(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filtered data based on search text
  const filteredTrainingDetails = trainingDetails.filter((detail) => {
    const searchLower = searchText.toLowerCase();
    return (
      detail.employeeType?.toLowerCase().includes(searchLower) ||
      detail.manualTrainer?.toLowerCase().includes(searchLower) ||
      detail.contractType?.toLowerCase().includes(searchLower) ||
      detail.remark?.toLowerCase().includes(searchLower) ||
      detail.trainer?.firstName?.toLowerCase().includes(searchLower) ||
      detail.employee?.firstName?.toLowerCase().includes(searchLower) ||
      detail.doctor?.doctorName?.toLowerCase().includes(searchLower) ||
      detail.equipmentMasterDTO?.equipmentName
        ?.toLowerCase()
        .includes(searchLower)
    );
  });

  const handleExport = () => {
    const csvHeader = [
      "SN",
      "Employee Type",
      "Manual Trainer",
      "Contract Type",
      "Contract From",
      "Contract To",
      "Trainer Name",
      "Employee Name",
      "Doctor Name",
      "Equipment Name",
      "Remarks",
    ];
    const csvData = filteredTrainingDetails.map((detail, index) => [
      index + 1,
      detail.employeeType,
      detail.manualTrainer,
      detail.contractType,
      detail.contractFromDate,
      detail.contractToDate,
      detail.trainer?.firstName,
      detail.employee?.firstName,
      detail.doctor?.doctorName,
      detail.equipmentMasterDTO?.equipmentName,
      detail.remark,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeader.join(","), ...csvData.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "training_details.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className="NewEquipmentUserTrainingDetails-container">
      <div className="NewEquipmentUserTrainingDetails-addBtn">
        <button
          className="NewEquipmentUserTrainingDetails-add-button"
          onClick={openPopup}
        >
          + Add New Equipment UserTraining Details
        </button>
      </div>

      <div className="NewEquipmentUserTrainingDetails-search-N-result">
        <div className="NewEquipmentUserTrainingDetails-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Update search text
          />
        </div>
        <div className="NewEquipmentUserTrainingDetails-results-info">
          <span>
            Showing {filteredTrainingDetails.length} / {trainingDetails.length}{" "}
            results
          </span>
          <button
            className="NewEquipmentUserTrainingDetails-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="NewEquipmentUserTrainingDetails-print-button"
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
                "SN",
                "Employee Type",
                "Manual Trainer",
                "Contract Type",
                "Contract From",
                "Contract To",
                "Trainer Name",
                "Employee Name",
                "Doctor Name",
                "Equipment Name",
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
            {filteredTrainingDetails.map((detail, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{detail.employeeType}</td>
                <td>{detail.manualTrainer}</td>
                <td>{detail.contractType}</td>
                <td>{detail.contractFromDate}</td>
                <td>{detail.contractToDate}</td>
                <td>{detail.trainer?.firstName}</td>
                <td>{detail.employee?.firstName}</td>
                <td>{detail.doctor?.doctorName}</td>
                <td>{detail.equipmentMasterDTO?.equipmentName}</td>
                <td>{detail.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentInstallationDetailsPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default NewEquipmentUserTrainingDetails;
