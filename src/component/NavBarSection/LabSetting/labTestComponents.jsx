// import React from 'react';
// import "../LabSetting/labTestComponents.css"
// const labTests = [
//   { componentName: "2 hr PP Blood Sugar", displayName: "2 hr PP Blood Sugar", unit: "mg/dl", range: "70-140", controlType: "TextBox", valueType: "number" },
//   { componentName: "ALKALINE PHOSPHATASE", displayName: "ALKALINE PHOSPHATASE", unit: "IU/L", range: "30-260", controlType: "TextBox", valueType: "number" },
//   // Add more rows as needed
// ];

// const LabTestComponent = () => {
//   return (
//     <div className="lab-test-container">
//       <button className="add-button">+Add New Lab Test Component</button>
//       <input type="text" className="search-box" placeholder="Search" />
//       <table className="lab-test-table">
//         <thead>
//           <tr>
//             <th>ComponentName</th>
//             <th>Display Name</th>
//             <th>Unit</th>
//             <th>Range</th>
//             <th>Range Description</th>
//             <th>Method</th>
//             <th>ControlType</th>
//             <th>ValueType</th>
//             <th>Value Lookup</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {labTests.map((test, index) => (
//             <tr key={index}>
//               <td>{test.componentName}</td>
//               <td>{test.displayName}</td>
//               <td>{test.unit}</td>
//               <td>{test.range}</td>
//               <td></td>
//               <td></td>
//               <td>{test.controlType}</td>
//               <td>{test.valueType}</td>
//               <td></td>
//               <td><button className="edit-button">Edit</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="results-info">Showing 74 / 74 results</div>
//       <button className="print-button">Print</button>
//     </div>
//   );
// };

// export default LabTestComponent;

import React, { useState, useRef, useEffect } from "react";
import "../LabSetting/labTestComponents.css";
import LSLabTestAddNLTest from "./lSLabTestAddNLTest";
import LabTestComponentsAddNewLTC from "./labTestComponentsAddNewLTC";

import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";

const LabTestComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labComponentData, setLabComponentData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1415/api/lab-components/getAllComponents`).then(
      (res) =>
        res
          .json()
          .then((res) => setLabComponentData(res))
          .catch((err) => {
            console.log(err);
          })
    );
  }, [showPopup]);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="labTestComponents-container">
      <div className="labTestComponents-firstRow">
        <div className="labTestComponents-addBtn">
          <button
            className="labTestComponents-add-button"
            onClick={handleAddNewLabTestClick}
          >
            +Add New Lab Test Component
          </button>
        </div>
      </div>
      <div className="labTestComponents-controls">
          <div className="labTestComponents-date-range">
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
      <div className="labTestComponents-search-N-result">
        <div className="labTestComponents-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="labTestComponents-results-info">
          <span>
            Showing {labComponentData?.length} / {labComponentData?.length}{" "}
            results
          </span>
          <button className="labTestComponents-print-button">
          <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="labTestComponents-print-button">
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container" id="table-to-print">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Component Name",
                "Display Name",
                "Unit",
                "Range",
                "Range Description",
                "Method",
                "Control Type",
                "Value Type",
                "Value Lookup",
                // "Action",
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
            {labComponentData != null &&
              labComponentData.map((test, index) => (
                <tr key={index}>
                  <td>{test?.componentName}</td>
                  <td>{test?.displayName}</td>
                  <td>{test?.unit}</td>
                  <td>{test?.componentRange}</td>
                  <td>{test?.rangeDescription}</td>
                  <td>{test?.method}</td>
                  <td>{test?.controlType}</td>
                  <td>{test?.valueType}</td>
                  <td>{test?.valueLookup?.lookupName}</td>
                  {/* <td>
                  <button
                    className="labTestComponents-edit-button"
                    onClick={handleAddNewLabTestClick}
                  >
                    Edit
                  </button>
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <div className="labTestComponents-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="labTestComponents-modal">
          <div className="labTestComponents-modal-content">
            <LabTestComponentsAddNewLTC onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LabTestComponent;
