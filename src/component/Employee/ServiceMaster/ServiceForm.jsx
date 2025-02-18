import React, { useState, useRef } from "react";
import ServiceMaster from "./ServiceMaster";
import './ServiceForm.css'
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
const ServiceForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labTest, setLabTest] = useState(null);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="service-ms-form-container">
      <div className="service-ms-form-addBtn">
        <button
          className="service-ms-form-add-button"
          onClick={openPopup}
        >
          + Add New 
        </button>
      </div>

      <div className="service-ms-form-search-N-result">
        <div className="service-ms-form-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="service-ms-form-results-info">
          <span>
            Showing {labTest?.length || 0} / {labTest?.length || 0} results
          </span>
          <button className="service-ms-form-print-button">
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="service-ms-form-print-button">
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["SN","Service Type", "Service Code","Service Type Name"].map((header, index) => (
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
            {labTest &&
              labTest.map((test, index) => (
                <tr key={index}>
                  <td>{test?.sn}</td>
                  <td>{test?.serviceType}</td>
                  <td>{test?.serviceCode}</td>
                  <td>{test?.serviceTypeName}</td>

                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <ServiceMaster onClose={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default ServiceForm;
