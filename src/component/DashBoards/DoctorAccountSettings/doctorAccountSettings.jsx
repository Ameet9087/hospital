 /* Ajhar Tamboli doctorAccountSettings.jsx 29-10-24 */

import React, { useState, useRef } from 'react';
import "./doctorAccountSettings.css"
import AddNewDoctorAccountSettings from "./addNewDoctorAccountSettings"
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
const labTests = [
  {doctorId: "", allowEdit: "", allowDelete: "", lockedBy:"",lockedDate:"", status:"", },
  // Add more rows as needed
];

const DoctorAccountSettings = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewDoctorAccountSettings = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="doctorAccountSettings-container">
    <div className="doctorAccountSettings-firstRow">
    <div className="doctorAccountSettings-addBtn">
      <button className="doctorAccountSettings-add-button" onClick={handleAddNewDoctorAccountSettings}>+Add New Doctor Account Settings</button>
      </div>
       
       
      </div>
      <div className="doctorAccountSettings-controls">
          <div className="doctorAccountSettings-date-range">
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
      <div className='doctorAccountSettings-search-N-result'>
      <div className="doctorAccountSettings-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="doctorAccountSettings-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="doctorAccountSettings-print-button"><i class="fa-solid fa-file-excel"></i> Export</button>
          <button className="doctorAccountSettings-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
        </div>
        <div className="table-container">
      <table ref={tableRef}>
        <thead>
          <tr>{[
            
            "Doctor Id",
            "Allow Edit",
            "Allow Delete",
            "Locked By",
            "Locked Date",
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
              <td>{test.doctorId}</td>
              <td>{test.allowEdit}</td>
              <td>{test.allowDelete}</td>
              <td>{test.lockedBy}</td>
              <td>{test.lockedDate}</td>
              <td>{test.status}</td>
              {/* <td>{test.isActive ? 'True' : 'False'}</td> */}
              <td>
                <button className="doctorAccountSettings-edit-button"onClick={handleAddNewDoctorAccountSettings}>Edit</button>
                {/* <button className="doctorAccountSettings-deactivate-button">Deactivate</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* <div className="doctorAccountSettings-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="doctorAccountSettings-modal">
          {/* <div className="doctorAccountSettings-modal-content"> */}
          <CustomModal isOpen={setShowPopup} onClose={handleClosePopup}>

            <AddNewDoctorAccountSettings  />
          </CustomModal>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default DoctorAccountSettings;