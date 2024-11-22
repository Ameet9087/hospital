/* Mohini_StoreDetailsListCom_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import "./PurchaseOrder.css"; // Ensure you have this CSS file
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import * as XLSX from 'xlsx';

const SubstoreDispatchCom = () => {
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
        <div className="purchase-order-container">
            <div className="purchase-order-header">
               
              
            </div>
                   <div className="purchase-data-order">
                    <div className="purchase-order-date-range">
                      
                        <label htmlFor="from-date">From:</label>
                        <input type="date" id="from-date" />
                        <label htmlFor="to-date">To:</label>
                        <input type="date" id="to-date" />
                        {/* <button className="purchase-order-favorite-btn">★</button>
                        <button className="purchase-order-reset-btn">-</button>
                        <button className="purchase-order-date-range-button">OK</button> */}
                    </div>
                 
         {/* <div className="purchase-order-aging-filter"> */}
             
            {/* </div>  */}
            </div>
                      
            <div className="purchase-order-search-container">
    <input type="text" className="purchase-order-search-box" placeholder="Search" />
    <div className="purchase-order-search-right">
        <span className="purchase-results-count-span">Showing 0 / 0 results</span>
        <button className="purchase-order-print-button" onClick={handleExport}>Export</button>

        <button className="purchase-order-print-button"onClick={handlePrint}>Print</button>
    </div>
</div>



            <div className="table-container">
            <table  ref={tableRef}>
          <thead>
            <tr>
              {[
               "Req.No",
  "Requested By",
  "Requested From",
  "Date",
  "Status",
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
                            <td colSpan="6" className="purchase-order-no-rows">No Rows To Show</td>
                        </tr>
                    </tbody>
                    
                </table>
                {/* <div className="purchase-order-pagination">
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

export default SubstoreDispatchCom;
/* Mohini_StoreDetailsListCom_WholePage_14/sep/2024 */
