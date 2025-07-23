import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../NavLIS/navLIS-MachineResults.css"



function NavLISMachineResults() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="labLIS-MachineResults-upload-page">
      <div className="labLIS-MachineResults-filters">
       
        <div className="labLIS-MachineResults-controls">
        {/* Your date range and button controls */}
          <div className="labLIS-MachineResults-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
            <button className="labLIS-MachineResults-star-button">☆</button>
          <button className="labLIS-MachineResults-more-btn">-</button>
            <button className="labLIS-MachineResults-ok-button">OK</button>
          </div>
      </div>
        <div className="labLIS-MachineResults-buttons">
            <input type="text" name="" id="" />
          <button className="labLIS-MachineResults-load-data">Load  <i className="fa-solid fa-rotate"></i></button>
        </div>
      </div>



      
    </div>
  );
}

export default NavLISMachineResults;