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
    // Fetch overall counts
    fetch(`${API_BASE_URL}/beds/counts`)
      .then((response) => response.json())
      .then((data) => {
        setTotals({
          totalOccupied: data.occupiedBeds,
          totalAvailable: data.availableBeds,
          totalReserved: data.reservedBeds,
          overallTotal: data.totalBeds,
        });
      })
      .catch((error) => console.error("Error fetching bed counts:", error));

    // Fetch ward details
    fetch(`${API_BASE_URL}/room-types/ward/details`)
      .then((response) => response.json())
      .then((data) => {
        const wardArray = Object.keys(data).map((wardName) => ({
          wardName,
          total: data[wardName].total,
          reserved: data[wardName].reserved,
          availableBeds: data[wardName].availableBeds,
          occupied: data[wardName].occupied,
          vacant: data[wardName].vacant,
        }));
        setWardData(wardArray);
      })
      .catch((error) => console.error("Error fetching ward details:", error));
  }, []);

  const handlePrint = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";
      document.body.appendChild(iframe);
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
            button { background: transparent; border: none; }
          </style>
        </head>
        <body>
          <table>${printContents}</table>
        </body>
        </html>
      `);
      doc.close();
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(wardData, { origin: "A4" });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bed Information");
    XLSX.writeFile(wb, "BedInformation.xlsx");
  };

  const handleBedStatus = (wardId, wardName) => {
    setBedStatus(true);
    setId(wardId);
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
              <th>Available</th>
              <th>Reserved</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {wardData.map((ward, index) => (
              <tr key={index}>
                <td className="hhBedInformation-wardNameColumn">
                  <button
                    className="hhBedInformation-wardNameColumnBTN"
                    onClick={() => handleBedStatus(ward.wardId, ward.wardName)}
                  >
                    {ward.wardName}
                  </button>
                </td>
                <td>{ward.occupied}</td>
                <td>{ward.availableBeds}</td>
                <td>{ward.reserved}</td>
                <td>{ward.total}</td>
              </tr>
            ))}
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
