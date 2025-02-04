/* Mohini_StockTransferSummary_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './PharmacyExpiryReport.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import * as XLSX from 'xlsx';

const StockTransferSummary = () => {
  const [fromDate, setFromDate] = useState('24-08-2024');
  const [toDate, setToDate] = useState('24-08-2024');
  const [genericName, setGenericName] = useState('');
  const [itemName, setItemName] = useState('');
  const [selectStore, setSelectStore] = useState('');
  const [nearlyExpired, setNearlyExpired] = useState(false);
  const [expired, setExpired] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);


  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
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
    <div className="pharmacy-expiry-report-container">
      <h1>⚛ Stock Transfer Summary Report</h1>
      
      <div className="pharmacy-expiry-report-date-range">
        <div>
          <label>From:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div>
          <label>To:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        {/* <button className="pharmacy-expiry-report-star-btn">★</button>
        <button className="pharmacy-expiry-report-dash-btn">-</button> */}
      </div>

      <div className="pharmacy-expiry-report-filters">
        <div>
          <label>Generic Name:</label>
          <input type="text" placeholder="--Select Generic--" value={genericName} onChange={(e) => setGenericName(e.target.value)} />
        </div>
        <div>
          <label>Source Store(From):</label>
          <input type="text" placeholder="--Select All--" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </div>
        <div>
          <label>Target Store(To):</label>
          <input type="text" placeholder="--Select All--" value={selectStore} onChange={(e) => setSelectStore(e.target.value)} />
        </div>
        <button className="pharmacy-expiry-report-show-report-btn">🔍 Show Report</button>
      </div>

    

      <div className="pharmacy-expiry-report-search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <button>🔍</button> */}
      </div>

      <div className="pharmacy-expiry-report-results-info">
        <span>Showing 0 / 0 results</span>
        <button className="pharmacy-expiry-report-export-btn"onClick={handleExport}>⬇ Export</button>
        <button className="pharmacy-expiry-report-print-btn"onClick={handlePrint}>Print</button>
      </div>
   <div className='table-container'>
   <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                "Generic Name",
                "Sales Rate",
                "Cost Price",
                "Unit",
                "TransferQty",
                "Amount",
                "TransferredFrom",
                "TransferredTo"
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
          <tr>
            <td colSpan="8" className="pharmacy-expiry-report-no-rows">No Rows To Show</td>
          </tr>
        </tbody>
      </table>

      {/* <div className="pharmacy-expiry-report-pagination">
        <span>0 to 0 of 0</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 0 of 0</span>
        <button>Next</button>
        <button>Last</button>
      </div> */}
      </div>
      {/* <div className="pharmacy-expiry-report-summary">
        <h2>Summary</h2>
        <div>
          <span>Total Cost Value</span>
          <span>0</span>
        </div>
        <div>
          <span>Total Sales Value</span>
          <span>0</span>
        </div>
      </div> */}
    </div>
  );
};

export default StockTransferSummary;
/* Mohini_StockTransferSummary_WholePage_14/sep/2024 */
