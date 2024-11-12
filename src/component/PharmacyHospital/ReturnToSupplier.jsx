/* Mohini_ReturnToSupplier_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './ReturnToSupplier.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import * as XLSX from 'xlsx';

const ReturnToSupplier = () => {
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
    <div className="return-to-supplier-container">
      <h2 className="return-to-supplier-header-title">Return To Supplier Report</h2>
      
      {/* <div className="return-to-supplier-filters-container"> */}
        {/* <div className="return-to-supplier-filter-group">
          <label>Supplier :</label>
          <input type="text" placeholder="-- Search Supplier --" className="return-to-supplier-input-box" />
        </div> */}
        
        {/* <div className="return-to-supplier-filter-group">
          <label>GRNo :</label>
          <input type="number" className="return-to-supplier-input-box" value="0" />
        </div> */}
        
        {/* <div className="return-to-supplier-filter-group">
          <label>InvoiceNo :</label>
          <input type="text" className="return-to-supplier-input-box" />
        </div> */}

        {/* <button className="return-to-supplier-search-button">Search</button> */}
      {/* </div> */}
      
      <div className="return-to-supplier-date-filter-container">
        <div className="return-to-supplier-date-filter">
          <label>From:</label>
          <input type="date" className="return-to-supplier-input-date" defaultValue="2024-08-15" />
        </div>
        
        <div className="return-to-supplier-date-filter">
          <label>To:</label>
          <input type="date" className="return-to-supplier-input-date" defaultValue="2024-08-22" />
        </div>
        
        {/* <div className="return-to-supplier-date-filter-actions">
          <button className="return-to-supplier-star-button">★</button>
          <button className="return-to-supplier-minus-button">-</button>
          <button className="return-to-supplier-ok-button">OK</button>
        </div> */}
        </div>
        {/* <div className="return-to-supplier-filters-container">     
         <button className="return-to-supplier-search-button">Search</button>

      </div> */}
     
     



      <div className="return-to-supplier-search-bar">
        <input type="text" placeholder="Search" className="return-to-supplier-search-input" />
        <button className="return-to-supplier-search-icon-button">
          <i className="fa fa-search"></i>
        </button>
        <div className="return-to-supplier-print-container">
        <span >Showing 0 / 0 results</span>
        <button className="return-to-supplier-print-button" onClick={handleExport}>Export</button>
        <button className="return-to-supplier-print-button"onClick={handlePrint}>Print</button>
      </div>
      </div>
     
      <div className='return-to-supplier-retuurn-store-supplier'>
      <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                  "S.N.",
                  "Date",
                  "Supplier Name",
                  "Generic Name",
                  "Item Name",
                  "Return Date",
                  "Qty",
                  "Sub Total",
                  "Dis. Amt",
                  "VAT Amt",
                  "Total Amt",
                  "Supplier CreditNote Num",
                  "CreditNote Num",
                  "Remarks" 
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
            <td colSpan="14" className="return-to-supplier-no-rows">
              No Rows To Show
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div className="return-to-supplier-pagination-container">
        <span>0 to 0 of 0</span>
        <button className="return-to-supplier-pagination-button" disabled>
          First
        </button>
        <button className="return-to-supplier-pagination-button" disabled>
          Previous
        </button>
        <span>Page 0 of 0</span>
        <button className="return-to-supplier-pagination-button" disabled>
          Next
        </button>
        <button className="return-to-supplier-pagination-button" disabled>
          Last
        </button>
      </div> */}
      </div>

      
    </div>
  );
};

export default ReturnToSupplier;
/* Mohini_ReturnToSupplier_WholePage_14/sep/2024 */
