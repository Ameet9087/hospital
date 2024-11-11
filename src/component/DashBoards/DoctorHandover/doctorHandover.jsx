 /* Ajhar Tamboli doctorHandover.jsx 30-10-24 */

import React, { useState, useRef } from 'react';
import "./doctorHandover.css"
import AddNewDoctorHandover from "./addNewDoctorHandover"
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
const labTests = [
  {handover:"", roomNo: "", uHId: "", iPNO: "",patientName:"",ageSex:"", doctorId:"",dOA:"",panel:"",diagnosis:"",illnessSeverity:"",anyMajorComplaint:"",revision:"",exitingDuty:"", status:"", },
  // Add more rows as needed
];

const DoctorHandover = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewDoctorHandover = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="doctorHandover-container">
    <div className="doctorHandover-firstRow">
    <div className="doctorHandover-addBtn">
      <button className="doctorHandover-add-button" onClick={handleAddNewDoctorHandover}>+Add New Doctor Handover</button>
      </div>
       
       
      </div>
      <div className="doctorHandover-controls">
          <div className="doctorHandover-date-range">
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
      <div className='doctorHandover-search-N-result'>
      <div className="doctorHandover-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="doctorHandover-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="doctorHandover-print-button"><i class="fa-solid fa-file-excel"></i> Export</button>
          <button className="doctorHandover-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
        </div>
        <div className="table-container">
      <table ref={tableRef}>
        <thead>
          <tr>{[
            
            "Handover",
            "Room No",
            "UHId",
            "IP NO",
            "Patient Name",
            "Age Sex",
            "Doctor Id",
            "DOA",
            "Panel",
            "Diagnosis",
            "Illness Severity",
            "Any Major Complaint/Information/Pending Investigation",
            "Revision",
            "Exiting Duty ",
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
              <td>{test.handover}</td>
              <td>{test.roomNo}</td>
              <td>{test.uHId}</td>
              <td>{test.iPNO}</td>
              <td>{test.patientName}</td>
              <td>{test.ageSex}</td>
              <td>{test.doctorId}</td>
              <td>{test.dOA}</td>
              <td>{test.panel}</td>
              <td>{test.diagnosis}</td>
              <td>{test.illnessSeverity}</td>
              <td>{test.anyMajorComplaint}</td>
              <td>{test.revision}</td>
              <td>{test.exitingDuty}</td>
              <td>{test.status}</td>
              {/* <td>{test.isActive ? 'True' : 'False'}</td> */}
              <td>
                <button className="doctorHandover-edit-button"onClick={handleAddNewDoctorHandover}>Edit</button>
                {/* <button className="doctorHandover-deactivate-button">Deactivate</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* <div className="doctorHandover-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="doctorHandover-modal">
          {/* <div className="doctorHandover-modal-content"> */}
          <CustomModal isOpen={setShowPopup} onClose={handleClosePopup}>

            <AddNewDoctorHandover  />
          </CustomModal>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default DoctorHandover;