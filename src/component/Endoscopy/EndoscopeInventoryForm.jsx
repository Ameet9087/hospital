import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './ProcedureSchedulingForm.css';

const EndoscopeInventoryForm = () => {
  const initialState = {

    endoscopeModel: '',
    endoscopeType: '',
    lastMaintenanceDate: '',
    sterilizationStatus: 'Sterilized',
    availability: 'Available',
    assignedProcedure: '',
    notes: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle submission state
  const [error, setError] = useState(null); // To handle any API errors

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Prepare data for the API request
    const dataToSend = {
    
      serialNumber: formData.endoscopeModel,  // Assuming model is the serial number
      model: formData.endoscopeModel,
      type: formData.endoscopeType,
      lastMaintenanceDate: formData.lastMaintenanceDate,
      sterilizationStatus: formData.sterilizationStatus,
      availability: formData.availability,
      notes: formData.notes,
    };

    try {
      // Make the API request
      const response = await axios.post('http://localhost:8000/api/endoscopes', dataToSend);
      console.log('Response:', response.data);
      alert("Endoscope Data Added Successfully");
      // Reset the form after successful submission
      handleReset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form.');
    } finally {
      setIsSubmitting(false); // Stop loading state
    }
  };

  const handleReset = () => {
    setFormData(initialState); // Reset state to initial values
  };

  return (
    <form className="procedure-scheduling-form" onSubmit={handleSubmit}>
      <div className="procedure-scheduling-form-left">
        {/* <div className="procedure-scheduling-form-group">
          <label htmlFor="endoscopeId">Endoscope ID:</label>
          <input
            type="text"
            id="endoscopeId"
            name="endoscopeId"
            value={formData.endoscopeId}
            onChange={handleChange}
          />
        </div> */}

        <div className="procedure-scheduling-form-group">
          <label htmlFor="endoscopeModel">Endoscope Model:</label>
          <input
            type="text"
            id="endoscopeModel"
            name="endoscopeModel"
            value={formData.endoscopeModel}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="endoscopeType">Endoscope Type:</label>
          <input
            type="text"
            id="endoscopeType"
            name="endoscopeType"
            value={formData.endoscopeType}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="lastMaintenanceDate">Last Maintenance Date:</label>
          <input
            type="date"
            id="lastMaintenanceDate"
            name="lastMaintenanceDate"
            value={formData.lastMaintenanceDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="procedure-scheduling-form-right">
        <div className="procedure-scheduling-form-group">
          <label htmlFor="sterilizationStatus">Sterilization Status:</label>
          <select
            id="sterilizationStatus"
            name="sterilizationStatus"
            value={formData.sterilizationStatus}
            onChange={handleChange}
          >
            <option value="Sterilized">Sterilized</option>
            <option value="Not Sterilized">Not Sterilized</option>
          </select>
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="availability">Availability:</label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="assignedProcedure">Assigned Procedure:</label>
          <input
            type="text"
            id="assignedProcedure"
            name="assignedProcedure"
            value={formData.assignedProcedure}
            onChange={handleChange}
          />
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
          <button
            type="submit"
            className="procedure-scheduling-form-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            className="procedure-scheduling-form-submit-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>
    </form>
  );
};

export default EndoscopeInventoryForm;
    /* Prachi_Endoscopy_18-10-24 */