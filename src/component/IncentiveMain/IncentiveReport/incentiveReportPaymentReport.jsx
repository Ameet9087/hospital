 /* Ajhar Tamboli incentiveReportPaymentReport.jsx 18-09-2024 */

import React from "react";
import "../IncentiveReport/incentiveReportPaymentReport.css"

const IncentiveReportPaymentReport = () => {
  return (
    <div className="incentiveReportPaymentReport-container">
      <h3><i class="fa-solid fa-star-of-life"></i> Incentive Payment Summary Report</h3>
      <div className="incentiveReportPaymentReport-filters">
        <div className="incentiveReportPaymentReport-date-range">
          <label>From: </label>
          <input type="date" />
          <label>To: </label>
          <input type="date" />


        </div>
        <button className="incentiveReportPaymentReport-load-button"><i class="fa-solid fa-magnifying-glass"></i> Show Report</button>
      </div>

      
    </div>
  );
};

export default IncentiveReportPaymentReport;
