 /* Ajhar Tamboli doctorPaymentQuery.jsx 30-10-24 */

import React, { useState, useRef } from 'react';
import "./doctorPaymentQuery.css"
import AddNewDoctorPaymentQuery from "./addNewDoctorPaymentQuery"
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
const labTests = [
  {queryId:"", doctorId: "", billReference: "", queryDetails: "", status:"", },
  // Add more rows as needed
];

const DoctorPaymentQuery = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewDoctorPaymentQuery = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="doctorPaymentQuery-container">
    <div className="doctorPaymentQuery-firstRow">
    <div className="doctorPaymentQuery-addBtn">
      <button className="doctorPaymentQuery-add-button" onClick={handleAddNewDoctorPaymentQuery}>+Add New Doctor Paymen tQuery</button>
      </div>
       
       
      </div>
      <div className="doctorPaymentQuery-controls">
          <div className="doctorPaymentQuery-date-range">
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
      <div className='doctorPaymentQuery-search-N-result'>
      <div className="doctorPaymentQuery-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="doctorPaymentQuery-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="doctorPaymentQuery-print-button"><i class="fa-solid fa-file-excel"></i> Export</button>
          <button className="doctorPaymentQuery-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
        </div>
        <div className="table-container">
      <table ref={tableRef}>
        <thead>
          <tr>{[
            
            "Query Id",
            "Doctor Id",
            "Bill Reference",
            "Query Details",
            "Status",
            "Actions",
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
          {labTests.map((test, index) => (
            <tr key={index}>
              <td>{test.queryId}</td>
              <td>{test.doctorId}</td>
              <td>{test.billReference}</td>
              <td>{test.queryDetails}</td>
              <td>{test.status}</td>
              {/* <td>{test.isActive ? 'True' : 'False'}</td> */}
              <td>
                <button className="doctorPaymentQuery-edit-button"onClick={handleAddNewDoctorPaymentQuery}>Edit</button>
                {/* <button className="doctorPaymentQuery-deactivate-button">Deactivate</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* <div className="doctorPaymentQuery-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="doctorPaymentQuery-modal">
          {/* <div className="doctorPaymentQuery-modal-content"> */}
          <CustomModal isOpen={setShowPopup} onClose={handleClosePopup}>

            <AddNewDoctorPaymentQuery  />
          </CustomModal>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default DoctorPaymentQuery;