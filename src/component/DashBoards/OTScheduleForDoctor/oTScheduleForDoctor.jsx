import React, { useState, useRef } from 'react';
import './oTScheduleForDoctor.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';


const OTScheduleForDoctor = () => {
    const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null); 

  const [dateRange, setDateRange] = useState({
    startDate: '26/10/2024',
    endDate: '05/11/2024'
  });

  return (
    <div className="oTScheduleForDoctor-schedule">
      <div className="oTScheduleForDoctor-header">
        <div className="oTScheduleForDoctor-title">OT Schedule For Doctor</div>
        <div className="oTScheduleForDoctor-controls">
          <button className="oTScheduleForDoctor-nav-btn">Today</button>
          <button className="oTScheduleForDoctor-nav-btn">Yesterday</button>
          <button className="oTScheduleForDoctor-nav-btn">Last Week</button>
          <button className="oTScheduleForDoctor-nav-btn">This Month Till Date</button>
          <button className="oTScheduleForDoctor-nav-btn">Last Month</button>
          <button className="oTScheduleForDoctor-nav-btn">Last 3 Month</button>
          <button className="oTScheduleForDoctor-nav-btn">Last 6 Month</button>
          <button className="oTScheduleForDoctor-nav-btn">Last One Year</button>
          <div className="oTScheduleForDoctor-date-range">
            <input type="text" value={dateRange.startDate} readOnly />
            <input type="text" value={dateRange.endDate} readOnly />
          </div>
          <button className="oTScheduleForDoctor-action-btn">Close</button>
          <button className="oTScheduleForDoctor-action-btn">Refresh</button>
          {/* <button className="oTScheduleForDoctor-settings-btn">⚙️</button> */}
        </div>
      </div>

      <div className="oTScheduleForDoctor-content">
        <div className="oTScheduleForDoctor-left-panel">
          <div className="oTScheduleForDoctor-panel-header">
            <div className="oTScheduleForDoctor-panel-title">Ot Patient Count</div>
            <button className="oTScheduleForDoctor-menu-btn">⋮</button>
          </div>
          <div className="table-container">
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
          </div>
        </div>

        <div className="oTScheduleForDoctor-right-panel">
          <div className="oTScheduleForDoctor-panel-header">
            <div className="oTScheduleForDoctor-panel-title">Ot Patient Details</div>
          </div>
          <div className="oTScheduleForDoctor-no-records">
            No Records Found
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTScheduleForDoctor;