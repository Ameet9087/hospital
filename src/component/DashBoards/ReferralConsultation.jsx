import React, { useState, useEffect } from 'react';
import './ReferralConsultation.css';
import axios from 'axios'; // Import axios

const ReferralConsultation = () => {
  const [doctorName, setDoctorName] = useState('');
  const [priority, setPriority] = useState('');
  const [reasonFor, setReasonFor] = useState('');
  const [patientId, setPatientId] = useState(1); // Assuming patient ID is 1 for now
  const [referrals, setReferrals] = useState([]); // To store fetched referrals

  // Handle form cancel
  const handleCancel = () => {
    setDoctorName('');
    setPriority('');
    setReasonFor('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      doctorName,
      priority,
      reasonFor,
      patient:{
        patientId:1
      }
    };

    try {
      // Save data to the backend
      await axios.post('http://192.168.0.110:9000/referrals', formData);
      console.log('Form submitted:', formData);
      alert('Referral submitted successfully!');
      // Optionally, reset form after submission
      handleCancel();
    } catch (error) {
      console.error('Error submitting referral:', error);
      alert('Failed to submit referral.');
    }
  };

  // Fetch referrals for a specific patient on component mount
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get(`http://192.168.0.110:9000/referrals/patient/1`);
        setReferrals(response.data); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching referrals:', error);
      }
    };

    fetchReferrals();
  }, [patientId]); // Fetch on component mount or when patientId changes

  return (
    <div className="ReferralConsultation-form-container">
      <h3>Referral / Cross Consultation</h3>


      {/* Referral form */}
      <form onSubmit={handleSubmit}>
        <div className="ReferralConsultation-content">
          <div className="ReferralConsultation-content-left">
            <div className="ReferralConsultation-form-group">
              <label htmlFor="doctorName">Doctor Name:</label>
              <input
                type="text"
                id="doctorName"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
              />
            </div>

            <div className="ReferralConsultation-form-group">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="ReferralConsultation-content-right">
            <div className="ReferralConsultation-form-group">
              <label htmlFor="reasonFor">Reason For Referral:</label>
              <textarea
                id="reasonFor"
                value={reasonFor}
                onChange={(e) => setReasonFor(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="ReferralConsultation-buttons">
          <button type="button" onClick={handleCancel} className="ReferralConsultation-cancel-btn">
            Cancel
          </button>
          <button type="submit" className="ReferralConsultation-submit-btn">
            Submit
          </button>
        </div>
      </form>

      
      {/* Display existing referrals for the patient */}
      <div className="ReferralConsultation-existing-referrals">
        <h4>Existing Referrals:</h4>
        {referrals.length > 0 ? (
          <ul>
            {referrals.map((referral) => (
              <li key={referral.sn}>
                <strong>Doctor:</strong> {referral.doctorName}, <strong>Priority:</strong> {referral.priority}, <strong>Reason:</strong> {referral.reasonFor}
              </li>
            ))}
          </ul>
        ) : (
          <p>No existing referrals found.</p>
        )}
      </div>
    </div>
  );
};

export default ReferralConsultation;
