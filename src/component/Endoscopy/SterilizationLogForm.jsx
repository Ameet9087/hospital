import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './ProcedureSchedulingForm.css';

const SterilizationLogForm = () => {
  const initialState = {
    endoscopeId: '',
    sterilizationDateTime: '',
    technicianName: '',
    sterilizationMethod: '',
    sterilizationResult: 'Pass', // Default value
    notes: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [endoscopes, setEndoscopes] = useState([]); // State for endoscopes
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchEndoscopes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/endoscopes');
        setEndoscopes(response.data); // Assuming response.data is an array of endoscopes
      } catch (err) {
        console.error('Error fetching endoscopes:', err);
        setError('Failed to fetch endoscopes.'); // Set error message
      }
    };

    fetchEndoscopes(); // Fetch endoscopes on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    // Simple validation to check if required fields are filled
    if (!formData.endoscopeId || !formData.sterilizationDateTime || !formData.technicianName) {
      setError('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Validate the form before submission

    console.log('Form Submitted:', formData);

    try {
      const response = await axios.post('http://localhost:8000/api/sterilization-logs/add', {
        ...formData,
        sterilizationDateTime: new Date(formData.sterilizationDateTime).toISOString(), // Ensure correct format
        endoscopeSerialNumber: formData.endoscopeId, // Send the selected endoscope ID
      });
      console.log('Response:', response.data);
      alert('Sterilization log added successfully!'); // Set success message
      setError(null); // Clear any previous errors
      handleReset(); // Reset form after successful submission
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.message || 'Failed to add sterilization log. Please try again.'); // Set error message
    }
  };

  const handleReset = () => {
    setFormData(initialState); // Reset state to initial values
    setError(null); // Clear error messages
  };

  return (
    <form className="procedure-scheduling-form" onSubmit={handleSubmit}>
      <div className="procedure-scheduling-form-left">
        <div className="procedure-scheduling-form-group">
          <label htmlFor="endoscopeId">Endoscope ID:</label>
          <select
            id="endoscopeId"
            name="endoscopeId"
            value={formData.endoscopeId}
            onChange={handleChange}
            required // Mark as required
          >
            <option value="">Select Endoscope</option> {/* Placeholder option */}
            {endoscopes.map((endoscope) => (
              <option key={endoscope.endoscopeId} value={endoscope.endoscopeId}>
                {endoscope.endoscopeId}
              </option>
            ))}
          </select>
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="sterilizationDateTime">Sterilization Date and Time:</label>
          <input
            type="datetime-local"
            id="sterilizationDateTime"
            name="sterilizationDateTime"
            value={formData.sterilizationDateTime}
            onChange={handleChange}
            required // Mark as required
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
            required // Mark as required
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

        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </div>
    </form>
  );
};

export default SterilizationLogForm;
/* Mohini_Endoscopy_SterilizationLogForm_18-10-24 */
