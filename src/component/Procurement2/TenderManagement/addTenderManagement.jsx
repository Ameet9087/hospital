/* Ajhar Tamboli addTenderManagement.jsx 11-10-24 */


import React, { useState, useEffect } from 'react';
import './addTenderManagement.css';

const AddTenderManagement = ({ onClose, selectedTender, onSubmit }) => {
  const [formData, setFormData] = useState({
    tender_id: '',
    vendorId: '',
    tenderName: '',
    department: '',
    tenderIssuingDate: '',
    submissionDeadline: '',
    vendorsParticipating: '',
    vendorsProposal: '',
    winningVendor: '',
    contractId: '',
    tenderAmount: '',
    status: '',
  });



  useEffect(() => {
    if (selectedTender) {
      const vendor_id = selectedTender.vendormanagement?.vendor_id || '';
      setFormData(prev => ({
        ...prev,
        ...selectedTender,
        vendorId: vendor_id
      }));
    }
  }, [selectedTender]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSubmit(formData);
    onClose();



  };

  return (
    <div className="addTenderManagement-container">
      <div className="addTenderManagement-header">
        <h3>{selectedTender ? 'Edit Tender Management' : 'Add Tender Management'}</h3>
        <button className="addTenderManagement-close-btn" onClick={onClose}>x</button>
      </div>

      <form className="addTenderManagement-form" onSubmit={handleSubmit}>
        <div className="addTenderManagement-form-row">
          <div className="addTenderManagement-form-group-1row">
            <div className="addTenderManagement-form-group">
              <label>Tender ID<span>*</span></label>
              <input
                type="text"
                name="tender_id"
                value={formData.tender_id}
                onChange={handleChange}
                placeholder="Enter Tender ID"

              />
            </div>
            <div className="addTenderManagement-form-group">
              <label>Vendor ID<span>*</span></label>
              <input
                type="text"
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                placeholder="Enter Vendor ID"
                required
              />
            </div>
          </div>

          <div className="addTenderManagement-form-group-1row">
            <div className="addTenderManagement-form-group">
              <label>Tender Name/Description</label>
              <input
                type="text"
                name="tenderName"
                value={formData.tenderName}
                onChange={handleChange}
                placeholder="Enter Tender Name/Description"
              />
            </div>
            <div className="addTenderManagement-form-group">
              <label>Department<span>*</span></label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter Department"
              />
            </div>
          </div>

          <div className="addTenderManagement-form-group-1row">
            <div className="addTenderManagement-form-group">
              <label>Tender Issuing Date</label>
              <input
                type="date"
                name="tenderIssuingDate"
                value={formData.tenderIssuingDate}
                onChange={handleChange}
                placeholder="Enter Tender Issuing Date"
              />
            </div>
            <div className="addTenderManagement-form-group">
              <label>Submission Deadline<span>*</span></label>
              <input
                type="date"
                name="submissionDeadline"
                style={{ marginLeft: '55px' }}
                value={formData.submissionDeadline}
                onChange={handleChange}
                placeholder="Enter Submission Deadline"

              />
            </div>
          </div>

          <div className="addTenderManagement-form-group-1row">
            <div className="addTenderManagement-form-group">
              <label>Vendors Participating</label>
              <input
                type="number"
                name="vendorsParticipating"
                value={formData.vendorsParticipating}
                onChange={handleChange}
                placeholder="Enter Vendors Participating"
              />
            </div>
            <div className="addTenderManagement-form-group">
              <label>Vendor Proposals/Quotes</label>
              <input
                type="text"
                name="vendorsProposal"
                value={formData.vendorsProposal}
                onChange={handleChange}
                placeholder="Enter Vendor Proposals/Quotes"
              />
            </div>
          </div>

          <div className="addTenderManagement-form-group-1row">
            <div className="addTenderManagement-form-group">
              <label>Winning Vendor</label>
              <input
                type="text"
                name="winningVendor"
                value={formData.winningVendor}
                onChange={handleChange}
                placeholder="Enter Winning Vendor"
              />
            </div>
            <div className="addTenderManagement-form-group">
              <label>Contract ID</label>
              <input
                type="number"
                name="contractId"
                value={formData.contractId}
                onChange={handleChange}
                placeholder="Enter Contract ID"
              />
            </div>
          </div>

          <div className="addTenderManagement-form-group-1row">
            <div className="addTenderManagement-form-group">
              <label>Tender Amount</label>
              <input
                type="number"
                name="tenderAmount"
                value={formData.tenderAmount}
                onChange={handleChange}
                placeholder="Enter Tender Amount"
              />
            </div>
            <div className="addTenderManagement-form-group">
              <label>Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Enter Status"
              />
            </div>
          </div>
        </div>

        <div className="addTenderManagement-form-actions">
          <button type="submit" className="addTenderManagement-add-btn">
            {selectedTender ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTenderManagement;
