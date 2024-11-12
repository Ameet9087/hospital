import React, { useState, useRef } from 'react';
import './discountforDoctorServices.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';


const DiscountforDoctorServices = () => {
    const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null); 

  const [dateRange, setDateRange] = useState({
    startDate: '26/10/2024',
    endDate: '05/11/2024'
  });

  return (
    <div className="discountforDoctorServices-schedule">
      <div className="discountforDoctorServices-header">
        <div className="discountforDoctorServices-title">Discount for Doctor Services</div>
        <div className="discountforDoctorServices-controls">
          <button className="discountforDoctorServices-nav-btn">Today</button>
          <button className="discountforDoctorServices-nav-btn">Yesterday</button>
          <button className="discountforDoctorServices-nav-btn">Last Week</button>
          <button className="discountforDoctorServices-nav-btn">This Month Till Date</button>
          <button className="discountforDoctorServices-nav-btn">Last Month</button>
          <button className="discountforDoctorServices-nav-btn">Last 3 Month</button>
          <button className="discountforDoctorServices-nav-btn">Last 6 Month</button>
          <button className="discountforDoctorServices-nav-btn">Last One Year</button>
          <div className="discountforDoctorServices-date-range">
            <input type="text" value={dateRange.startDate} readOnly />
            <input type="text" value={dateRange.endDate} readOnly />
          </div>
          <button className="discountforDoctorServices-action-btn">Close</button>
          <button className="discountforDoctorServices-action-btn">Refresh</button>
          {/* <button className="discountforDoctorServices-settings-btn">⚙️</button> */}
        </div>
      </div>

      <div className="discountforDoctorServices-content">
        <div className="discountforDoctorServices-left-panel">
          <div className="discountforDoctorServices-panel-header">
            <div className="discountforDoctorServices-panel-title">Discount for Doctor Services</div>
            <button className="discountforDoctorServices-menu-btn">⋮</button>
          </div>
          {/* <div className="table-container">
            <table ref={tableRef}>
              <thead>
                <tr>{[
                  "SN",
                  "No Of Patients",
                ].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: columnWidths[index] }}
                      className="resizable-th"
                    >
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(
                            tableRef,
                            setColumnWidths
                          )(index)}
                        ></div>
                      </div>
                      </th>
                        ))}
                </tr>
              </thead>
              <tbody>
              <tr>
              <td>1</td>
              <td>0</td>
              </tr>
              </tbody>
              </table>
              </div> */}
              <div className="discountforDoctorServices-no-records">
                No Records Found
              </div>
        </div>

        <div className="discountforDoctorServices-right-panel">
          <div className="discountforDoctorServices-panel-header">
            <div className="discountforDoctorServices-panel-title">Patient Details For Discount Services</div>
          </div>
          <div className="discountforDoctorServices-no-records">
            No Records Found
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountforDoctorServices;