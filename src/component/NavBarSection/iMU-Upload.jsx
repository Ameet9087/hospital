import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../NavBarSection/iMU-Upload.css';

function IMUUploadPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="imuUpload-page">
      <div className="imuUpload-filters">
      <div className="imuUpload-controls">
        {/* Your date range and button controls */}
          <div className="imuUpload-date-range">
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
        <div className="imuUpload-buttons">
          <button className="imuUpload-upload-to-imu"><i class="fa-solid fa-upload"></i> Upload To IMU</button>
        </div>
      </div>

<div className='imuUpload-search-N-upload'>
<div className="imuUpload-search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search"
                className="imuUpload-search-input"
              />
            </div>

      <div className="imuUpload-upload-status">
        <label className='imuUpload-checkbx'><input type="radio" name="status" checked /> UploadPending</label>
        <label className='imuUpload-checkbx'><input type="radio" name="status" /> UploadCompleted</label>
        <label className='imuUpload-checkbx'><input type="radio" name="status" /> All</label>
      </div>
      <div className="imuUpload-Showing">
          <span>Showing {} / {} results</span>
          <button className="imuUpload-print-button" onClick={""}><i className="fa-solid fa-file-excel"></i> Export</button>
          <button className="imuUpload-print-button" onClick={""}><i class="fa-solid fa-print"></i> Print</button>
        
        </div>
      </div>

      <table className="imuUpload-data-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Hospital No.</th>
            <th>Patient Name</th>
            <th>Age/Sex</th>
            <th>Phone Number</th>
            <th>TestName</th>
            <th>Sample Coll. On</th>
            <th>Result</th>
            <th>Upload Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows would go here */}
        </tbody>
      </table>

      <div className="imuUpload-pagination">
        <button>« Previous</button>
        <button>Next »</button>
      </div>
    </div>
  );
}

export default IMUUploadPage;