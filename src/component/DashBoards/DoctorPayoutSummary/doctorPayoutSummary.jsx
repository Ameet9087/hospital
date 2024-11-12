 /* Ajhar Tamboli doctorPayoutSummary.jsx 29-10-24 */

import React, { useState, useRef } from 'react';
import "./doctorPayoutSummary.css"
import AddNewDoctorPayoutSummary from "../DoctorPayoutSummary/addNewDoctorPayoutSummary"
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
const labTests = [
  { payoutId: "", doctorId: "", amount: "", date: "",status:"", },
  // Add more rows as needed
];

const DoctorPayoutSummary = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewDoctorPayoutSummary = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="doctorPayoutSummary-container">
    <div className="doctorPayoutSummary-firstRow">
    <div className="doctorPayoutSummary-addBtn">
      <button className="doctorPayoutSummary-add-button" onClick={handleAddNewDoctorPayoutSummary}>+Add New Doctor Payout Summary</button>
      </div>
       
      </div>
      <div className="doctorPayoutSummary-controls">
          <div className="doctorPayoutSummary-date-range">
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
      <div className='doctorPayoutSummary-search-N-result'>
      <div className="doctorPayoutSummary-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="doctorPayoutSummary-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="doctorPayoutSummary-print-button"><i class="fa-solid fa-file-excel"></i> Export</button>
          <button className="doctorPayoutSummary-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
        </div>
        <div className="table-container">
      <table ref={tableRef}>
        <thead>
          <tr>{[
            "Payout Id",
            "Doctor Id",
            "Amount",
            "Date",
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
              <td>{test.payoutId}</td>
              <td>{test.doctorId}</td>
              <td>{test.amount}</td>
              <td>{test.date}</td>
              <td>{test.status}</td>
              {/* <td>{test.isActive ? 'True' : 'False'}</td> */}
              <td>
                <button className="doctorPayoutSummary-edit-button"onClick={handleAddNewDoctorPayoutSummary}>Edit</button>
                {/* <button className="doctorPayoutSummary-deactivate-button">Deactivate</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* <div className="doctorPayoutSummary-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="doctorPayoutSummary-modal">
          {/* <div className="doctorPayoutSummary-modal-content"> */}
          <CustomModal isOpen={setShowPopup} onClose={handleClosePopup}>

            <AddNewDoctorPayoutSummary  />
          </CustomModal>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default DoctorPayoutSummary;