import React, { useEffect, useState } from 'react';
import './TreatmentPrescriptionOutpatientForm.css'; // Ensure you import the CSS file

const TreatmentPrescriptionOutpatientForm = ({ sendtreatmentdata, treatmentdata }) => {
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
  const [investigations, setInvestigations] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [referrals, setReferrals] = useState('');

  useEffect(() => {
    if (treatmentdata) {
      setMedications([{
        name: treatmentdata.name || "",
        dosage: treatmentdata.dosage || "",
        frequency: treatmentdata.frequency || "",
        duration: treatmentdata.duration || ""
      }]);
    }
  }, [treatmentdata]);

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = medications.map((med, medIndex) =>
      medIndex === index ? { ...med, [field]: value } : med
    );
    setMedications(updatedMedications);
  };

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine all data into a single object
    const treatmentData = {
      medications,
      investigations,
      followUpDate,
      referrals,
    };

    // Send the combined data to the parent component or an API
    sendtreatmentdata(treatmentData);

    // Optionally log the data to the console
    console.log(treatmentData);
    alert("Treatment data added");
  };

  return (
    <div className="treatment-prescription-out-patient-form-container">
      <h2 className="treatment-prescription-out-patient-title">Treatment and Prescription Form</h2>
      <form onSubmit={handleSubmit} className="treatment-prescription-out-patient-form">
        <h3>Treatment Plan</h3>

        {medications.map((med, index) => (
          <div key={index} className="treatment-prescription-out-patient-medication-group">
            <h4>Medication {index + 1}</h4>
            <div className="treatment-prescription-out-patient-group">
              <label htmlFor={`name-${index}`}>Medication Name</label>
              <input
                type="text"
                id={`name-${index}`}
                value={med.name}
                onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                placeholder="Enter medication name"
              />
            </div>

            <div className="treatment-prescription-out-patient-group">
              <label htmlFor={`dosage-${index}`}>Dosage</label>
              <input
                type="text"
                id={`dosage-${index}`}
                value={med.dosage}
                onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                placeholder="Enter dosage"
              />
            </div>

            <div className="treatment-prescription-out-patient-group">
              <label htmlFor={`frequency-${index}`}>Frequency</label>
              <input
                type="text"
                id={`frequency-${index}`}
                value={med.frequency}
                onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                placeholder="Enter frequency"
              />
            </div>

            <div className="treatment-prescription-out-patient-group">
              <label htmlFor={`duration-${index}`}>Duration</label>
              <input
                type="text"
                id={`duration-${index}`}
                value={med.duration}
                onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                placeholder="Enter duration"
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addMedication} className="treatment-prescription-out-patient-submit-btn">
          Add Another Medication
        </button>

        <div className="treatment-prescription-out-patient-group">
          <label htmlFor="investigations">Investigations Ordered</label>
          <textarea
            id="investigations"
            value={investigations}
            onChange={(e) => setInvestigations(e.target.value)}
            placeholder="Enter investigations (blood tests, urine tests, imaging)"
          />
        </div>

        <div className="treatment-prescription-out-patient-group">
          <label htmlFor="followUpDate">Follow-up Appointment Date</label>
          <input
            type="date"
            id="followUpDate"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
          />
        </div>

        <div className="treatment-prescription-out-patient-group">
          <label htmlFor="referrals">Referrals to Specialists</label>
          <textarea
            id="referrals"
            value={referrals}
            onChange={(e) => setReferrals(e.target.value)}
            placeholder="Enter referrals (e.g., pediatric cardiology, neurology)"
          />
        </div>

        <button type="submit" className="treatment-prescription-out-patient-submit-btn">
          Add Treatment
        </button>
      </form>
    </div>
  );
};

export default TreatmentPrescriptionOutpatientForm;
