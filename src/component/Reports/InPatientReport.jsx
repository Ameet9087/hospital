import React,{useState,useRef} from 'react';
import './InPatientReport.css';
// import { startResizing } from "../../../TableHeadingResizing/resizableColumns";

import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
// D:\157 Career\HIMSFrontEndFiles\hospitalsystem\src\component\TableHeadingResizing\resizableColumns.js
const InpatientCensus = () => {

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);


  return (
    <div className="inpatient-census-report-range-container">
        <h3 className="user-collection-report-title">⚛ Inpatient Census Report</h3>

      <div className="inpatient-census-report-range-date-range-container">
        <label>From: </label>
        <input type="date" defaultValue="2024-09-01" />
        <label>To: </label>
        <input type="date" defaultValue="2024-09-01" />
        <button className="inpatient-census-report-range-show-report-button">Show Report</button>
      </div>

      <div className="inpatient-census-report-range-totals-container">
  <div className="inpatient-census-report-range-totals">
    Total Admitted: 0  Total Discharged: 0
  </div>
</div>


      <div className="inpatient-census-report-range-census-header">
        <h3>Inpatient Census (All Wards) for the selected dates</h3>
      </div>


      <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Ward Name",
                "In Bed",
                "New Admission",
                "Trans IN",
                "Trans OUT",
                "Discharged",
                "Total Pt.",
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
            <td>Brain Ward</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Female Ward</td>
            <td>3</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>3</td>
          </tr>
          <tr>
            <td>ICU</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Male Ward</td>
            <td>4</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Maternity Ward</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Private Ward</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
          </tr>
          <tr className="inpatient-census-report-range-totals-row">
            <td>All Wards</td>
            <td>10</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InpatientCensus;
