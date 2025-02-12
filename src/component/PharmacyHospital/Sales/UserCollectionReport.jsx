/* Mohini_UserCollectionReport_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './UserCollectionReport.css';
import './ItemWiseSalesReport.css';
import * as XLSX from 'xlsx';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
const UserCollectionReport = () => {
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
    <div className="user-collection-report-container">
      <h2 > ⚛ User Collection Report (Detailed)</h2>
      <div className="user-collection-filter-section">
        <div className="user-collection-date-range">
          <label>From: </label>
          <input className="user-collection-date-input" type="date" />
          <label>To: </label>
          <input type="date" className="user-collection-date-input" />
          {/* <button className="user-collection-filter-btn">★</button> */}
        </div>
       
      </div>
                    <div className="item-wise-sales-filter-groups">
                    <label>Select Dispensary:</label>
                    <input type="text" placeholder="Enter Dispensary Name" />

                    
                    <label>Counter: </label>
                  <select>
                 <option>All</option>
                 </select>
                 <label>User: </label>
               <select>
             <option>All</option>
              </select>
              <button className="item-wise-sales-btn">Show Report</button>

                </div>


                <div className="item-wise-sale-button">
    <div className="item-wise-sales-report-table">
        <div className="search-bar-wrapper">
            <input type="text" placeholder="Search" className="item-wise-sales-search-bar" />
            {/* <button className="invoice-billing-search-button"><i className="fa fa-search"></i></button> */}
        </div>
    </div>

    <div className="item-wise-export-print-buttons">
        <div className="item-wise-pagination-info">Showing 0 / 0 results</div>
        <button className="item-wise-export-button" onClick={handleExport}>Export</button>
        <button className="item-wise-print-button" onClick={handlePrint}>Print</button>
    </div>
</div>

      <div className='table-container'>
      <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                 "Date",
                 "Type",
                 "Receipt No",
                 "Hospital",
                 "Patient Name",
                 "SubTotal",
                 "Discount",
                 "Net Total",
                 "Cash Collected",
                 "User",
                 "Remarks",
                 "Counter",
                 "Store"
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
            <td colSpan="13" className="user-collectionno-rows">No Rows To Show</td>
          </tr>
        </tbody>
      </table>
      {/* <div className="user-collection-pagination">
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

export default UserCollectionReport;
/* Mohini_UserCollectionReport_WholePage_14/sep/2024 */

