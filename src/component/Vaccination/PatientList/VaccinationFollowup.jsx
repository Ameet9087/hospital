import React from "react";
import "./VaccinationFollowup.css";

const VaccinationFollowup = ({ patient, onClose, onSave }) => {
  return (
    <div className="vaccination-followup-overlay">
      <div className="vaccination-followup-modal">
        <button className="vaccination-followup-close-button" onClick={onClose}>
          X
        </button>
        <h2>Vaccination FOLLOWUP</h2>

        <div className="vaccination-followup-patient-info">
          <table className="vaccination-followup-table">
            <tbody>
              <tr>
                {/* <td>Hospital No: {patient?.hospitalNo}</td> */}
                <td>Patient Name: {patient?.babyName}</td>
                <td>
                  Age Sex: {patient?.age} {patient?.ageUnit} {" / "}
                  {patient?.gender}
                </td>
                <td></td>
                {/* <td>Vacc. Reg No: {patient?.vaccRegNo}</td> */}
              </tr>
              <tr>
                <td>Mother Name: {patient?.motherName}</td>
                <td>Department: {patient?.department || " IMMUNIZATION"}</td>
                <td colSpan="2">
                  Last Visit Date: {patient?.lastVisDate}
                  <br />
                  <span className="vaccination-followup-before-days">
                    (Before {patient?.daysPassed} Days)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="vaccination-followup-action">
          <p className="">Followup Date : {new Date().toLocaleString()}</p>
          <button className="vaccination-followup-save-button" onClick={onSave}>
            Save Followup
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaccinationFollowup;
