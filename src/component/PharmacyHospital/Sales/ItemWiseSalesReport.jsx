/* Mohini_ItemWiseSalesReport_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './ItemWiseSalesReport.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

const ItemWiseSalesReport = () => {
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
        <div className="item-wise-sales-report-container">
            <h2 className="item-wise-sales-report-title"> ⚛ Item-wise Sales Report</h2>
            <div className="item-wise-sales-filter-section">
                <div className="item-wise-sales-filter-group">
                    <label>From:</label>
                    <input type="date" value="2024-08-23" />
                    <label>To:</label>
                    <input type="date" value="2024-08-23" />
                    {/* <button className="invoice-billing-favorite-btn">★</button>
                     <button className="invoice-billing-reset-btn">-</button> */}
                </div>
                <div className="item-wise-sales-filter-groups">
                    <label>Generic Name:</label>
                    <select>
                        <option>--Select Generic--</option>
                    </select>
                    <label>Item Name:</label>
                    <select>
                        <option>--Select Item--</option>
                    </select>
                </div>
                
              
                <div className="item-wise-sales-filter-groups">
                    <label>Dispensary:</label>
                    <input type="text" placeholder="Enter Dispensary Name" />
                </div>
                <div className="item-wise-sales-filter-groups">
                    <label>Counter:</label>
                    <select>
                        <option>Select Counter</option>
                    </select>
                </div>
                <div className="item-wise-sales-filter-groups">
                    <label>User:</label>
                    <input type="text" placeholder="Enter User Name" />
                </div>
                <div className="item-wise-sales-action-buttons">
                <button className="item-wise-sales-btn">Show Report</button>
                <button className="item-wise-sales-btn">Summary Details</button>
            </div>
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
                  "Bill No",
                  "Transaction Type",
                  "Date",
                  "Generic Name",
                  "Medicine Name",
                  "Patient",
                  "Batch No",
                  "Expiry",
                  "Sales Rate",
                  "Sales Value",
                  "Stock Value",
                  "Store",
                  "Counter",
                  "User",
                  "Remark"        
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
                            <td colSpan="15" className="item-wise-sales-no-rows">No Rows To Show</td>
                        </tr>
                    </tbody>
                </table>
                {/* <div className="item-wise-sales-pagination">
                    <button>First</button>
                    <button>Previous</button>
                    <span>Page 0 of 0</span>
                    <button>Next</button>
                    <button>Last</button>
                </div> */}
                </div>

            {/* <div className="item-wise-sales-summary-section">
                <div className="item-wise-sales-summary-item">
                    <span>Total Sales Quantity</span>
                    <span>0</span>
                </div>
                <div className="item-wise-sales-summary-item">
                    <span>Total Sales Value</span>
                    <span>0</span>
                </div>
                <div className="item-wise-sales-summary-item">
                    <span>Total Stock Value</span>
                    <span>0</span>
                </div>
                <div className="item-wise-sales-summary-item">
                    <span>Net</span>
                    <span>0</span>
                </div>
            </div> */}
        </div>
    );
};

export default ItemWiseSalesReport;
/* Mohini_ItemWiseSalesReport_WholePage_14/sep/2024 */
