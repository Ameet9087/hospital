// import React from "react";
// import "../IncentiveTransactions/incentiveTransactionsBillScan.css"

// const IncentiveTransactionsBillScan = () => {
//   return (
//     <div className="incentiveTransactionsBillScan-container">
//       <h3>Calculate and Load Incentive from Billing</h3>
//       <div className="incentiveTransactionsBillScan-filters">
//         <div className="incentiveTransactionsBillScan-date-range">
//           <label>From: </label>
//           <input type="date" />
//           <label>To: </label>
//           <input type="date" />
//           <button className="incentiveTransactionsBillScan-icon-button incentiveTransactionsBillScan-star">★</button>
//           <button className="incentiveTransactionsBillScan-icon-button incentiveTransactionsBillScan-dash">-</button>
//         </div>
//         <button className="incentiveTransactionsBillScan-load-button"><i class="fa-solid fa-rotate"></i> Sync Billing to Incentive</button>
//       </div>

      
//     </div>
//   );
// };

// export default IncentiveTransactionsBillScan;

 /* Ajhar Tamboli IncentiveTransactionsBillScan.jsx 18-09-2024 */

import React, { useState } from "react";
import "../IncentiveTransactions/incentiveTransactionsBillScan.css";

const IncentiveTransactionsBillScan = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [incentives, setIncentives] = useState([]);

  const fetchIncentives = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://192.168.1.37:7676/api/incentives/between-dates?startDate=${encodeURIComponent(
          startDate
        )}&endDate=${encodeURIComponent(endDate)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch incentives");
      }
      const data = await response.json();
      setIncentives(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="incentiveTransactionsBillScan-container">
      <h3>Calculate and Load Incentive from Billing</h3>
      <div className="incentiveTransactionsBillScan-filters">
        <div className="incentiveTransactionsBillScan-date-range">
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
        <button
          className="incentiveTransactionsBillScan-load-button"
          onClick={fetchIncentives}
        >
          <i className="fa-solid fa-rotate"></i> Sync Billing to Incentive
        </button>
      </div>

      {/* Display Loading, Error, or Data */}
      {loading && <p>Loading incentives...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && incentives.length > 0 && (
        <div className="incentiveTransactionsBillScan-results">
          <h4>Incentives List</h4>
          <ul>
            {incentives.map((incentive, index) => (
              <li key={index}>{JSON.stringify(incentive)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IncentiveTransactionsBillScan;
