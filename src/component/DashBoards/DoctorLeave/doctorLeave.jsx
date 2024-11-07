 /* Ajhar Tamboli doctorLeave.jsx 29-10-24 */

import React, { useState, useRef } from 'react';
import "./doctorLeave.css"
import AddNewDoctorLeave from "./addNewDoctorLeave"
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
const labTests = [
  { sN: "", mRNO: "", apptNo: "", apptDate: "",name:"",age:"",gender:"",mobileNo:"",mail:"", status:"", },
  // Add more rows as needed
];

const DoctorLeave = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewDoctorLeave = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="doctorLeave-container">
    <div className="doctorLeave-firstRow">
    <div className="doctorLeave-addBtn">
      {/* <button className="doctorLeave-add-button" onClick={handleAddNewDoctorLeave}>+Add New Doctor Leave</button> */}
      </div>
       
      </div>
      <div className="doctorLeave-controls">
          <div className="doctorLeave-date-range">
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
      <div className='doctorLeave-search-N-result'>
      <div className="doctorLeave-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="doctorLeave-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="doctorLeave-print-button"><i class="fa-solid fa-file-excel"></i> Export</button>
          <button className="doctorLeave-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
        </div>
        <div className="table-container">
      <table ref={tableRef}>
        <thead>
          <tr>{[
            "SN",
            "MRNO",
            "Appt No",
            "Appt Date",
            "Name",
            "Age",
            "Gender",
            "Mobile No",
            "Mail",
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
              <td>{test.sN}</td>
              <td>{test.mRNO}</td>
              <td>{test.apptNo}</td>
              <td>{test.apptDate}</td>
              <td>{test.name}</td>
              <td>{test.age}</td>
              <td>{test.gender}</td>
              <td>{test.mobileNo}</td>
              <td>{test.mail}</td>
              <td>{test.status}</td>
              {/* <td>{test.isActive ? 'True' : 'False'}</td> */}
              <td>
                <button className="doctorLeave-edit-button"onClick={handleAddNewDoctorLeave}>Edit</button>
                {/* <button className="doctorLeave-deactivate-button">Deactivate</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* <div className="doctorLeave-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="doctorLeave-modal">
          {/* <div className="doctorLeave-modal-content"> */}
          <CustomModal isOpen={setShowPopup} onClose={handleClosePopup}>

            <AddNewDoctorLeave  />
          </CustomModal>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default DoctorLeave;