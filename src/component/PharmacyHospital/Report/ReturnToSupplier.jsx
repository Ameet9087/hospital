/* Mohini_ReturnToSupplier_14/sep/2024 */
import React, { useState, useRef } from 'react'; // Import useState and useRef
import './ReturnToSupplier.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const ReturnToSupplier = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  return (
    <div className="return-purchase-order-container">
      <div className="return-purchase-report-header">
        <h2>⚛ Return To Supplier </h2>
      </div>

      <div className="return-purchase-filters-container">
        <div className="return-purchase-date-range">
          <label>From:</label>
          <input type="date" />
          <label>To:</label>
          <input type="date" />
          {/* <button className="return-purchase-favorite-btn">★</button>
          <button className="return-purchase-reset-btn">-</button> */}
        </div>
        <div className="return-purchase-status-container">
          <label>Status Name:</label>
          <select>
            <option>All</option>
            {/* Add more options here */}
          </select>
        </div>
        <button className="return-purchase-show-report-btn">🔍 Show Report</button>
      </div>

      <div className="return-purchase-search-and-actions">
        <input type="text" placeholder="Search" />
        <button className="return-purchase-export-btn">Export</button>
        <button className="return-purchase-print-btn">Print</button>
      </div>

      <div className="return-purchase-order-purchase">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "",
                "Supplier Name",
                "Generic Name",
                "Item Name",
                "Return Data",
                "Qty",
                "Sub Total",
                "Dis Amt",
                "VAT Amt",
                "Total Amt",
                "Supplier CreditNote Num"
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
            <tr className="return-purchase-no-rows">
              <td colSpan="12">No Rows To Show</td> {/* Colspan should cover all columns */}
            </tr>
          </tbody>
        </table>

        {/* 
        Pagination (If needed in future) 
        <div className="return-purchase-pagination">
          <span>0 to 0 of 0 results</span>
          <div className="return-purchase-pagination-controls">
            <button>First</button>
            <button>Previous</button>
            <span>Page 0 of 0</span>
            <button>Next</button>
            <button>Last</button>
          </div>
        </div> 
        */}
      </div>
    </div>
  );
};

export default ReturnToSupplier;
/* Mohini_ReturnToSupplier_14/sep/2024 */
