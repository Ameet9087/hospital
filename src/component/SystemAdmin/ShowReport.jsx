/* Dhanashree_DetailsSalesReport_19/09 */

import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './ShowReport.css';

// Forward ref to allow react-to-print to reference this component
const DetailsSalesReport = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="DetailsSalesReport-details-sales-report">
      <div className="DetailsSalesReport-report-header">
        <p>Name Of Service Provider: Demo Hospital</p>
        <p>Taxpayers KRA PIN: 3254687452</p>
        <p>Duration of Sales: 2024-08-13 / 2024-08-13</p>
      </div>
      <table className="DetailsSalesReport-sales-table">
        <thead>
          <tr>
            <th colSpan="5">Invoice</th>
            <th rowSpan="2">Total Amount (Total Sales)</th>
            <th rowSpan="2">Non Taxable Sales</th>
            <th rowSpan="2">Export Sales</th>
            <th rowSpan="2">Discount</th>
            <th colSpan="2">Taxable Sales</th>
          </tr>
          <tr>
            <th>Date (AD)</th>
            <th>Date (BS)</th>
            <th>Bill No.</th>
            <th>Buyer's Name</th>
            <th>Buyer's KRA PIN</th>
            <th>Amount</th>
            <th>TAX (Kshs.)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-08-13</td>
            <td>2081-04-29</td>
            <td>BL261</td>
            <td>S Suresh</td>
            <td></td>
            <td>1000</td>
            <td>1000</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>2024-08-13</td>
            <td>2081-04-29</td>
            <td>PH56</td>
            <td>S Suresh</td>
            <td></td>
            <td>214</td>
            <td>214</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr className="DetailsSalesReport-total-row">
            <td colSpan="5">Total Amount</td>
            <td>1214</td>
            <td>1214</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
      {/* Print button will trigger the print preview */}
    </div>
  );
});

export default DetailsSalesReport;


/* Dhanashree_DetailsSalesReport_19/09 */
