import React, { useState, useEffect, useRef } from "react";
import "./OPDPostDiscountTable.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import OPDPostDiscount from "./OPDPostDiscount";
const OPDPostDiscountTable = () => {
     const [columnWidths, setColumnWidths] = useState({});
      const tableRef = useRef(null);
      const [showModal, setShowModal] = useState(false); // State for modal visibility
  return (
    <div className="OPDPostDiscountTable-container">
      <button className="OPDPostDiscountTable-export"  onClick={() => setShowModal(true)}>OPD Post Discount</button>
      <div className="OPDPostDiscountTable-header">
       <div className="OPDPostDiscountTable-com">
       <input type="text" placeholder="search" className="OPDPostDiscountTable-com-search" />
       </div>
      <div className="OPDPostDiscountTable-res">
      <p className="OPDPostDiscountTable-results-info">Showing 3/3 </p>

      <button className="OPDPostDiscountTable-export">Export</button>
        <button className="OPDPostDiscountTable-export">Print</button>
      </div>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "Bill No",
              "Uhid",
              "Patient Name",
              "Mobile Number",
              "Email",
              "Age",
              "Total Amount",
              "Action",
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="OPDPostDiscountTable-export">Edit</button>
              <button className="OPDPostDiscountTable-export">
                Deactivate
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <CustomModal isOpen={showModal} onClose={()=>setShowModal(false)}>
        <OPDPostDiscount/>

      </CustomModal>
    </div>
  );
};

export default OPDPostDiscountTable;
