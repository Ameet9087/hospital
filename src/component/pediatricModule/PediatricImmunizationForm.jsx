/* Mohini_PediatricImmunizationForm_WholePage_3/oct/24 */
import React, { useState } from 'react';
import './PaediatricVitalsExaminationForm.css'; // Ensure correct CSS file is linked

const PediatricImmunizationForm = () => {
  const [formData, setFormData] = useState({
    vaccineType: '',
    dateAdministered: '',
    vaccineLotNumber: '',
    nextDueDate: '',
    administeredBy: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="immunization-record-form-container">
      <h2 className="immunization-record-form-title">Parental Consent Form</h2>
      <form onSubmit={handleSubmit} className="immunization-record-form">
        <div className="immunization-record-form-left">
          <div className="immunization-record-form-group">
            <label htmlFor="vaccineType" className="immunization-record-form-label">
              Vaccine Type<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="vaccineType"
              name="vaccineType"
              value={formData.vaccineType}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="dateAdministered" className="immunization-record-form-label">
              Date Administered<span className="mandatory"> *</span>:
            </label>
            <input
              type="date"
              id="dateAdministered"
              name="dateAdministered"
              value={formData.dateAdministered}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="vaccineLotNumber" className="immunization-record-form-label">
              Vaccine Lot Number:
            </label>
            <input
              type="text"
              id="vaccineLotNumber"
              name="vaccineLotNumber"
              value={formData.vaccineLotNumber}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="nextDueDate" className="immunization-record-form-label">
              Next Due Date<span className="mandatory"> *</span>:
            </label>
            <input
              type="date"
              id="nextDueDate"
              name="nextDueDate"
              value={formData.nextDueDate}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="administeredBy" className="immunization-record-form-label">
              Administered By<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="administeredBy"
              name="administeredBy"
              value={formData.administeredBy}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>
          <div className="immunization-record-form-buttons">
          <button type="submit" className="immunization-record-form-submit-btn">
            Submit
          </button>
          <button
            type="button"
            className="immunization-record-form-submit-btn"
            onClick={() =>
              setFormData({
                vaccineType: '',
                dateAdministered: '',
                vaccineLotNumber: '',
                nextDueDate: '',
                administeredBy: '',
              })
            }
          >
            Cancel
          </button>
        </div>
        </div>

       
      </form>
    </div>
  );
};

export default PediatricImmunizationForm;
/* Mohini_PediatricImmunizationForm_WholePage_3/oct/24 */
