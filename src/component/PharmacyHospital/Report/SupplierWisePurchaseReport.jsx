/* Mohini_SupplierWisePurchaseReport_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './SupplierWisePurchaseReport.css';
import * as XLSX from 'xlsx';

import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
const SupplierWisePurchaseReport = () => {
  const [fromDate, setFromDate] = useState('23-08-2024');
  const [toDate, setToDate] = useState('23-08-2024');
  const [supplier, setSupplier] = useState('');
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
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };


  return (
    <div className="supplier-wise-purchase-report">
      <h1>⚛ Supplier Wise Purchase Report</h1>
      
      <div className="supplier-wise-purchase-date-range">

        <div className='supp-date'>
        <div>
          <label>From:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div>
          <label>To:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        {/* <button className="supplier-wise-purchase-star-btn">☆</button>
        <button className="supplier-wise-purchase-dash-btn">-</button> */}
        </div>
        <div className="supplier-wise-purchase-supplier-selection">
        <label>Supplier Name:</label>
        <select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
          <option value="">--Select Supplier--</option>
        </select>
        <button className="supplier-wise-purchase-show-report-btn">🔍 Show Report</button>
      </div>
      </div>

     

      <div className="supplier-wise-purchase-search-bar" >
        <input
      
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)
            
          }
        
        />
      </div>

      <div className="supplier-wise-purchase-results-info">
        <span>Showing 0 / 0 results</span>
        <button className="supplier-wise-purchase-export-btn"onClick={handleExport}>⬇ Export</button>
        <button className="supplier-wise-purchase-print-btn"onClick={handlePrint}>Print</button>
      </div>
      <div className='supplier-wise-purchase-com'>
      <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                 "SN",
                 "GoodReceiptDate",
                 "SupplierName",
                 "Bill No",
                 "Item Name",
                 "Generic Name",
                 "BatchNo",
                 "Quantity",
                 "Purchase Rate",
                 "Sub Total",
                 "VAT Amount",
                 "Total Amount"         
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
            <td colSpan="12" className="supplier-wise-purchase-no-rows">No Rows To Show</td>
          </tr>
        </tbody>
      </table>

      {/* <div className="supplier-wise-purchase-pagination">
        <span>0 to 0 of 0</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 0 of 0</span>
        <button>Next</button>
        <button>Last</button>
      </div> */}
</div>
     
    </div>
  );
};

export default SupplierWisePurchaseReport;
/* Mohini_SupplierWisePurchaseReport_14/sep/2024 */