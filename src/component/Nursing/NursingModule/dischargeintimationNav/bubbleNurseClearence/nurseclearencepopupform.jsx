import React, { useState } from 'react';
import './nurseClearanceFormPopUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const NurseClearanceFormPopUp = ({ patientId, onClose }) => {
    console.log(patientId);
    

    const [formData, setFormData] = useState({
      indentNumber: 1245789865,
      severity: "High",
      zeroStock: "No",
      remarks: "Urgent requirement due to surgery",
      ipadmissionDTO: {
          ipAdmmissionId: patientId?.ipAdmmissionId || 0
      },
      surgeryDTO: {
          surgeryId: 4
      },
      departmentNursingDTO: {
          deptNursingId: 4
      },
      templateNursingDTO: {
          templateId: 4
      },
      medicineNursingDTOList: [
          {
              medicineId: 4
          }
      ]
  });
  const [selectedValues, setSelectedValues] = useState({
    medicineReturnedPharmacy: false,
    dischargeMedicinesIndented: false,
    roomInventoryChecked: false,
    idBandRemoved: false,
    centrelineCannulaRemoved: false,
    folleysCatheterRemoved: false,
    anyDrainRemoved: false,
    dressingDone: false,
    patientEducationGiven: false,
});

const handleInputChange = (e, fieldName) => {
  const value = e.target.checked;
  setSelectedValues(prevState => ({
      ...prevState,
      [fieldName]: value,
  }));
};

const handleSubmit = async () => {
  try {
      // Make an API call with selected values
      const response = await axios.post('http://192.168.0.124:8080/api/nurse-clearances', selectedValues);
      console.log('API response:', response.data);
  } catch (error) {
      console.error('Error sending data to API:', error);
  }
};


  return (
    <div className="nurseClearanceFormPopUp">
      <div className="nurseClearance-Form">
      <div className="nurseClearanceForm-title-bar">
        <div className="nurseClearanceForm-header">
          <span>Nurse Clearance Form</span>
          </div>
          <div className="nurseClearanceForm-action-buttons">
          
            </div>
            <div className="nurseClearanceForm-action-buttons">
            <button className="btn-gray" onClick={onClose}>
              Close
            </button>
            </div>
      </div>
      <div className="nurseClearanceForm-content-wrapper">
        <div className="nurseClearanceForm-main-section">
          <div className="nurseClearanceForm-panel operation-details">
            <div className="nurseClearanceForm-panel-header">Operation Details</div>
            <div className="nurseClearanceForm-panel-content">
              <div className="nurseClearanceForm-form-row">
                <label>UHID: *</label>
                <div className="nurseClearanceForm-input-with-search">
                  <input type="text" value={patientId.patient.uhid} />
                  {/* <button className="nurseClearanceForm-magnifier-btn">🔍</button> */}
                </div>
              </div>
              <div className="nurseClearanceForm-form-row">
                <label>IPNO:</label>
                <input type="text" value={patientId.ipAdmmissionId} />
              </div>
              <div className="nurseClearanceForm-form-row">
                <label>Patient Name:</label>
                <input type="text" value={patientId.patient.firstName} />
              </div>
              <div className="nurseClearanceForm-form-row">
                <label>Age:</label>
                <input type="text" value={patientId.patient.age}  />
              </div>
              <div className="nurseClearanceForm-form-row">
                <label>Sex:</label>
                <input type="text" value={patientId.patient.gender}  />
              </div>
              <div className="nurseClearanceForm-form-row">
                <label>Relative Name:</label>
                <input type="text"  />
              </div>
              <div className="nurseClearanceForm-form-row">
                <label>Address:</label>
                <textarea name="" id="" value={patientId.patient.address}></textarea>
              </div>
              <div className="nurseClearanceForm-form-row">
            {/* <input type="checkbox" id="allowMultiple"  onChange={handleInputChange} /> */}
            <input
        type="checkbox"
        id="allowMultiple1"
        checked={selectedValues.medicineReturnedPharmacy}
        onChange={(e) => handleInputChange(e, 'medicineReturnedPharmacy')}
    />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Medicines Returned Pharmacy
              </label>
            </div>
              <div className="nurseClearanceForm-form-row">
              <input
        type="checkbox"
        id="allowMultiple2"
        checked={selectedValues.dischargeMedicinesIndented}
        onChange={(e) => handleInputChange(e, 'dischargeMedicinesIndented')}
    />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Discharge Medicines Indented
              </label>
            </div>
              <div className="nurseClearanceForm-form-row">
              <input
        type="checkbox"
        id="allowMultiple3"
        checked={selectedValues.roomInventoryChecked}
        onChange={(e) => handleInputChange(e, 'roomInventoryChecked')}
    />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Room Inventory Checked
              </label>
            </div>
              <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple"  onChange={(e) =>handleInputChange(e, 'idBandRemoved')} />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              ID Band Removed
              </label>
            </div>
              <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple"   onChange={(e)=>handleInputChange(e,'centrelineCannulaRemoved')}/>
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Centreline- Cannula Remove
              </label>
            </div>
              <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple"  onChange={(e)=>handleInputChange(e,'folleysCatheterRemoved')} />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Folleys Catheter Removed
              </label>
            </div>
              <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple"  onChange={(e)=>handleInputChange(e,'anyDrainRemoved')} />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Any Drain Removed
              </label>
            </div>
              <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple"   onChange={(e)=>handleInputChange(e,'dressingDone')}/>
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Dressing Done
              </label>
            </div>
              <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple"   onChange={(e)=>handleInputChange(e,'patientEducationGiven')}/>
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Patient Education Given
              </label>
            </div>
            </div>
          </div>
          <div className="nurseClearanceForm-panel operation-details">
              <div className="nurseClearanceForm-panel-header">Accompanied</div> 
            <div className="nurseClearanceForm-panel-content">
            <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple" />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              parents
              </label>
            </div>
            <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple" />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Relative
              </label>
            </div>
            <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple" />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Friend
              </label>
            </div>
            <div className="nurseClearanceForm-form-row">
            <input type="checkbox" id="allowMultiple" />
              <label htmlFor="allowMultiple" className="nurseClearanceForm-checkbox-label">
              Other specify
              </label>
            </div>
            <div className="nurseClearanceForm-form-row">
            <label>Name:</label>
              <input type="text"  />
            </div>
            <div className="nurseClearanceForm-form-row">
            <label>Contact No:</label>
              <input type="text" value="4" />
            </div>
              <div className="nurseClearanceForm-form-row">
              <label>Declared dead:</label>
              <select >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
            </div>
          <div className="nurseClearanceForm-panel operation-details">
              <div className="nurseClearanceForm-panel-header">Accompanied</div> 
            <div className="nurseClearanceForm-panel-content">
           </div>
            </div>
 <div className="nurseClearanceForm-panel dis-templates">
            <div className="nurseClearanceForm-panel-header">Final Discharge</div>
            <div className="nurseClearanceForm-panel-content">
            <div className="nurseClearanceForm-form-row">
                <label>Discharge Tracking Entered:</label>
                <select>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="nurseClearanceForm-form-row">
                <label>Discharged to:</label>
                <input type="text" value="" />
              </div>
              <div className="nurseClearanceForm-form-row">
                  <input type="checkbox" id="excludeRef" />
                  <label htmlFor="excludeRef">Home</label>
              </div>
              <div className="nurseClearanceForm-form-row">
                  <input type="checkbox" id="excludeRef" />
                  <label htmlFor="excludeRef">others</label>
              </div>
              <div className="nurseClearanceForm-form-row">
                <label>specify:</label>
                <input type="text" value="" />
              </div>
              <div className="nurseClearanceForm-form-row">
                <label>Bills Settles:</label>
                <select>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              
              <div className="nurseClearanceForm-form-row">
                <label>Remarks:</label>
<textarea name="" id=""></textarea>   
           </div>
           <div className="nurseClearanceForm-action-buttons">
          <button className="btn-blue" onClick={handleSubmit}>Update</button>
          
        </div>
            </div>
          </div>
        </div>
          
      </div>
     
      </div>
      
    </div>
  );
};

export default NurseClearanceFormPopUp;
