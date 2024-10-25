import React, { useEffect, useRef, useState } from "react";
import "./homepage.css";
import * as XLSX from "xlsx";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";

const Home = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totals, setTotals] = useState({
    totalOccupied: 0,
    totalAvailable: 0,
    totalReserved: 0,
    overallTotal: 0,
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/manage-bed/all-bed-details`)
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
        calculateTotals(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const printTable = () => {
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
  return (
    <div className="home-page-container">
      <div className="home-page-dashboard-cards">
        <div
          className="home-page-dashboard-card"
          style={{ backgroundColor: "#007bff" }}
        >
          <div className="home-page-card-content">
            <span className="home-page-card-icon">🛏️</span>
            <div className="home-page-card-text">
              <h5>Total No. of Beds</h5>
              <h5>{totals.overallTotal}</h5>
            </div>
          </div>
        </div>
        <div
          className="home-page-dashboard-card"
          style={{ backgroundColor: "#20c997" }}
        >
          <div className="home-page-card-content">
            <span className="home-page-card-icon">🛏️</span>
            <div className="home-page-card-text">
              <h5>Available No. of Beds</h5>
              <h5>{totals.totalAvailable}</h5>
            </div>
          </div>
        </div>
        <div
          className="home-page-dashboard-card"
          style={{ backgroundColor: "#fd7e14" }}
        >
          <div className="home-page-card-content">
            <span className="home-page-card-icon">🛏️</span>
            <div className="home-page-card-text">
              <h5>Occupied No. of Beds</h5>
              <h5>{totals.totalOccupied}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="home-page-table-header">
        <h5>Bed Feature Details</h5>
        <div className="home-page-table-actions">
          <button onClick={printTable}>Print</button>
          <button>Export</button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef} className="adt-main-table">
          <thead>
            <tr>
              {["Ward Name", "Occupied", "Available", "Reserved", "Total"].map(
                (header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] }}
                    className="rd-resizable-th"
                  >
                    <div className="rd-header-content">
                      <span>{header}</span>
                      <div
                        className="rd-resizer"
                        onMouseDown={startResizing(
                          tableRef,
                          setColumnWidths
                        )(index)}
                      ></div>
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 &&
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.wardName}</td>
                  <td>{row.totalOccupiedBedsForSelectedWard}</td>
                  <td>{row.totalAvailableBedsForSelectedWard}</td>
                  <td>{row.totalReservedBedsForSelectedWard}</td>
                  <td>{row.totalBedsForSelectedWard}</td>
                </tr>
              ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>{totals.totalOccupied}</td>
              <td>{totals.totalAvailable}</td>
              <td>{totals.totalReserved}</td>
              <td>{totals.overallTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
