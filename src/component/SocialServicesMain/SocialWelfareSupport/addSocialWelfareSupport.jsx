/* Ajhar Tamboli addSocialWelfareSupport.jsx 08-10-24 */

import React, { useEffect, useState } from 'react';
import "./addSocialWelfareSupport.css";

const AddSocialWelfareSupport = ({ onClose, support, onSubmit }) => {
  // State variables for each field
  const [socialwelfaresupportId, setsocialwelfaresupportId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [welfareType, setWelfareType] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [supportDuration, setSupportDuration] = useState('');
  const [eligibilityCriteria, setEligibilityCriteria] = useState('');
  const [welfareStatus, setWelfareStatus] = useState('');

  // Effect to populate fields if support is provided
  useEffect(() => {
    if (support) {
      setsocialwelfaresupportId(support.socialwelfaresupportId || '');
      setPatientId(support.ngoPatient.patientId || '');
      setWelfareType(support.welfareType || '');
      setServiceProvider(support.serviceProvider || '');
      setSupportDuration(support.supportDuration || '');
      setEligibilityCriteria(support.eligibilityCriteria || '');
      setWelfareStatus(support.welfareStatus || '');
    }
  }, [support]);

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newSocialWelfareSupport = {
      socialwelfaresupportId,
      patientId,
      welfareType,
      serviceProvider,
      supportDuration,
      eligibilityCriteria,
      welfareStatus,
    };

    // Send the form data to the onSubmit function
    onSubmit(newSocialWelfareSupport);
    
    // Close the popup after submission
    onClose();
  };

  return (
    <div className="addSocialWelfareSupport-container">
      <div className="addSocialWelfareSupport-header">
        <h3>{support ? 'Edit Social Welfare Support' : 'Add Social Welfare Support'}</h3>
        <button className="addSocialWelfareSupport-close-btn" onClick={onClose}>x</button>
      </div>

      <form className="addSocialWelfareSupport-form">
        <div className="addSocialWelfareSupport-form-row">

          <div className="addSocialWelfareSupport-form-group-1row">
            <div className="addSocialWelfareSupport-form-group">
              <label>Support ID<span>*</span></label>
              <input 
                type="text" 
                placeholder="Enter Support ID" 
                value={socialwelfaresupportId}
                onChange={(e) => setsocialwelfaresupportId(e.target.value)}
                required 
              />
            </div>
            <div className="addSocialWelfareSupport-form-group">
              <label>Patient ID<span>*</span></label>
              <input 
                type="text" 
                placeholder="Enter Patient ID" 
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="addSocialWelfareSupport-form-group-1row">
            <div className="addSocialWelfareSupport-form-group">
              <label>Welfare Type</label>
              <input 
                type="text" 
                placeholder="Enter Welfare Type" 
                value={welfareType}
                onChange={(e) => setWelfareType(e.target.value)}
              />
            </div>
            <div className="addSocialWelfareSupport-form-group">
              <label>Service Provider<span>*</span></label>
              <input 
                type="text"  
                placeholder="Enter Service Provider" 
                value={serviceProvider}
                onChange={(e) => setServiceProvider(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="addSocialWelfareSupport-form-group-1row">
            <div className="addSocialWelfareSupport-form-group">
              <label>Support Duration</label>
              <input 
                type="text" 
                placeholder="Enter Support Duration" 
                value={supportDuration}
                onChange={(e) => setSupportDuration(e.target.value)}
              />
            </div>
            <div className="addSocialWelfareSupport-form-group">
              <label>Eligibility Criteria<span>*</span></label>
              <input 
                type="text"  
                placeholder="Enter Eligibility Criteria" 
                value={eligibilityCriteria}
                onChange={(e) => setEligibilityCriteria(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="addSocialWelfareSupport-form-group-1row">
            <div className="addSocialWelfareSupport-form-group">
              <label>Welfare Status</label>
              <input 
                type="text" 
                placeholder="Enter Welfare Status" 
                value={welfareStatus}
                onChange={(e) => setWelfareStatus(e.target.value)}
              />
            </div>
          </div>

        </div>

        <div className="addSocialWelfareSupport-form-actions">
          <button className="addSocialWelfareSupport-add-btn" type="submit" onClick={handleSubmit}>
            {support ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSocialWelfareSupport;
