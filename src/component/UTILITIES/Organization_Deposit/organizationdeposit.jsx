
import React, { useState } from 'react';
import axios from 'axios'; // Axios for API requests
import './organizationdeposit.css';

function OrganizationDeposit() {
  const [selectedOrg, setSelectedOrg] = useState('');
  const [orgCode, setOrgCode] = useState('');
  const [showOrgInfo, setShowOrgInfo] = useState(false);
  const [paymentOption, setPaymentOption] = useState('Cash');
  const [showModal, setShowModal] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    creaditOrg: '',
    transactionType: 'Receive',
    nameofRepresentative: '',
    amount: 0,
    depositHead: 'Normal Deposit',
    remark: '',
    paymentOption: 'Cash'
  });

  const orgData = {
    'MADISON - NON SMART': 'MNS',
    'ACME CORP': 'ACM',
    'GLOBEX CORPORATION': 'GLC'
  };

  const handleOrgSelect = (e) => {
    const selected = e.target.value;
    setSelectedOrg(selected);
    setOrgCode(orgData[selected] || '');
    setFormData({ ...formData, creaditOrg: selected });
    setShowOrgInfo(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentOptionChange = (event) => {
    const selectedOption = event.target.value;
    setPaymentOption(selectedOption);
    setFormData({ ...formData, paymentOption: selectedOption });
    if (selectedOption === 'Other') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post('http://localhost:8989/api/Organization-Deposit/save-organizationDeposit', formData);
      alert('Transaction Details saved successfully!');
    } catch (error) {
      console.error('There was an error saving the deposit:', error);
    }
  };

  const handleConfirm = () => {
    setIsPopupVisible(false);
    handleSaveClick(); // Trigger save when confirmed
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='organizationmainclass'>
      <div className="organization-deposit">
        <center><h4>Organization Deposit</h4></center>

        <div className="organization-form-group">
          <label>Select Credit Organization:</label>
          <select className='organization-deposit-select' value={selectedOrg} onChange={handleOrgSelect}>
            {Object.keys(orgData).map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>
        </div>

        {showOrgInfo && (
          <div className="info-row">
            <div className="utlt-org-form-group">
              <label>Organization Code:</label>
              <span>{orgCode}</span>
            </div>
            <div className="utlt-org-form-group">
              <label>Deposit Balance:</label>
              <span>0</span>
            </div>
          </div>
        )}

        <div className="utlt-org-form-group">
          <label>Transaction Type *</label>
          <select className='organization-deposit-select' name="transactionType" value={formData.transactionType} onChange={handleChange}>
            <option>Receive</option>
          </select>
        </div>

        <div className="utlt-org-form-group">
          <label>Name of Representative *</label>
          <input className='organization-deposit-input' type="text" name="nameofRepresentative" value={formData.nameofRepresentative} onChange={handleChange} placeholder="Enter Name of Representative" />
        </div>

        <div className="utlt-org-form-group">
          <label>Amount *</label>
          <input className='organization-deposit-input' type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Enter Amount" />
        </div>

        <div className="utlt-org-form-group">
          <label>Deposit Head *</label>
          <select className='organization-deposit-select' name="depositHead" value={formData.depositHead} onChange={handleChange}>
            <option>Normal Deposit</option>
          </select>
        </div>

        <div className="utlt-org-form-group">
          <label>Remarks</label>
          <textarea className='organization-deposit-textarea' name="remark" value={formData.remark} onChange={handleChange}></textarea>
        </div>

        <div className="utlt-org-form-group">
          <label>Payment Options:</label>
          <select className='organization-deposit-select' name="paymentOption" value={formData.paymentOption} onChange={handlePaymentOptionChange}>
            <option>Cash</option>
            <option>Credit</option>
            <option>Other</option>
          </select>
        </div>

        {paymentOption === 'Credit' && (
          <div className="form-group Credit-optionlist">
            <label>Credit Options:</label>
            <select className='organization-deposit-select'>
              <option>NHIF CAPITATION</option>
              <option>NHIF General</option>
              <option>MTIBA</option>
            </select>
          </div>
        )}

        {isPopupVisible && (
          <div className="popup">
            <div className="popup-content">
              <h2 className='organization-deposit-h2'>Confirm!</h2>
              <p>Are you sure you want to save?</p>
              <div className="popup-buttons">
                <button className="changevisitscheme-btn-confirm" onClick={handleConfirm}>Confirm</button>
                <button className="changevisitscheme-btn-cancel" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="utlt-org-button-group">
          <button className="btn_Change_Visitschememainsave btn btn-success" onClick={() => setIsPopupVisible(true)}>Save Deposit</button>
          <button className="discard-btn">Discard</button>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDeposit;
