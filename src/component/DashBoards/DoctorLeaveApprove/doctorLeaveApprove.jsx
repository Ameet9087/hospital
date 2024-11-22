 /* Ajhar Tamboli doctorLeaveApprove.jsx 29-10-24 */

import React, { useState, useRef } from 'react';
import "./doctorLeaveApprove.css"
import AddNewDoctorLeaveApprove from "./addNewDoctorLeaveApprove"
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
const labTests = [
  { sN: "", mRNO: "", apptNo: "", apptDate: "",name:"",age:"",gender:"",mobileNo:"",mail:"", approvedBy:"",status:"", },
  // Add more rows as needed
];

const DoctorLeaveApprove = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewDoctorLeaveApprove = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="doctorLeaveApprove-container">
    <div className="doctorLeaveApprove-firstRow">
    <div className="doctorLeaveApprove-addBtn">
      {/* <button className="doctorLeaveApprove-add-button" onClick={handleAddNewDoctorLeaveApprove}>+Add New Doctor LeaveApprove</button> */}
      </div>
       
      </div>
      <div className="doctorLeaveApprove-controls">
          <div className="doctorLeaveApprove-date-range">
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
      <div className='doctorLeaveApprove-search-N-result'>
      <div className="doctorLeaveApprove-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="doctorLeaveApprove-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="doctorLeaveApprove-print-button"><i class="fa-solid fa-file-excel"></i> Export</button>
          <button className="doctorLeaveApprove-print-button"><i class="fa-solid fa-print"></i> Print</button>
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
            "Approved By",
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
              <td>{test.approvedBy}</td>
              <td>{test.status}</td>
              {/* <td>{test.isActive ? 'True' : 'False'}</td> */}
              <td>
                <button className="doctorLeaveApprove-edit-button"onClick={handleAddNewDoctorLeaveApprove}>Edit</button>
                {/* <button className="doctorLeaveApprove-deactivate-button">Deactivate</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* <div className="doctorLeaveApprove-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="doctorLeaveApprove-modal">
          {/* <div className="doctorLeaveApprove-modal-content"> */}
          <CustomModal isOpen={setShowPopup} onClose={handleClosePopup}>

            <AddNewDoctorLeaveApprove  />
          </CustomModal>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default DoctorLeaveApprove;