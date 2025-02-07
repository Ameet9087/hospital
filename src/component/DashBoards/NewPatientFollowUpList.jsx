import React, { useRef, useState } from "react";
import "./NewPatientFollowUpList.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";

const NewPatientFollowUpList = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  return (
    <div className="New-Patient-table-container">
      <div className="">
        {/* <input type="text" className="New-Patient-search-input" placeholder="Search" /> */}
        {/* <button className="New-Patient-print-button">Print</button> */}
      </div>
      <table className="patientList-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Hospital ...",
              "Name",
              "Age/Sex",
              "VisitType",
              "Visit Date",
              "Performer Na...",
              "Actions",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="New-Patient-header-content">
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
            <td colSpan="7" className="no-rows">
              No Rows To Show
            </td>
          </tr>
        </tbody>
      </table>
      {/* <div className="pagination-container">
                <span>0 to 0 of 0</span>
                <div className="pagination-buttons">
                    <button disabled>First</button>
                    <button disabled>Previous</button>
                    <span>Page 0 of 0</span>
                    <button disabled>Next</button>
                    <button disabled>Last</button>
                </div>
            </div> */}
    </div>
  );
};

export default NewPatientFollowUpList;
