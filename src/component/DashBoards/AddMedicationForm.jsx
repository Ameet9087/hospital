import React from 'react';
import './ClinicalMedication.css';

const AddMedicationForm = () => {
  return (
    <div className="medication-form-container">
      <h2 className="form-header">Add Home Medication</h2>
      <form className="medication-form">
        <div className="form-group">
          <label>Type *</label>
          <div>
            <input type="checkbox" id="current" name="current" />
            <label htmlFor="current">Current</label>
            <input type="checkbox" id="home" name="home" />
            <label htmlFor="home">Home</label>
          </div>
        </div>
        <div className="form-group">
          <label>Name *</label>
          <input type="text" name="name" placeholder="Medication Name" required />
        </div>
        <div className="form-group">
          <label>Dose *</label>
          <input type="text" name="dose" placeholder="Dose" required />
        </div>
        <div className="form-group">
          <label>Route *</label>
          <select name="route" required>
            <option value="">Select Route</option>
            <option value="oral">Oral</option>
            <option value="iv">IV</option>
          </select>
        </div>
        <div className="form-group">
          <label>Frequency *</label>
          <input type="text" name="frequency" placeholder="Frequency" required />
        </div>
        <div className="form-group">
          <label>Last Taken *</label>
          <input type="date" name="lastTaken" required />
        </div>
        <div className="form-group">
          <label>Comments</label>
          <textarea name="comments" placeholder="Comments"></textarea>
        </div>
        <button type="submit" className="medication-submit-btn">Add</button>
      </form>
    </div>
  );
};

export default AddMedicationForm;
