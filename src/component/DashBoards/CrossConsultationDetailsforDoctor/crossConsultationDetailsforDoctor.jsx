import React, { useState, useRef } from 'react';
import './crossConsultationDetailsforDoctor.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';


const CrossConsultationDetailsforDoctor = () => {
    const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null); 

  const [dateRange, setDateRange] = useState({
    startDate: '26/10/2024',
    endDate: '05/11/2024'
  });

  return (
    <div className="crossConsultationDetailsforDoctor-schedule">
      <div className="crossConsultationDetailsforDoctor-header">
        <div className="crossConsultationDetailsforDoctor-title">Cross Consultation Details for Doctor</div>
        <div className="crossConsultationDetailsforDoctor-controls">
          <button className="crossConsultationDetailsforDoctor-nav-btn">Today</button>
          <button className="crossConsultationDetailsforDoctor-nav-btn">Yesterday</button>
          <button className="crossConsultationDetailsforDoctor-nav-btn">Last Week</button>
          <button className="crossConsultationDetailsforDoctor-nav-btn">This Month Till Date</button>
          <button className="crossConsultationDetailsforDoctor-nav-btn">Last Month</button>
          <button className="crossConsultationDetailsforDoctor-nav-btn">Last 3 Month</button>
          <button className="crossConsultationDetailsforDoctor-nav-btn">Last 6 Month</button>
          <button className="crossConsultationDetailsforDoctor-nav-btn">Last One Year</button>
          <div className="crossConsultationDetailsforDoctor-date-range">
            <input type="text" value={dateRange.startDate} readOnly />
            <input type="text" value={dateRange.endDate} readOnly />
          </div>
          <button className="crossConsultationDetailsforDoctor-action-btn">Close</button>
          <button className="crossConsultationDetailsforDoctor-action-btn">Refresh</button>
          {/* <button className="crossConsultationDetailsforDoctor-settings-btn">⚙️</button> */}
        </div>
      </div>

      <div className="crossConsultationDetailsforDoctor-content">
        <div className="crossConsultationDetailsforDoctor-left-panel">
          <div className="crossConsultationDetailsforDoctor-panel-header">
            <div className="crossConsultationDetailsforDoctor-panel-title">Referred To Me</div>
            <button className="crossConsultationDetailsforDoctor-menu-btn">⋮</button>
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

        <div className="right-panel">
          <div className="crossConsultationDetailsforDoctor-panel-header">
            <div className="crossConsultationDetailsforDoctor-panel-title">Patient Details</div>
          </div>
          <div className="crossConsultationDetailsforDoctor-no-records">
            No Records Found
          </div>
        </div>
      </div>
      <div className="crossConsultationDetailsforDoctor-content">
        <div className="crossConsultationDetailsforDoctor-left-panel">
          <div className="crossConsultationDetailsforDoctor-panel-header">
            <div className="crossConsultationDetailsforDoctor-panel-title">Referred By Me</div>
            <button className="crossConsultationDetailsforDoctor-menu-btn">⋮</button>
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

        <div className="crossConsultationDetailsforDoctor-right-panel">
          <div className="crossConsultationDetailsforDoctor-panel-header">
            <div className="crossConsultationDetailsforDoctor-panel-title">Referred Patient Details</div>
          </div>
          <div className="crossConsultationDetailsforDoctor-no-records">
            No Records Found
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossConsultationDetailsforDoctor;