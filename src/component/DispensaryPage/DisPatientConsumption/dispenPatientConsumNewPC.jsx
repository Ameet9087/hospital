import React from 'react';
import '../DisPatientConsumption/dispenPatientConsumNewPC.css';

function DispenPatientConsumNewPC() {
  return (
    <div className="dispenPatientConsumNewPC-entry">
      <h4><i className="fa-solid fa-cart-shopping"></i> New Consumption Entry</h4>
      <div className="dispenPatientConsumNewPC-search-section">
        <label>
          Search Patient: <span className="dispenPatientConsumNewPC-required">*</span>
          <input type="text" placeholder="Search Patient (Minimum 5 Character)" />
        </label>
        <label>
          Prescriber:
          <input type="text" placeholder="Enter Name" />
        </label>
      </div>
      <div className="dispenPatientConsumNewPC-patient-info">
        <span>Hospital No:</span> <span>Patient Name:</span> <span>Age/Sex:</span> <span>Contact No:</span> <span>Visit Type:</span>
      </div>
      <div className="dispenPatientConsumNewPC-medication-entry">
        <div className="dispenPatientConsumNewPC-medication-inputs">
          <input type="text" placeholder="Generic Name" />
          <select>
            <option value="">--Select Medicine--</option>
          </select>
          <input type="text" placeholder="0" readOnly />
          <input type="text" placeholder="0" readOnly />
          <input type="text" placeholder="0" readOnly />
          <input type="text" placeholder="0" readOnly />
          <input type="text" placeholder="0" readOnly />
        </div>
        <div className="dispenPatientConsumNewPC-summary-info">
          <label>SubTotal Amount: <input type="text" value="0" readOnly /></label>
          <label>Discount Amount: <input type="text" value="0" readOnly /></label>
          <label>Total Amount: <input type="text" value="0" readOnly /></label>
          <div>In Words:</div>
        </div>
      </div>
      <div className="dispenPatientConsumNewPC-remarks-section">
        <label>Remarks:</label>
        <textarea placeholder="Remarks"></textarea>
      </div>
      <div className="dispenPatientConsumNewPC-action-buttons">
        <button className="dispenPatientConsumNewPC-save-button">Save Consumption</button>
        <button className="dispenPatientConsumNewPC-discard-button">Discard Changes</button>
      </div>
    </div>
  );
}

export default DispenPatientConsumNewPC;
