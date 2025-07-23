import React, { useState, useRef, useEffect } from "react";
import "./EquipmentGatePassOut.css";
import EquipmentGatePassOutPopUp from "./EquipmentGatePassOutPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import * as XLSX from "xlsx";

const EquipmentGatePassOut = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labTest, setLabTest] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from the server


    
    fetch(`${API_BASE_URL}/gatePassOut`)
      .then((res) => res.json())
      .then((data) => setLabTest(data))
      .catch((err) => console.log(err));
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter the data based on the search query
  const filteredData = labTest.filter((test) =>
    Object.values(test).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );


  const handleExport = () => {
    const tableData = filteredData.map((row) => ({
      "Gate Pass Out No": row.gatePassOutId,
      "Supplier Name": row.vendorDTO?.vendorName || "",
      "Asset No": row.assetNo,
      "Recommended By": row.recommendedBy,
      Reason: row.reason,
      "Mode Of Transport": row.modeOfTransport,
      Type: row.type,
      "Gate Pass Out Date": row.gatePassOutDate,
      "Gate Pass Out Time": row.gatePassOutTime,
      "Time Period": row.timePeriod,
      "Prepared By": row.preparedBy,
      "Received By": row.receivedBy,
      "Authorised By": row.authorisedBy,
      "Type Of Equipment": row.typeOfEquipment,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "EquipmentGatePassOut");
  
    // Save as Excel file
    XLSX.writeFile(workbook, "EquipmentGatePassOutData.xlsx");
  };
  
  

  // Function to handle the print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head><title>Print Table</title></head>
        <body>
          <table border="1">
            <thead>
              <tr>
                ${[
                  "Gate Pass Out No",
                  "Supplier Name",
                  "Asset No",
                  "Recommended By",
                  "Reason",
                  "Mode Of Transport",
                  "Type",
                  "Gate Pass out Date",
                  "Gate pass out Time",
                  "Time Period",
                  "Prepared By",
                  "Received By",
                  "Authorised By",
                  "Type Of Equipment",
                ]
                  .map((header) => `<th>${header}</th>`)
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map(
                  (test) => `
                    <tr>
                      <td>${test.gatePassOutId}</td>
                      <td>${test.vendorDTO?.vendorName}</td>
                      <td>${test.assetNo}</td>
                      <td>${test.recommendedBy}</td>
                      <td>${test.reason}</td>
                      <td>${test.modeOfTransport}</td>
                      <td>${test.type}</td>
                      <td>${test.gatePassOutDate}</td>
                      <td>${test.gatePassOutTime}</td>
                      <td>${test.timePeriod}</td>
                      <td>${test.preparedBy}</td>
                      <td>${test.receivedBy}</td>
                      <td>${test.authorisedBy}</td>
                      <td>${test.typeOfEquipment}</td>
                     
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

  return (
    <div className="EquipmentGatePassOut-container">
      <div className="EquipmentGatePassOut-addBtn">
        <button
          className="EquipmentGatePassOut-add-button"
          onClick={openPopup}
        >
          + Add New Equipment Get Pass Out
        </button>
      </div>

      <div className="EquipmentGatePassOut-search-N-result">
        <div className="EquipmentGatePassOut-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="EquipmentGatePassOut-results-info">
          <span>
            Showing {filteredData.length} / {labTest.length} results
          </span>
          <button
            className="EquipmentGatePassOut-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="EquipmentGatePassOut-print-button"
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
                "Gate Pass Out No",
                "Supplier Name",
                "Asset No",
                "Recommended By",
                "Reason",
                "Mode Of Transport",
                "Type",
                "Gate Pass out Date",
                "Gate pass out Time",
                "Time Period",
                "Prepared By",
                "Received By",
                "Authorised By",
                "Type Of Equipment",
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
            {filteredData.map((test, index) => (
              <tr key={index}>
                <td>{test.gatePassOutId}</td>
                <td>{test.vendorDTO?.vendorName}</td>
                <td>{test.assetNo}</td>
                <td>{test.recommendedBy}</td>
                <td>{test.reason}</td>
                <td>{test.modeOfTransport}</td>
                <td>{test.type}</td>
                <td>{test.gatePassOutDate}</td>
                <td>{test.gatePassOutTime}</td>
                <td>{test.timePeriod}</td>
                <td>{test.preparedBy}</td>
                <td>{test.receivedBy}</td>
                <td>{test.authorisedBy}</td>
                <td>{test.typeOfEquipment}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentGatePassOutPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default EquipmentGatePassOut;
