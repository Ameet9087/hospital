 /* Ajhar Tamboli incentiveTranHospitalIncome.jsx 18-09-2024 */

import React, { useState } from "react";
import "../IncentiveReport/incentiveTranHospitalIncome.css"



const IncentiveTranHospitalIncome = () => {
  return (
    <div className="incentiveTranHospitalIncome-container">
      <h3><i class="fa-solid fa-star-of-life"></i> Hospital Income Report</h3>
      <div className="incentiveTranHospitalIncome-filters">
        <div className="incentiveTranHospitalIncome-date-range">
          <label>From: </label>
          <input type="date" />
          <label>To: </label>
          <input type="date" />
        </div>
      <div className="incentiveTranHospitalIncome-Select-Doctor">
        <label htmlFor="">Select Doctor:</label>
        <input type="text" name="" id="" placeholder="Search Doctor Name" />
      </div>
        <div>
        <button className="incentiveTranHospitalIncome-load-button"><i class="fa-solid fa-magnifying-glass"></i> Show Report</button>
      </div>
      </div>
      
    </div>
  );
};

export default IncentiveTranHospitalIncome;