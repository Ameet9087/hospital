/* Ajhar tamboli sSPConsumption.jsx 19-09-24 */

import React, { useEffect, useState,useRef } from "react";
import "../SSPharmacy/sSPConsumption.css";
import { useParams } from "react-router-dom";
import SSPConsumInternalConsum from "./sSPConsumInternalConsum";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import * as XLSX from 'xlsx';

function SSPConsumption() {
  const { store } = useParams();
  const [consumptions, setConsumptions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const tableRef = useRef(null);
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle the popup open/close state
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/subPharmConsumption`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.storeName.subStoreId == store
        );
        console.log(filteredData);

        setConsumptions(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [store]);
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Consumption'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'Consumption.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
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
    <div className="sSPConsumption-container">
      <button
        className="sSPConsumption-create-requisition"
        onClick={handlePopupToggle}
      >
        <i className="fa-solid fa-plus"></i> Internal Consumption
      </button>

      {/* Show the popup if isPopupOpen is true */}
      {isPopupOpen && (
        <div className="sSPConsumption-popup-overlay">
          <div className="sSPConsumption-popup-content">
            <SSPConsumInternalConsum onClose={handlePopupToggle} />
            <button
              className="sSPConsumption-popup-close-button"
              onClick={handlePopupToggle}
            >
              X
            </button>
          </div>
        </div>
      )}
      <div className="sSPConsumption-search-N-results">
        <div className="sSPConsumption-search-bar">
          
          <FloatingInput
            label={"Search"}
            type="search"
          />
        </div>
        <div className="sSPConsumption-results-info">
          <span>
            Showing {consumptions.length} / {consumptions.length} results
          </span>
          {/* Showing 2 / 2 results */}
          <button
            className="sSPConsumption-print-btn"
            // onClick={handleExportToExcel}
            onClick={handleExport}
          >
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className="sSPConsumption-print-btn" onClick={handlePrint}>
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Consumed Date</th>
            <th>SubStore Name</th>
            <th>Consumed By</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {consumptions.map((consumption) => (
            <tr key={consumption.id}>
              <td>{new Date(consumption.consumedDate).toLocaleString()}</td>
              <td>{consumption.storeName.subStoreName}</td>
              <td>{consumption.consumedBy}</td>
              <td>{consumption.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="sSPConsumption-pagination">
        <span>1 to {consumptions.length} of {consumptions.length}</span>
        <button disabled>First</button>
        <button disabled>Previous</button>
        <button className="active">Page 1 of 1</button>
        <button disabled>Next</button>
        <button disabled>Last</button>
      </div> */}
    </div>
  );
}

export default SSPConsumption;
