import React, { useState } from 'react';
import './TreatmentPrescriptionOutpatientForm.css';

const ImmunizationOutpatientForm = ({ sendImmuniZation, immunization }) => {
  const [vaccineType, setVaccineType] = useState('');
  const [dateAdministered, setDateAdministered] = useState('');
  const [vaccineLotNumber, setVaccineLotNumber] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [administeredBy, setAdministeredBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine all data into a single object
    const immunizationData = {
      vaccineType,
      dateAdministered,
      vaccineLotNumber,
      nextDueDate,
      administeredBy,
    };

    // Send the combined data to the parent component or an API
    sendImmuniZation(immunizationData);

    // Optionally log the data to the console
    console.log(immunizationData);
  };

  return (
    <div className="treatment-prescription-out-patient-form-container">
      <h2 className="treatment-prescription-out-patient-title">Paediatric Immunization Record Form</h2>
      <form onSubmit={handleSubmit} className="treatment-prescription-out-patient-form">
        <h3>Immunization Details</h3>
        <div className='treatment-prescription-out-patient-right'>
          <div className="immu-treatment-prescription-out-patient-group">
            <div className="treatment-prescription-out-patient-label-input">
              <label htmlFor="vaccineType">Vaccine Type</label>
              <input
                type="text"
                id="vaccineType"
                value={vaccineType}
                onChange={(e) => setVaccineType(e.target.value)}
                placeholder="Enter vaccine type"
              />
            </div>
            
            <div className="treatment-prescription-out-patient-label-input">
              <label htmlFor="dateAdministered">Date Administered</label>
              <input
                type="date"
                id="dateAdministered"
                value={dateAdministered}
                onChange={(e) => setDateAdministered(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='treatment-prescription-out-patient-left'>
          <div className="immu-treatment-prescription-out-patient-group">
            <div className="treatment-prescription-out-patient-label-input">
              <label htmlFor="vaccineLotNumber">Vaccine Lot Number</label>
              <input
                type="text"
                id="vaccineLotNumber"
                value={vaccineLotNumber}
                onChange={(e) => setVaccineLotNumber(e.target.value)}
                placeholder="Enter vaccine lot number"
              />
            </div>

            <div className="treatment-prescription-out-patient-label-input">
              <label htmlFor="nextDueDate">Next Due Date (for booster shots)</label>
              <input
                type="date"
                id="nextDueDate"
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className='treatment-prescription-out-patient-left'>
          <div className="immu-treatment-prescription-out-patient-group">
            <div className="treatment-prescription-out-patient-label-input">
              <label htmlFor="administeredBy">Administered By</label>
              <input
                type="text"
                id="administeredBy"
                value={administeredBy}
                onChange={(e) => setAdministeredBy(e.target.value)}
                placeholder="Enter name of healthcare provider"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="treatment-prescription-out-patient-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImmunizationOutpatientForm;
