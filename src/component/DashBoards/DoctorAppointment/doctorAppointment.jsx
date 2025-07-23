/* Ajhar Tamboli doctorAppointment.jsx 29-10-24 */

import React, { useState, useRef } from "react";
import "./doctorAppointment.css";
import AddNewDoctorAppointment from "./addNewDoctorAppointment";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
const labTests = [
  {
    appointmentId: "",
    doctorId: "",
    patientId: "",
    patientName: "",
    appointmentGivenDate: "",
    status: "",
  },
  // Add more rows as needed
];

const DoctorAppointment = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewDoctorAppointment = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="doctorAppointment-container">
      <div className="doctorAppointment-firstRow">
        <div className="doctorAppointment-addBtn">
          <button
            className="doctorAppointment-add-button"
            onClick={handleAddNewDoctorAppointment}
          >
            +Add New Doctor Appointment
          </button>
        </div>
      </div>
      <div className="doctorAppointment-controls">
        <div className="doctorAppointment-date-range">
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
      <div className="doctorAppointment-search-N-result">
        <div className="doctorAppointment-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="doctorAppointment-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="doctorAppointment-print-button">
            <i class="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="doctorAppointment-print-button">
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Appointment Id",
                "Doctor Id",
                "Patient Id",
                "Patient Name",
                "Appointment Given Date",
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
                <td>{test.appointmentId}</td>
                <td>{test.doctorId}</td>
                <td>{test.patientId}</td>
                <td>{test.patientName}</td>
                <td>{test.appointmentGivenDate}</td>
                <td>{test.status}</td>
                {/* <td>{test.isActive ? 'True' : 'False'}</td> */}
                <td>
                  <button
                    className="doctorAppointment-edit-button"
                    onClick={handleAddNewDoctorAppointment}
                  >
                    Edit
                  </button>
                  {/* <button className="doctorAppointment-deactivate-button">Deactivate</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="doctorAppointment-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="doctorAppointment-modal">
          {/* <div className="doctorAppointment-modal-content"> */}
          <CustomModal isOpen={setShowPopup} onClose={handleClosePopup}>
            <AddNewDoctorAppointment />
          </CustomModal>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
