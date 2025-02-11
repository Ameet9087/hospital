/* Mohini_ItemWisePurchaseReport_14/sep/2024 */

import React, { useState, useEffect, useRef } from 'react';
import './ItemWisePurchaseReport.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

const ItemWisePurchaseReportCom = () => {
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
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };

  return (
    <div className="iten-purchase-container">
      <h2 className="iten-purchase-header">⚛ Item Wise Purchase Report</h2>
      <div className="iten-purchase-filterRow">
        <div>
          <span>From: </span>
          <input type="date" defaultValue="2024-08-22" />
          <span> To: </span>
          <input type="date" defaultValue="2024-08-22" />
        </div>
        <div className='item-span'>
          <span>Select Item: </span>
          <select>
            <option>--Select Item--</option>
          </select>
        </div>
        <div className='item-span'>
          <span>Select Generic: </span>
          <select>
            <option>--Select Generic--</option>
          </select>
        </div>
      </div>
      <div className="iten-purchase-filterRow">
        <div>
          <span>Bill No.: </span>
          <input type="text" />
        </div>
        <div className='item-span'>
          <span>GR No.: </span>
          <input type="text" />
        </div>
        <div className='item-span'>
          <span>Supplier Name: </span>
          <select>
            <option>--Select Supplier--</option>
          </select>
        </div>
        <button className="iten-purchase-showReportButton">Show Report</button>
      </div>
      <div className="iten-purchase-searchRow">
        <input type="text" placeholder="Search" className="iten-purchase-searchInput" />
       
      </div>
      <div className='item-purchase-btn'>
      <span>Showing 0 / 0 results</span>
        <button className="iten-purchase-button" onClick={handleExport}>Export</button>
        <button className="iten-purchase-button" onClick={handlePrint}>Print</button>
      </div>
      <div className='item-purchase-ta'>
      <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                "GR Date",
  "GR NO.",
  "Supplier",
  "Bill ...",
  "Generic Name",
  "Item",
  "Batch",
  "Expiry",
  "Qua...",
  "Purchase Rate",
  "SubTotal",
  "VAT Amt.",
  "TotalAmount"      
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
            <td colSpan="13" className="iten-purchase-noRows">No Rows To Show</td>
          </tr>
        </tbody>
      </table>
      {/* <div className="iten-purchase-pagination">
        <button className="iten-purchase-paginationButton">First</button>
        <button className="iten-purchase-paginationButton">Previous</button>
        <span>Page 0 of 0</span>
        <button className="iten-purchase-paginationButton">Next</button>
        <button className="iten-purchase-paginationButton">Last</button>
      </div> */}
      </div>
      {/* <div className="iten-purchase-summary">
        <h3>Summary</h3>
        <div>Total Purchase Quantity: 0</div>
        <div>Total Purchase Value (Excluding VAT): 0</div>
        <div>Total VAT Amount: 0</div>
        <div>Total Purchase Value: 0</div>
      </div>
      */}
    </div>
  );
};

export default ItemWisePurchaseReportCom;
/* Mohini_ItemWisePurchaseReport_14/sep/2024 */
