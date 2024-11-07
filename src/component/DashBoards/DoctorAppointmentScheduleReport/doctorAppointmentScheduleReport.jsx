import React, { useState, useRef } from 'react';
import './doctorAppointmentScheduleReport.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';


const DoctorAppointmentScheduleReport = () => {
    const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null); 

  const [dateRange, setDateRange] = useState({
    startDate: '26/10/2024',
    endDate: '05/11/2024'
  });

  return (
    <div className="doctorAppointmentScheduleReport-schedule">
      <div className="doctorAppointmentScheduleReport-header">
        <div className="doctorAppointmentScheduleReport-title">OT Schedule For Doctor</div>
        <div className="doctorAppointmentScheduleReport-controls">
          <button className="doctorAppointmentScheduleReport-nav-btn">Today</button>
          <button className="doctorAppointmentScheduleReport-nav-btn">Yesterday</button>
          <button className="doctorAppointmentScheduleReport-nav-btn">Last Week</button>
          <button className="doctorAppointmentScheduleReport-nav-btn">This Month Till Date</button>
          <button className="doctorAppointmentScheduleReport-nav-btn">Last Month</button>
          <button className="doctorAppointmentScheduleReport-nav-btn">Last 3 Month</button>
          <button className="doctorAppointmentScheduleReport-nav-btn">Last 6 Month</button>
          <button className="doctorAppointmentScheduleReport-nav-btn">Last One Year</button>
          <div className="doctorAppointmentScheduleReport-date-range">
            <input type="text" value={dateRange.startDate} readOnly />
            <input type="text" value={dateRange.endDate} readOnly />
          </div>
          <button className="doctorAppointmentScheduleReport-action-btn">Close</button>
          <button className="doctorAppointmentScheduleReport-action-btn">Refresh</button>
          {/* <button className="doctorAppointmentScheduleReport-settings-btn">⚙️</button> */}
        </div>
      </div>

      <div className="doctorAppointmentScheduleReport-content">
        <div className="right-panel">
          <div className="doctorAppointmentScheduleReport-panel-header">
            <div className="doctorAppointmentScheduleReport-panel-title">Doctor Appointment For The Week</div>
          </div>
          <div className="doctorAppointmentScheduleReport-no-records">
            No Records Found
          </div>
        </div>
        <div className="doctorAppointmentScheduleReport-right-panel">
          <div className="doctorAppointmentScheduleReport-panel-header">
            <div className="doctorAppointmentScheduleReport-panel-title">Doctor Schedule For The Week</div>
          </div>
          <div className="doctorAppointmentScheduleReport-no-records">
            No Records Found
          </div>
        </div>

        <div className="doctorAppointmentScheduleReport-left-panel">
          <div className="doctorAppointmentScheduleReport-panel-header">
            <div className="doctorAppointmentScheduleReport-panel-title">No Of Appoinments For The Doctor</div>
            <button className="doctorAppointmentScheduleReport-menu-btn">⋮</button>
          </div>
          <div className="table-container">
            <table ref={tableRef}>
              <thead>
                <tr>{[
                  "SN",
                  "No Of Appointments",
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

      </div>
    </div>
  );
};

export default DoctorAppointmentScheduleReport;