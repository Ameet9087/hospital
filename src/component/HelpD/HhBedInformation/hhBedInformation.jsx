import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import "../HhBedInformation/hhBedInformation.css";
import { API_BASE_URL } from "../../api/api";
import HelpDeskBedPopup from "./HelpDeskBedStatusPopup";

function HHBedInformation() {
  const tableRef = useRef();
  const [bedStatus, setBedStatus] = useState(false);
  const [id, setId] = useState(null);
  const [wardName, setWardName] = useState(null);
  const [wardData, setWardData] = useState([]);
  const [totals, setTotals] = useState({
    totalOccupied: 0,
    totalAvailable: 0,
    totalReserved: 0,
    overallTotal: 0,
  });

  useEffect(() => {
    // Fetch data from API
    fetch(`${API_BASE_URL}/manage-bed/all-bed-details`)
      .then((response) => response.json())
      .then((data) => {
        setWardData(data);
        calculateTotals(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handlePrint = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button{ background:transparent; border:none}
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      // Trigger the print in the iframe
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      // Remove the iframe after printing
      document.body.removeChild(iframe);
    }
  };

  const handleExport = () => {
    const table = document.querySelector("table");

    const ws = XLSX.utils.table_to_sheet(table);

    const wb = XLSX.utils.book_new();

    const createdDate = `Created Date: ${new Date().toLocaleDateString()}`;
    XLSX.utils.sheet_add_aoa(ws, [[createdDate]], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(ws, [["Ward wise Bed Occupancy"]], {
      origin: "A2",
    });

    XLSX.utils.sheet_add_aoa(ws, [[""]], { origin: "A4" });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "BedInformation.xlsx");
  };

  const calculateTotals = (data) => {
    const totalOccupied = data.reduce(
      (sum, row) => sum + row.totalOccupiedBedsForSelectedWard,
      0
    );
    const totalAvailable = data.reduce(
      (sum, row) => sum + row.totalAvailableBedsForSelectedWard,
      0
    );
    const totalReserved = data.reduce(
      (sum, row) => sum + row.totalReservedBedsForSelectedWard,
      0
    );
    const overallTotal = data.reduce(
      (sum, row) => sum + row.totalBedsForSelectedWard,
      0
    );

    setTotals({
      totalOccupied,
      totalAvailable,
      totalReserved,
      overallTotal,
    });
  };

  const handleBedStatus = (id, wardName) => {
    setBedStatus(true);
    setId(id);
    setWardName(wardName);
  };

  return (
    <div className="bedInformation-container">
      <div className="bedInformation-stats-container">
        <div className="hhBedInformation-stat-card total">
          <h2>Total No. of Beds</h2>
          <span className="hhBedInformation-number">{totals.overallTotal}</span>
        </div>
        <div className="hhBedInformation-stat-card available">
          <h2>Available No. of Beds</h2>
          <span className="hhBedInformation-number">
            {totals.totalAvailable}
          </span>
        </div>
        <div className="hhBedInformation-stat-card occupied">
          <h2>Occupied No. of Beds</h2>
          <span className="hhBedInformation-number">
            {totals.totalOccupied}
          </span>
        </div>
      </div>

      <div className="bedInformation-table-container">
        <h4>BED OCCUPANCY STATUS</h4>
        <div className="bedInformation-button-container">
          <button className="bedInformation-print-btn" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
          <button className="bedInformation-export-btn" onClick={handleExport}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
        </div>
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Ward Name</th>
              <th>Occupied</th>
              <th>Vacant</th>
              <th>Reserved</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {wardData != null &&
              wardData.map((ward, index) => (
                <tr key={index}>
                  <td className="hhBedInformation-wardNameColumn">
                    <button
                      className="hhBedInformation-wardNameColumnBTN"
                      onClick={() =>
                        handleBedStatus(ward.wardId, ward.wardName)
                      }
                    >
                      {ward.wardName}
                    </button>
                  </td>
                  <td>{ward.totalOccupiedBedsForSelectedWard}</td>
                  <td>{ward.totalAvailableBedsForSelectedWard}</td>
                  <td>{ward.totalReservedBedsForSelectedWard}</td>
                  <td>{ward.totalBedsForSelectedWard}</td>
                </tr>
              ))}
            <tr className="bedInformation-total-row">
              <td>Total</td>
              <td>{totals.totalOccupied}</td>
              <td>{totals.totalAvailable}</td>
              <td>{totals.totalReserved}</td>
              <td>{totals.overallTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {bedStatus && (
        <HelpDeskBedPopup
          id={id}
          wardName={wardName}
          setBedStatus={setBedStatus}
        />
      )}
    </div>
  );
}

export default HHBedInformation;
