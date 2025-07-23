/* Ajhar Tamboli addcommunityOutreach.jsx 08-10-24 */

import React, { useState, useEffect } from 'react';
import "./addcommunityOutreach.css";

const AddcommunityOutreach = ({ onClose, outreachProgram, onSubmit }) => {
  const [outreachId, setOutreachId] = useState('');
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [servicesProvided, setServicesProvided] = useState('');
  const [volunteerName, setVolunteerName] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('');

  // Populate the form if editing
  useEffect(() => {
    if (outreachProgram) {
      setOutreachId(outreachProgram.communityOutreachId);
      setEventName(outreachProgram.eventName);
      setLocation(outreachProgram.location);
      setDateTime(outreachProgram.dateTime);
      setServicesProvided(outreachProgram.servicesProvided);
      setVolunteerName(outreachProgram.volunteerName);
      setBeneficiaries(outreachProgram.beneficiaries);
    } else {
      // Clear the form for adding a new outreach
      clearForm();
    }
  }, [outreachProgram]);

  const clearForm = () => {
    setOutreachId('');
    setEventName('');
    setLocation('');
    setDateTime('');
    setServicesProvided('');
    setVolunteerName('');
    setBeneficiaries('');
  };

  const handleSubmit = () => {
    const outreachData = {
      outreachId,
      eventName,
      location,
      dateTime,
      servicesProvided,
      volunteerName,
      beneficiaries,
    };


    console.log('Updating program:', outreachData);
    onSubmit(outreachData);


    onClose();
  };

  return (
    <div className="addcommunityOutreach-container">
      <div className="addcommunityOutreach-header">
        <h3>{outreachProgram ? 'Edit Community Outreach' : 'Add Community Outreach'}</h3>
        <button className="addcommunityOutreach-close-btn" onClick={onClose}>x</button>
      </div>

      <div className="addcommunityOutreach-form">
        <div className="addcommunityOutreach-form-row">
          <div className="addcommunityOutreach-form-group-1row">
            <div className="addcommunityOutreach-form-group">
              <label>Outreach ID<span>*</span></label>
              <input
                type="text"
                placeholder="Enter Outreach ID"
                value={outreachId}
                onChange={(e) => setOutreachId(e.target.value)}
              />
            </div>
            <div className="addcommunityOutreach-form-group">
              <label>Event Name<span>*</span></label>
              <input
                type="text"
                placeholder="Enter Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
          </div>

          <div className="addcommunityOutreach-form-group-1row">
            <div className="addcommunityOutreach-form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="addcommunityOutreach-form-group">
              <label>Date and Time<span>*</span></label>
              <input
                type="datetime-local"
                placeholder="Enter Date and Time"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>
          </div>

          <div className="addcommunityOutreach-form-group-1row">
            <div className="addcommunityOutreach-form-group">
              <label>Services Provided</label>
              <input
                type="text"
                placeholder="Enter Services Provided"
                value={servicesProvided}
                onChange={(e) => setServicesProvided(e.target.value)}
              />
            </div>
            <div className="addcommunityOutreach-form-group">
              <label>Volunteer Name<span>*</span></label>
              <input
                type="text"
                placeholder="Enter Volunteer Name"
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
              />
            </div>
          </div>

          <div className="addcommunityOutreach-form-group-1row">
            <div className="addcommunityOutreach-form-group">
              <label>Beneficiaries</label>
              <input
                type="text"
                placeholder="Enter Beneficiaries"
                value={beneficiaries}
                onChange={(e) => setBeneficiaries(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="addcommunityOutreach-form-actions">
        <button className="addcommunityOutreach-add-btn" onClick={handleSubmit}>
          {outreachProgram ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default AddcommunityOutreach;
