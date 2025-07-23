// import React, { useState, useRef } from 'react';
// import './ServiceRate.css';
// import { startResizing } from '../TableHeadingResizing/resizableColumns';
// function OperationOrProcedureRate() {
//   const [rows, setRows] = useState([
//     { sn: 1,},
//   ]);
//   const [columnWidths, setColumnWidths] = useState({});
//   const tableRef = useRef(null);
//     const addRow = () => {
//         const newRow = {
//           sn: rows.length + 1,
//           code: '',
//           description: '',
//           percentage: '',
//           deRef: ''
//         };
//         setRows([...rows, newRow]);
//       };
//   const deleteRow = (index) => {
//     const updatedRows = rows.filter((_, i) => i !== index);
//     setRows(updatedRows);
//   };
//   return (
//     <div className="ServiceRate-container">
//       <h2>Operation or Procedure Rate</h2>
//       <table ref={tableRef}>
//         <thead>
//           <tr>
//             {[
//               'SN',
//               'Description',
//               'Percentage (%)',
//               'De Ref',
//               'Actions'
//             ].map((header, index) => (
//               <th
//                 key={index}
//                 style={{ width: columnWidths[index] || 'auto' }}
//                 className="resizable-th"
//               >
//                 <div className="header-content">
//                   <span>{header}</span>
//                   <div
//                     className="resizer"
//                     onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
//                   ></div>
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               <td>{row.sn}</td>
//               <td>{row.description}</td>
//               <td>{row.percentage}</td>
//               <td>{row.deRef}</td>
//               <td>
//                 <button onClick={() => deleteRow(index)}>Del</button>
//                 <button onClick={addRow}>Add</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// export default OperationOrProcedureRate;
import React, { useState, useRef } from "react";
import "./ServiceRate.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { FloatingInput } from "../../../FloatingInputs";

function OperationOrProcedureRate({ rates, onRateChange }) {
  const [rows, setRows] = useState([
    { sn: 1, description: "", percentage: "", drRef: "" },
  ]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const addRow = () => {
    const newRow = {
      sn: rows.length + 1,
      description: "",
      percentage: "",
      drRef: "",
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((_, i) => i !== index);
      const reindexedRows = updatedRows.map((row, i) => ({
        ...row,
        sn: i + 1,
      }));
      setRows(reindexedRows);
    }
  };

  const updateRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    // Update rates in parent component
    onRateChange(index, field, value);
  };

  return (
    <div className="ServiceRate-container">
      <h2>Operation or Procedure Rate</h2>
      <table ref={tableRef}>
        <thead>
          <tr>
            {["SN", "Description", "Percentage (%)", "Dr Ref", "Actions"].map(
              (header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] || "auto" }}
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
              )
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.sn}</td>
              <td>
                <FloatingInput
                type="text"
                value={row.description}
                onChange={(e) =>
                  updateRow(index, "description", e.target.value)
                }
                />
                
              </td>
              <td>
                <FloatingInput
                type="number"
                value={row.percentage}
                onChange={(e) =>
                  updateRow(index, "percentage", e.target.value)
                }
                min={'0'}/>

              </td>
              <td>
                <FloatingInput
                type="text"
                value={row.drRef}
                onChange={(e) => updateRow(index, "drRef", e.target.value)}
               
                />
                
              </td>
              <td>
                <div className="button-container">
                  <button
                    onClick={() => deleteRow(index)}
                    className="service-rate-del-button"
                  >
                    Del
                  </button>
                  <button className="service-rate-add-button" onClick={addRow}>
                    Add
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OperationOrProcedureRate;
