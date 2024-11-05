// import React from "react";
// import "../IncentiveTransactions/incentiveTransationPayment.css"

// const IncentiveTransationPayment = () => {
//   return (
//     <div className="incentiveTransationPayment-container">
//       <h3><i class="fa-solid fa-star-of-life"></i> Payment Detail</h3>
//       <div className="incentiveTransationPayment-filters">
//         <div className="incentiveTransationPayment-date-range">
//           <label>From: </label>
//           <input type="date" />
//           <label>To: </label>
//           <input type="date" />
//           <button className="incentiveTransationPayment-icon-button incentiveTransationPayment-star">★</button>
//           <button className="incentiveTransationPayment-icon-button incentiveTransationPayment-dash">-</button>
//         </div>
//       <div className="incentiveTransationPayment-Select-Doctor">
//         <label htmlFor="">Select Doctor:</label>
//         <input type="text" name="" id="" placeholder="Search Doctor Name" />
//       </div>
//         <div>
//         <button className="incentiveTransationPayment-load-button"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
//       </div>
//       </div>
      
//     </div>
//   );
// };

// export default IncentiveTransationPayment;
 /* Ajhar Tamboli IncentiveTransationPayment.jsx 18-09-2024 */

import React, { useState } from "react";
import "../IncentiveTransactions/incentiveTransationPayment.css";

const IncentiveTransationPayment = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    if (!startDate || !endDate || !doctorName) {
      setError("Please fill all the fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://192.168.1.42:7676/api/payments/filter?doctorName=${encodeURIComponent(
          doctorName
        )}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(
          endDate
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="incentiveTransationPayment-container">
      <h3>
        <i className="fa-solid fa-star-of-life"></i> Payment Detail
      </h3>
      <div className="incentiveTransationPayment-filters">
        <div className="incentiveTransationPayment-date-range">
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
        <div className="incentiveTransationPayment-Select-Doctor">
          <label>Select Doctor:</label>
          <input
            type="text"
            placeholder="Search Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
        <div>
          <button
            className="incentiveTransationPayment-load-button"
            onClick={fetchPayments}
          >
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </div>
      </div>

      {/* Display Loading, Error, or Data */}
      {loading && <p>Loading payments...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && payments.length > 0 && (
        <div className="incentiveTransationPayment-results">
          <h4>Payments List</h4>
          <ul>
            {payments.map((payment, index) => (
              <li key={index}>{JSON.stringify(payment)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IncentiveTransationPayment;
