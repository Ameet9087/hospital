import React, { useState, useRef, useEffect } from "react";
import "./EquipmentGatePassIn.css";
import EquipmentGatePassInPopUp from "./EquipmentGatePassInPopUp";
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../../api/api";

const EquipmentGatePassIn = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [gatePassData, setGatePassData] = useState([]); // To store fetched data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-gate-pass-in`)
      .then((res) => res.json())
      .then((data) => setGatePassData(data))
      .catch((err) => {
        console.log(err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  // Filter gate pass data based on search query
  const filteredGatePassData = gatePassData.filter((data) => {
    return (
      data.gatePassInId.toString().includes(searchQuery) ||
      data.gatePassType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.dcNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.gateEntryNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.gatePassInDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.gatePassInTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.timePeriod.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.preparedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.receivedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.authorisedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.equipmentMasterDTO?.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.equipmentMasterDTO?.vendor?.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.equipmentMasterDTO?.vendor?.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.equipmentMasterDTO?.vendor?.contactAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.approvalByDTO?.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Export data as CSV
  const exportToCSV = () => {
    const rows = [];
    const headers = [
      "Gate Pass In No",
      "Gate Pass Type",
      "DC No",
      "Gate Entry No",
      "Gate Pass In Date",
      "Gate Pass In Time",
      "Time Period",
      "Prepared By",
      "Received By",
      "Authorised By",
      "Asset No",
      "Equipment Name",
      "Vendor Name",
      "Contact Person",
      "Contact Address",
      "Doctor Name"
    ];

    rows.push(headers);

    filteredGatePassData.forEach((item) => {
      const row = [
        item.gatePassInId,
        item.gatePassType,
        item.dcNo,
        item.gateEntryNo,
        item.gatePassInDate,
        item.gatePassInTime,
        item.timePeriod,
        item.preparedBy,
        item.receivedBy,
        item.authorisedBy,
        item.equipmentMasterDTO?.equipmentName,
        item.equipmentMasterDTO?.vendor?.vendorName,
        item.equipmentMasterDTO?.vendor?.contactPerson,
        item.equipmentMasterDTO?.vendor?.contactAddress,
        item.approvalByDTO?.doctorName
      ];
      rows.push(row);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "equipment_gate_pass_in.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Print the table
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


  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="EquipmentGatePassIn-container">
      <div className="EquipmentGatePassIn-addBtn">
        <button className="EquipmentGatePassIn-add-button" onClick={openPopup}>
          + Add New Equipment Gate Pass In
        </button>
      </div>

      <div className="EquipmentGatePassIn-search-N-result">
        <div className="EquipmentGatePassIn-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="EquipmentGatePassIn-results-info">
          <span>
            Showing {filteredGatePassData.length} / {gatePassData.length} results
          </span>
          <button className="EquipmentGatePassIn-print-button" onClick={exportToCSV}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="EquipmentGatePassIn-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Gate Pass In No",
                "Gate Pass Type",
                "DC No",
                "Gate Entry No",
                "Gate Pass In Date",
                "Gate Pass In Time",
                "Time Period",
                "Prepared By",
                "Received By",
                "Authorised By",
                "Asset No",
                "Equipment Name",
                "Vendor Name",
                "Contact Person",
                "Contact Address",
                "Doctor Name",
              ].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
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
            {filteredGatePassData.map((data, index) => (
              <tr key={index}>
                <td>{data.gatePassInId}</td>
                <td>{data.gatePassType}</td>
                <td>{data.dcNo}</td>
                <td>{data.gateEntryNo}</td>
                <td>{data.gatePassInDate}</td>
                <td>{data.gatePassInTime}</td>
                <td>{data.timePeriod}</td>
                <td>{data.preparedBy}</td>
                <td>{data.receivedBy}</td>
                <td>{data.authorisedBy}</td>
                <td>{data.equipmentGatePassOutDTO?.assetNo}</td>
                <td>{data.equipmentMasterDTO?.equipmentName}</td>
                <td>{data.equipmentMasterDTO?.vendor?.vendorName}</td>
                <td>{data.equipmentMasterDTO?.vendor?.contactPerson}</td>
                <td>{data.equipmentMasterDTO?.vendor?.contactAddress}</td>
                <td>{data.approvalByDTO?.doctorName}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentGatePassInPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default EquipmentGatePassIn;
