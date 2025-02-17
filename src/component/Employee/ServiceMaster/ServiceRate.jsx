import React, { useEffect, useRef, useState } from "react";
import "./ServiceRate.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { FloatingInput } from "../../../FloatingInputs";

function ServiceRate({ rates, onRateChange }) {
  console.log(rates);

  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});

  return (
    <div className="ServiceRate-container">
      <h2>Service Rates</h2>
      <div className="service-rate-com-table">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Pay Type",
                "Rate",
                "Doctor Share (%)",
                "Doctor Share Amount",
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
            {rates.map((payType, index) => (
              <tr key={payType.payTypeid || index}>
                <td>{index + 1}</td>
                <td>{payType.payType}</td>
                <td>
                  <FloatingInput
                  type="number"
                  value={payType.rate || ""}
                  onChange={(e) =>
                    onRateChange(index, "rate", parseFloat(e.target.value))
                  }
                  min={'0'}/>
                  
                </td>
                <td>
                  <FloatingInput
                  type="number"
                  value={payType.doctorSharePercentage || ""}
                  onChange={(e) =>
                    onRateChange(
                      index,
                      "doctorSharePercentage",
                      parseFloat(e.target.value)
                    )
                  }
                  min={'0'}
                  />
                  
                </td>
                <td>
                  <FloatingInput
                  type="number"
                  value={payType.doctorShareAmount || ""}
                  onChange={(e) =>
                    onRateChange(
                      index,
                      "doctorShareAmount",
                      parseFloat(e.target.value)
                    )
                  }
                  min={'0'}
                  />
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceRate;
