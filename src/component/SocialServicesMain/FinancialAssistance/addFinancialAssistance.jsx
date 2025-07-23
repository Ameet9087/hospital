/* Ajhar Tamboli addFinancialAssistance.jsx 08-10-24 */


import React, { useEffect, useState } from 'react';
import "./addFinancialAssistance.css";

const AddFinancialAssistance = ({ onClose, testData, onSubmit }) => {
  const [formData, setFormData] = useState({
    counselingId: '',
    patientId: '',
    assistenceType: '',
    approvalStatus: '',
    amountGranted: '',
    fundingSource: '',
    assistenceDate: ''
  });

  // If testData is provided, pre-fill the form
  useEffect(() => {
    if (testData) {
      setFormData({
        counselingId: testData.assistenceId || '',
        patientId: testData.ngoPatient?.patientId || '',
        assistenceType: testData.assistenceType || '',
        approvalStatus: testData.approvalStatus || '',
        amountGranted: testData.amountGranted || '',
        fundingSource: testData.fundingSource || '',
        assistenceDate: testData.assistenceDate || ''
      });
    }
  }, [testData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    // Call the onSubmit prop function with the formData
    onSubmit(formData, testData); // Pass formData and testData for determining action
    onClose(); // Close the popup after submission
  };

  return (
    <div className="addFinancialAssistance-container">
      <div className="addFinancialAssistance-header">
        <h3>{testData ? 'Edit Financial Assistance' : 'Add Financial Assistance'}</h3>
        <button className="addFinancialAssistance-close-btn" onClick={onClose}>x</button>
      </div>

      <div className="addFinancialAssistance-form">
        <div className="addFinancialAssistance-form-row">
          <div className="addFinancialAssistance-form-group-1row">
            <div className="addFinancialAssistance-form-group">
              <label>Assistance ID<span>*</span></label>
              <input type="text" name="counselingId" value={formData.counselingId} onChange={handleChange} placeholder="Enter Counseling ID" />
            </div>
            <div className="addFinancialAssistance-form-group">
              <label>Patient Id<span>*</span></label>
              <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} placeholder="Enter Patient Id" />
            </div>
          </div>

          <div className="addFinancialAssistance-form-group-1row">
            <div className="addFinancialAssistance-form-group">
              <label>Assistance Type</label>
              <input type="text" name="assistenceType" value={formData.assistenceType} onChange={handleChange} placeholder="Enter Assistance Type" />
            </div>
            <div className="addFinancialAssistance-form-group">
              <label>Approval Status<span>*</span></label>
              <input type="text" name="approvalStatus" value={formData.approvalStatus} onChange={handleChange} placeholder="Approval Status" />
            </div>
          </div>

          <div className="addFinancialAssistance-form-group-1row">
            <div className="addFinancialAssistance-form-group">
              <label>Amount Granted</label>
              <input type="number" name="amountGranted" value={formData.amountGranted} onChange={handleChange} placeholder="Enter Amount Granted" />
            </div>
            <div className="addFinancialAssistance-form-group">
              <label>Funding Source<span>*</span></label>
              <input type="text" name="fundingSource" value={formData.fundingSource} onChange={handleChange} placeholder="Enter Funding Source" />
            </div>
          </div>

          <div className="addFinancialAssistance-form-group-1row">
            <div className="addFinancialAssistance-form-group">
              <label>Assistance Date</label>
              <input type="date" name="assistenceDate" value={formData.assistenceDate} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      <div className="addFinancialAssistance-form-actions">
        <button className="addFinancialAssistance-add-btn" onClick={handleSubmit}>
          {testData ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default AddFinancialAssistance;
