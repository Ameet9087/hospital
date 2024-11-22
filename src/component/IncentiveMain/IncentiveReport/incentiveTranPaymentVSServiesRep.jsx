 /* Ajhar Tamboli incentiveTranPaymentVSServiesRep.jsx 18-09-2024 */

import React, { useState } from "react";
import "../IncentiveReport/incentiveTranPaymentVSServiesRep.css"



const IncentiveTranPaymentVSServiesRep = () => {
  return (
    <div className="incentiveTranPaymentVSServiesRep-container">
      <h3><i class="fa-solid fa-star-of-life"></i> Incentive Patient Vs Service Report</h3>
      <div className="incentiveTranPaymentVSServiesRep-filters">
        <div className="incentiveTranPaymentVSServiesRep-date-range">
          <label>From: </label>
          <input type="date" />
          <label>To: </label>
          <input type="date" />
      
        </div>
      <div className="incentiveTranPaymentVSServiesRep-Select-Doctor">
        <label htmlFor="">Select Doctor:</label>
        <input type="text" name="" id="" placeholder="Search Doctor Name" />
      </div>
        <div>
        <button className="incentiveTranPaymentVSServiesRep-load-button"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
      </div>
      </div>
      
    </div>
  );
};

export default IncentiveTranPaymentVSServiesRep;