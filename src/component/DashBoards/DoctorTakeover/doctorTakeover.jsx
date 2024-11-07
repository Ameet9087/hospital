 /* Ajhar Tamboli doctorTakeover.jsx 30-10-24 */

import React, { useState, useRef } from 'react';
import "./doctorTakeover.css"
import AddNewDoctorTakeover from './addNewDoctorTakeover';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
const labTests = [
  {Takeover:"", roomNo: "", uHId: "", iPNO: "",patientName:"",ageSex:"", doctorId:"",dOA:"",panel:"",diagnosis:"",illnessSeverity:"",anyMajorComplaint:"",revision:"",exitingDuty:"", status:"", },
  // Add more rows as needed
];

const DoctorTakeover = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewDoctorTakeover = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="doctorTakeover-container">
    <div className="doctorTakeover-firstRow">
    <div className="doctorTakeover-addBtn">
      <button className="doctorTakeover-add-button" onClick={handleAddNewDoctorTakeover}>+Add New Doctor Takeover</button>
      </div>
       
       
      </div>
      <div className="doctorTakeover-controls">
          <div className="doctorTakeover-date-range">
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
      <div className='doctorTakeover-search-N-result'>
      <div className="doctorTakeover-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="doctorTakeover-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="doctorTakeover-print-button"><i class="fa-solid fa-file-excel"></i> Export</button>
          <button className="doctorTakeover-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
        </div>
        <div className="table-container">
      <table ref={tableRef}>
        <thead>
          <tr>{[
            
            "Room No",
            "UHId",
            "IP NO",
            "Patient Name",
            "Age Sex",
            "Doctor",
            "DOA",
            "Panel",
            "Diagnosis",
            "Illness Severity",
            "Any Major Complaint/Information/Pending Investigation",
            "Takeover",
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
              <td>{test.Takeover}</td>
              <td>{test.status}</td>
              {/* <td>{test.isActive ? 'True' : 'False'}</td> */}
              <td>
                <button className="doctorTakeover-edit-button"onClick={handleAddNewDoctorTakeover}>Edit</button>
                {/* <button className="doctorTakeover-deactivate-button">Deactivate</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* <div className="doctorTakeover-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="doctorTakeover-modal">
          {/* <div className="doctorTakeover-modal-content"> */}
          <CustomModal isOpen={setShowPopup} onClose={handleClosePopup}>

            <AddNewDoctorTakeover  />
          </CustomModal>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default DoctorTakeover;