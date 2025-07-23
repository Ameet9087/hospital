import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IMUUploadPage from "../NavBarSection/iMU-Upload";
import "../NavBarSection/navNotification.css";

function NavNotification() {
  const [selectedTab, setSelectedTab] = useState("SMS"); // State to keep track of the selected tab
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="labNotificationSms-page">
      <div className="labNotificationSms-N-imu-btn">
      <div className="labNotificationSms-tabs">
        <button
          className={`labNotificationSms-tab ${selectedTab === "SMS" ? "labNotificationSms-active" : ""}`}
          onClick={() => setSelectedTab("SMS")}
        >
          SMS
        </button>
        </div>
        <div className="labNotificationSms-tabs"> 
        <button
          className={`labNotificationSms-tab ${selectedTab === "IMU" ? "labNotificationSms-active" : ""}`}
          onClick={() => setSelectedTab("IMU")}
        >
          IMU Upload
        </button>
      </div>
      </div>

      {selectedTab === "SMS" ? (
        <div className="labNotificationSms-content">
          
          <div className="labNotificationSms-filters">
          <div className="labNotificationSms-controls">
        {/* Your date range and button controls */}
          <div className="labNotificationSms-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
         </div>
      </div>

              <div>
              <button className="labNotificationSms-show-data-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              Show Data</button>

            </div>

            <div className="labNotificationSms-filter-options">
              <span>Filter SMS:</span>
              <label className="labNotificationSms-checkbx">
                <input type="checkbox" /> Sent
              </label>
              <label className="labNotificationSms-checkbx">
                <input type="checkbox" checked readOnly /> NotSent
              </label>
            </div>
          </div>

          <div className="labNotificationSms-search-n-filter">

            <div className="labNotificationSms-search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search"
                className="labNotificationSms-search-input"
              />
            </div>

            

            <div className="labNotificationSms-filter-findings">
              <span>Filter Findings:</span>
              <label className="labNotificationSms-checkbx">
                <input type="checkbox" /> Positive
              </label>
              <label className="labNotificationSms-checkbx">
                <input type="checkbox" /> Negative
              </label>
              <label className="labNotificationSms-checkbx">
                <input type="checkbox" /> All
              </label>
            </div>
            <div className="labNotificationSms-Showing">
          <span>Showing {} / {} results</span>
          <button className="labNotificationSms-print-button" onClick={""}><i className="fa-solid fa-file-excel"></i> Export</button>
          <button className="labNotificationSms-print-button" onClick={""}><i class="fa-solid fa-print"></i> Print</button>
        
        </div>
          </div>

          <table className="labNotificationSms-data-table">
            <thead>
              <tr>
                <th>Hospital No.</th>
                <th>Patient Name</th>
                <th>Age/Sex</th>
                <th>Phone Number</th>
                <th>TestName</th>
                <th>Sample Coll. On</th>
                <th>Result</th>
                <th>Uploaded ?</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{/* Table rows would go here */}</tbody>
          </table>

          <div className="labNotificationSms-pagination">
            <button> « Previous</button>
            <button>Next »</button>
          </div>
        </div>
      ) : (
        <IMUUploadPage />
      )}
    </div>
  );
}

export default NavNotification;
