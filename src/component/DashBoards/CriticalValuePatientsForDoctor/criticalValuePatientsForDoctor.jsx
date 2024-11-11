import React, { useState, useRef } from 'react';
import './criticalValuePatientsForDoctor.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';


const CriticalValuePatientsForDoctor = () => {
    const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null); 

  const [dateRange, setDateRange] = useState({
    startDate: '26/10/2024',
    endDate: '05/11/2024'
  });

  return (
    <div className="criticalValuePatientsForDoctor-schedule">
      <div className="criticalValuePatientsForDoctor-header">
        <div className="criticalValuePatientsForDoctor-title">Critical Value Patients For Doctor</div>
        <div className="criticalValuePatientsForDoctor-controls">
          <button className="criticalValuePatientsForDoctor-nav-btn">Today</button>
          <button className="criticalValuePatientsForDoctor-nav-btn">Yesterday</button>
          <button className="criticalValuePatientsForDoctor-nav-btn">Last Week</button>
          <button className="criticalValuePatientsForDoctor-nav-btn">This Month Till Date</button>
          <button className="criticalValuePatientsForDoctor-nav-btn">Last Month</button>
          <button className="criticalValuePatientsForDoctor-nav-btn">Last 3 Month</button>
          <button className="criticalValuePatientsForDoctor-nav-btn">Last 6 Month</button>
          <button className="criticalValuePatientsForDoctor-nav-btn">Last One Year</button>
          <div className="criticalValuePatientsForDoctor-date-range">
            <input type="text" value={dateRange.startDate} readOnly />
            <input type="text" value={dateRange.endDate} readOnly />
          </div>
          <button className="criticalValuePatientsForDoctor-action-btn">Close</button>
          <button className="criticalValuePatientsForDoctor-action-btn">Refresh</button>
          {/* <button className="criticalValuePatientsForDoctor-settings-btn">⚙️</button> */}
        </div>
      </div>

      <div className="criticalValuePatientsForDoctor-content">
        <div className="criticalValuePatientsForDoctor-left-panel">
          <div className="criticalValuePatientsForDoctor-panel-header">
            <div className="criticalValuePatientsForDoctor-panel-title">Ward Wise No Of Critical Patients for Doctor</div>
            <button className="criticalValuePatientsForDoctor-menu-btn">⋮</button>
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
          <div className="criticalValuePatientsForDoctor-no-records">
            No Records Found
          </div>
        </div>

        <div className="criticalValuePatientsForDoctor-right-panel">
          <div className="criticalValuePatientsForDoctor-panel-header">
            <div className="criticalValuePatientsForDoctor-panel-title">Critical Value Patients Details</div>
          </div>
          <div className="criticalValuePatientsForDoctor-no-records">
            No Records Found
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriticalValuePatientsForDoctor;