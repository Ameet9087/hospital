/* Ajhar Tamboli addPatientCounseling.jsx 08-10-24 */

import React, { useState } from 'react';
import './addPatientCounseling.css';

const AddPatientCounseling = ({ onClose, onSubmit }) => {
  const [counselingId, setCounselingId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [councelorName, setcouncelorName] = useState('');
  const [sessionDate, setsessionDate] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [followUpDate, setfollowUpDate] = useState('');
  const [typeOfCounselling, settypeOfCounselling] = useState('');

  const handleAdd = () => {
    const formData = {
      counselingId,
      patientId,
      councelorName,
      sessionDate,
      sessionNotes,
      followUpDate,
      typeOfCounselling,
    };
    onSubmit(formData); // Pass the form data to the parent component
    clearForm(); // Clear form after submission
  };

  const clearForm = () => {
    setCounselingId('');
    setPatientId('');
    setcouncelorName('');
    setsessionDate('');
    setSessionNotes('');
    setfollowUpDate('');
    settypeOfCounselling('');
  };

  return (
    <div className="addPatientCounseling-container">
      <div className="addPatientCounseling-header">
        <h3>Add New Patient Counseling</h3>
        <button className="addPatientCounseling-close-btn" onClick={onClose}>x</button>
      </div>

      <div className="addPatientCounseling-form">
        <div className="addPatientCounseling-form-row">
          <div className="addPatientCounseling-form-group-1row">
            <div className="addPatientCounseling-form-group">
              <label>Counseling ID<span>*</span></label>
              <input 
                type="text" 
                placeholder="Enter Counseling ID" 
                value={counselingId}
                onChange={(e) => setCounselingId(e.target.value)} 
              />
            </div>
            <div className="addPatientCounseling-form-group">
              <label>Patient ID<span>*</span></label>
              <input 
                type="text" 
                placeholder="Enter Patient ID" 
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)} 
              />
            </div>
          </div>

          <div className="addPatientCounseling-form-group-1row">
            <div className="addPatientCounseling-form-group">
              <label>Counselor Name </label>
              <input 
                type="text" 
                placeholder="Enter Counselor Name" 
                value={councelorName}
                onChange={(e) => setcouncelorName(e.target.value)} 
              />
            </div>
            <div className="addPatientCounseling-form-group">
              <label>Session Date<span>*</span></label>
              <input 
                type="date" 
                placeholder='Enter Session Date' 
                value={sessionDate}
                onChange={(e) => setsessionDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="addPatientCounseling-form-group-1row">
            <div className="addPatientCounseling-form-group">
              <label>Session Notes</label>
              <input 
                type="text" 
                placeholder="Enter Session Notes" 
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)} 
              />
            </div>
            <div className="addPatientCounseling-form-group">
              <label>Follow-up Date<span>*</span></label>
              <input 
                type="date" 
                placeholder='Follow-up Date' 
                value={followUpDate}
                onChange={(e) => setfollowUpDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="addPatientCounseling-form-group-1row">
            <div className="addPatientCounseling-form-group">
              <label>Type of Counseling</label>
              <input 
                type="text" 
                placeholder="Enter Type of Counseling" 
                value={typeOfCounselling}
                onChange={(e) => settypeOfCounselling(e.target.value)} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="addPatientCounseling-form-actions">
        <button className="addPatientCounseling-add-btn" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default AddPatientCounseling;
