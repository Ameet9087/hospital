 /* Ajhar Tamboli incentiveReport.jsx 18-09-2024 */

import React, { useState } from "react";
// import "../IncentiveTransactions/incentiveTransation.css";
import "../IncentiveReport/incentiveReport.css"
import IncentiveReportPaymentReport from "./incentiveReportPaymentReport";
import IncentiveTranPaymentVSServiesRep from "./incentiveTranPaymentVSServiesRep";
import IncentiveTranRefralSummaryReport from "./incentiveTranRefralSummaryReport";
import IncentiveTranHospitalIncome from "./incentiveTranHospitalIncome";
// import IncentiveTransationInvoiceItem from "./incentiveTransationInvoice-Item";
// import IncentiveTransactionsBillScan from "./incentiveTransactionsBillScan";
// import incentiveReportNew from "./incentiveReportNew";

const IncentiveReport = () => {
  const [selectedTab, setSelectedTab] = useState("Invoice"); // State to manage the selected tab

  // Function to render the content based on the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Invoice":
         return <div className="incentiveReportNew-container">
      <h3><i class="fa-solid fa-star-of-life"></i> Incentive Summary Report</h3>
      <div className="incentiveReportNew-filters">
        <div className="incentiveReportNew-date-range">
          <label>From: </label>
          <input type="date" />
          <label>To: </label>
          <input type="date" />


        </div>
      <div className="incentiveReportNew-Select-Doctor">
        <label htmlFor="">Select Doctor:</label>
        <input type="text" name="" id="" placeholder="Search Doctor Name" />
      </div>
        <div>
        <button className="incentiveReportNew-load-button"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
      </div>
      </div>
      
    </div>
         //<div>
        //     <div className="incentiveReport-filters">
        //          <div className="incentiveReport-date-range">
        //            <label>From: </label>
        //            <input type="date" />
        //            <label>To: </label>
        //            <input type="date" />
        //            <button className="incentiveReport-icon-button incentiveReport-star">★</button>
        //            <button className="incentiveReport-icon-button incentiveReport-dash">-</button>
        //          </div>
        //          <button className="incentiveReport-load-button"><i class="fa-solid fa-rotate"></i> Load</button>
        //        </div>
        // <div className="incentiveReport-search-N-sms">
        //        <input type="text" className="incentiveReport-search-input" placeholder="type to search" />
        //        <div className="incentiveReport-info-text">(0) invoices found..</div>
        //        </div>
        // </div> 
        ;
      case "Invoice-Items":
        return <IncentiveReportPaymentReport />;
      case "Bill Sync":
        return <IncentiveTranPaymentVSServiesRep />; // Render the Bill Sync component
      case "Incentive Patient Vs Service Report":
        return <IncentiveTranRefralSummaryReport/>;
      case "Hospital Income Report":
        return <IncentiveTranHospitalIncome/>;
      default:
        return <div>Invoice Content Here</div>;
    }
  };

  return (
    <div className="incentiveReport-container">
      <div className="incentiveReport-tabs">
        <div
          className={`incentiveReport-tab ${
            selectedTab === "Invoice" ? "incentiveReport-selected" : ""
          }`}
          onClick={() => setSelectedTab("Invoice")}
        >
          Transaction Report
        </div>
        <div
          className={`incentiveReport-tab ${
            selectedTab === "Invoice-Items" ? "incentiveReport-selected" : ""
          }`}
          onClick={() => setSelectedTab("Invoice-Items")}
        >
          Payment Report
        </div>
        <div
          className={`incentiveReport-tab ${
            selectedTab === "Bill Sync" ? "incentiveReport-selected" : ""
          }`}
          onClick={() => setSelectedTab("Bill Sync")}
        >
          Payment vs Service Report
        </div>
        <div
          className={`incentiveReport-tab ${
            selectedTab === "Incentive Patient Vs Service Report" ? "incentiveReport-selected" : ""
          }`}
          onClick={() => setSelectedTab("Incentive Patient Vs Service Report")}
        >
          Referral Summary Report
        </div>
        <div
          className={`incentiveReport-tab ${
            selectedTab === "Hospital Income Report" ? "incentiveReport-selected" : ""
          }`}
          onClick={() => setSelectedTab("Hospital Income Report")}
        >
         Hospital Income
        </div>
      </div>

      {/* Render content based on the selected tab */}
      {renderTabContent()}
    </div>
  );
};

export default IncentiveReport;
