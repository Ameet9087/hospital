  /* Mohini_Endoscopy_ImagingReportsForm_18-10-24 */
import React, { useState } from 'react';
import './ProcedureSchedulingForm.css';

const ImagingReportsForm = () => {
  const initialState = {
    endoscopeId: '',
    sterilizationDateTime: '',
    technicianName: '',
    sterilizationMethod: '',
    sterilizationResult: 'Pass',
    notes: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add any further submission logic here (like sending data to a backend)
  };

  const handleReset = () => {
    setFormData(initialState); // Reset state to initial values
  };

  return (
    <form className="procedure-scheduling-form" onSubmit={handleSubmit}>
      <div className="procedure-scheduling-form-left">
        <div className="procedure-scheduling-form-group">
          <label htmlFor="endoscopeId">Endoscope ID:</label>
          <input
            type="text"
            id="endoscopeId"
            name="endoscopeId"
            value={formData.endoscopeId}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="sterilizationDateTime">Sterilization Date and Time:</label>
          <input
            type="datetime-local"
            id="sterilizationDateTime"
            name="sterilizationDateTime"
            value={formData.sterilizationDateTime}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="technicianName">Technician Name:</label>
          <input
            type="text"
            id="technicianName"
            name="technicianName"
            value={formData.technicianName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="procedure-scheduling-form-right">
        <div className="procedure-scheduling-form-group">
          <label htmlFor="sterilizationMethod">Sterilization Method:</label>
          <input
            type="text"
            id="sterilizationMethod"
            name="sterilizationMethod"
            value={formData.sterilizationMethod}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="sterilizationResult">Sterilization Result:</label>
          <select
            id="sterilizationResult"
            name="sterilizationResult"
            value={formData.sterilizationResult}
            onChange={handleChange}
          >
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="procedure-scheduling-form-actions">
        <button type="submit" className="procedure-scheduling-form-submit-btn">
          Submit
        </button>
        <button
          type="button"
          className="procedure-scheduling-form-submit-btn"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      </div>

    
    </form>
  );
};

export default ImagingReportsForm;
  /* Mohini_Endoscopy_ImagingReportsForm_18-10-24 */