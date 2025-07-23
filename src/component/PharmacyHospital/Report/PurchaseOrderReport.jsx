import React, { useState, useRef } from 'react';
import './ItemWisePurchaseReport.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

const PurchaseOrderReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };

  return (
    <div className="iten-purchase-container">
      <h2 className="iten-purchase-header"> ⚛ PurchaseOrder Report</h2>

      <div className="iten-purchase-filterRow">
        <div className='item-data-date'>
          <span>From: </span>
          <input type="date" defaultValue="2024-08-22" />
          <span> To: </span>
          <input type="date" defaultValue="2024-08-22" />
        </div>
        <div className='item-span-item'>
          <span>Status  Name: </span>
          <select>
            <option>--Select Status--</option>
          </select>
        </div>
        <div>
          <button className="iten-purchase-show-bt">Show Report</button>
        </div>
      </div>

      <div className="iten-purchase-searchRow">
        <input
          type="text"
          placeholder="Search"
          className="iten-purchase-searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='item-purchase-btn'>
        <span>Showing 0 / 0 results</span>
        <button className="iten-purchase-button" onClick={handleExport}>Export</button>
        <button className="iten-purchase-button" onClick={handlePrint}>Print</button>
      </div>

      <div className="item-purchase-ta">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                 "PO No",
                 "PO Date",
                 "Delivery Date",
                 "Supplier Name",
                 "Contact No",
                 "SubTotal",
                 "Discount",
                 "Tax",
                 "CC Charge",
                 "Total Amount",
                 "PO Status",
                 "Verification Status",
                 "Actions"
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
            <tr className="iten-purchase-noRows">
              <td colSpan="13">No records found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrderReport;
