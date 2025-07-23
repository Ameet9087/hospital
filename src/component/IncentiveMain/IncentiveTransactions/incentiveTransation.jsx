
// import React, { useState } from "react";
// import "../IncentiveTransactions/incentiveTransation.css";
// import IncentiveTransationInvoiceItem from "./incentiveTransationInvoice-Item";
// import IncentiveTransactionsBillScan from "./incentiveTransactionsBillScan";
// import IncentiveTransationPayment from "./incentiveTransationPayment";

// const IncentiveTransation = () => {
//   const [selectedTab, setSelectedTab] = useState("Invoice"); // State to manage the selected tab

//   // Function to render the content based on the selected tab
//   const renderTabContent = () => {
//     switch (selectedTab) {
//       case "Invoice":
//         return <div>
//             <div className="incentiveTransation-filters">
//                  <div className="incentiveTransation-date-range">
//                    <label>From: </label>
//                    <input type="date" />
//                    <label>To: </label>
//                    <input type="date" />
//                    <button className="incentiveTransation-icon-button incentiveTransation-star">★</button>
//                    <button className="incentiveTransation-icon-button incentiveTransation-dash">-</button>
//                  </div>
//                  <button className="incentiveTransation-load-button"><i class="fa-solid fa-rotate"></i> Load</button>
//                </div>
//         <div className="incentiveTransation-search-N-sms">
//                <input type="text" className="incentiveTransation-search-input" placeholder="type to search" />
//                <div className="incentiveTransation-info-text">(0) invoices found..</div>
//                </div>
//         </div> 
//         ;
//       case "Invoice-Items":
//         return <IncentiveTransationInvoiceItem />;
//       case "Bill Sync":
//         return <IncentiveTransactionsBillScan />; // Render the Bill Sync component
//       case "Payment":
//         return <IncentiveTransationPayment/>;
//       default:
//         return <div>Invoice Content Here</div>;
//     }
//   };



//   return (
//     <div className="incentiveTransation-container">
//       <div className="incentiveTransation-tabs">
//         <div
//           className={`incentiveTransation-tab ${
//             selectedTab === "Invoice" ? "incentiveTransation-selected" : ""
//           }`}
//           onClick={() => setSelectedTab("Invoice")}
//         >
//           Invoice
//         </div>
//         <div
//           className={`incentiveTransation-tab ${
//             selectedTab === "Invoice-Items" ? "incentiveTransation-selected" : ""
//           }`}
//           onClick={() => setSelectedTab("Invoice-Items")}
//         >
//           Invoice-Items
//         </div>
//         <div
//           className={`incentiveTransation-tab ${
//             selectedTab === "Bill Sync" ? "incentiveTransation-selected" : ""
//           }`}
//           onClick={() => setSelectedTab("Bill Sync")}
//         >
//           Bill Sync
//         </div>
//         <div
//           className={`incentiveTransation-tab ${
//             selectedTab === "Payment" ? "incentiveTransation-selected" : ""
//           }`}
//           onClick={() => setSelectedTab("Payment")}
//         >
//           Payment
//         </div>
//       </div>

//       {/* Render content based on the selected tab */}
//       {renderTabContent()}
//     </div>
//   );
// };

// export default IncentiveTransation;


// Ajhar Tamboli IncentiveTransaction.jsx 18-09-2024

import React, { useState, useEffect } from "react";
import "../IncentiveTransactions/incentiveTransation.css";
import IncentiveTransationInvoiceItem from "./incentiveTransationInvoice-Item";
import IncentiveTransactionsBillScan from "./incentiveTransactionsBillScan";
import IncentiveTransationPayment from "./incentiveTransationPayment";

const IncentiveTransation = () => {
  const [selectedTab, setSelectedTab] = useState("Invoice"); // State to manage the selected tab
  const [startDate, setStartDate] = useState(""); // State to manage the start date
  const [endDate, setEndDate] = useState(""); // State to manage the end date
  const [invoices, setInvoices] = useState([]); // State to store fetched invoices
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  // Function to fetch invoices based on date range
//   const fetchInvoices = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `http://192.168.1.37:9090/api/invoices/between-dates?startDate=${startDate}&endDate=${endDate}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch invoices");
//       }
//       const data = await response.json();
//       setInvoices(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
const fetchInvoices = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(
        `http://192.168.1.42:7676/api/invoices/between-dates?startDate=${encodeURIComponent(
          startDate
        )}&endDate=${encodeURIComponent(endDate)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Effect to fetch data when date range changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchInvoices();
    }
  }, [startDate, endDate]);

  // Function to render the content based on the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Invoice":
        return (
          <div>
            <div className="incentiveTransation-filters">
              <div className="incentiveTransation-date-range">
                <label>From: </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label>To: </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                

              </div>
             
            </div>
            <div className="incentiveTransation-search-N-sms">
              <input
                type="text"
                className="incentiveTransation-search-input"
                placeholder="type to search"
              />
              <div className="incentiveTransation-info-text">
                {loading ? "Loading..." : `${invoices.length} invoices found.`}
              </div>
            </div>
            {error && <div className="error">{error}</div>}
          </div>
        );
      case "Invoice-Items":
        return <IncentiveTransationInvoiceItem />;
      case "Bill Sync":
        return <IncentiveTransactionsBillScan />; // Render the Bill Sync component
      case "Payment":
        return <IncentiveTransationPayment />;
      default:
        return <div>Invoice Content Here</div>;
    }
  };

  return (
    <div className="incentiveTransation-container">
      <div className="incentiveTransation-tabs">
        <div
          className={`incentiveTransation-tab ${
            selectedTab === "Invoice" ? "incentiveTransation-selected" : ""
          }`}
          onClick={() => setSelectedTab("Invoice")}
        >
          Invoice
        </div>
        <div
          className={`incentiveTransation-tab ${
            selectedTab === "Invoice-Items" ? "incentiveTransation-selected" : ""
          }`}
          onClick={() => setSelectedTab("Invoice-Items")}
        >
          Invoice-Items
        </div>
        <div
          className={`incentiveTransation-tab ${
            selectedTab === "Bill Sync" ? "incentiveTransation-selected" : ""
          }`}
          onClick={() => setSelectedTab("Bill Sync")}
        >
          Bill Sync
        </div>
        <div
          className={`incentiveTransation-tab ${
            selectedTab === "Payment" ? "incentiveTransation-selected" : ""
          }`}
          onClick={() => setSelectedTab("Payment")}
        >
          Payment
        </div>
      </div>

      {/* Render content based on the selected tab */}
      {renderTabContent()}
    </div>
  );
};

export default IncentiveTransation;
