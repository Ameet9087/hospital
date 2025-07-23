/* Dhanashree_ShowReportNewSalesBook_19/09 */

import React, { forwardRef } from 'react';
import './ShowReportNewSalesBook.css';

const ShowReportNewSalesBook = forwardRef((props, ref) => {
  return (
    <div className="ShowReportNewSalesBook-table-container" ref={ref}>
      <h2 className="ShowReportNewSalesBook-report-title">Details Sales Report</h2>
      <div className="ShowReportNewSalesBook-report-details">
        <p>Name Of Service Provider : <b>Danphe National Hospital Pvt. Ltd.</b></p>
        <p>Taxpayers KRA PIN: <b>3254687452</b></p>
        <p>Duration of Sales : <b>2024-08-29 / 2024-08-29</b></p>
      </div>
      <table className="ShowReportNewSalesBook-sales-report-table">
        <thead>
          <tr>
            <th rowSpan="2">Date (AD)</th>
            <th rowSpan="2">Date (BS)</th>
            <th rowSpan="2">Bill No.</th>
            <th rowSpan="2">Buyer's Name</th>
            <th rowSpan="2">Buyer's KRA PIN</th>
            <th colSpan="2">Total Amount</th>
            <th rowSpan="2">Non Taxable Sales</th>
            <th rowSpan="2">Export Sales</th>
            <th rowSpan="2">Discount</th>
            <th colSpan="2">Taxable Sales</th>
          </tr>
          <tr>
            <th>Total Sales</th>
            <th>Amount</th>
            <th>Amount</th>
            <th>TAX (Kshs.)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4"><b>Total Amount</b></td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default ShowReportNewSalesBook;

/* Dhanashree_ShowReportNewSalesBook_19/09 */
