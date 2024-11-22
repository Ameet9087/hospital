import React, { useState, useRef } from 'react';
import './doctorsNightDutyRoster.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

const DoctorsNightDutyRoster = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
  return (
    <div className="doctorsNightDutyRoster-roster">
      <header>
        <div className="doctorsNightDutyRoster-header-left">
          <button className="doctorsNightDutyRoster-back-btn">←</button>
          <h1>Doctors Night Duty Roster</h1>
        </div>
        <div className="doctorsNightDutyRoster-header-right">
          {/* <button className="doctorsNightDutyRoster-icon-btn">ℹ️</button> */}
          {/* <button className="doctorsNightDutyRoster-icon-btn">✖️</button> */}
        </div>
      </header>

      <div className="doctorsNightDutyRoster-content">
        <div className="doctorsNightDutyRoster-duty-register">
          <label>
            Duty Register
            <span className="doctorsNightDutyRoster-required">*</span>
          </label>
          <input type="text" className="doctorsNightDutyRoster-duty-input" />
        </div>

        <div className="doctorsNightDutyRoster-section">
          <div className="doctorsNightDutyRoster-section-header">
            <h2>
              Doctors Specialization
              {/* <span className="doctorsNightDutyRoster-control-text">( Control + Enter For New Row )</span> */}
            </h2>
            <button className="doctorsNightDutyRoster-search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>

          <div className="table-container">
            <table ref={tableRef}>
              <thead>
                <tr>{[
                  <th className="doctorsNightDutyRoster-action-column">
                    <span className="doctorsNightDutyRoster-add-link">Add</span>
                    <span className="doctorsNightDutyRoster-del-link">Del</span>
                  </th>,
                  "SN",
                  "Date",
                  "Speciality",
                  "Doctor Name"
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
                  <td className="doctorsNightDutyRoster-action-column">
                    <button className="doctorsNightDutyRoster-add-btn">Add</button>
                    <button className="doctorsNightDutyRoster-del-btn">Del</button>
                  </td>
                  <td>1</td>
                  <td>05/11/2024</td>
                  <td>
                    <div className="doctorsNightDutyRoster-search-field">
                      <input type="text" />
                      <button className="doctorsNightDutyRoster-search-icon"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                  </td>
                  <td>
                    <div className="doctorsNightDutyRoster-search-field">
                      <input type="text" />
                      <button className="doctorsNightDutyRoster-search-icon"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsNightDutyRoster;