/* Ajhar Tamboli addContractManagement.jsx 11-10-24 */

import React, { useState, useEffect } from 'react';
import "./addContractManagement.css";

const AddContractManagement = ({ onClose, contract, onSubmit }) => {
  const [formData, setFormData] = useState({
    contract_id: '',
    vendorId: '',
    contractStartDate: '',
    contractEndDate: '',
    status: '',
    contractAmount: '',
    contractTermsAndConditions: '',
    paymentSchedule: '',
    associatedPurchaseOrders: '',
    renewalDate: '',
    remarks: '',
  });

  // Load contract data if contract is provided for editing
  useEffect(() => {
    if (contract) {
      setFormData(contract);
    }
  }, [contract]);


  useEffect(() => {
    if (contract) {
      const vendor_id = contract.vendormanagement?.vendor_id || '';
      setFormData(prev => ({
        ...prev,
        ...contract,
        vendorId: vendor_id,
      }));
    }
  }, [contract]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    onClose(); // Close the modal after submitting
  };

  return (
    <div className="addContractManagement-container">
      <div className="addContractManagement-header">
        <h3>{contract ? "Update Contract Management" : "Add Contract Management"}</h3>
        <button className="addContractManagement-close-btn" onClick={onClose}>x</button>
      </div>

      <form className="addContractManagement-form" onSubmit={handleSubmit}>
        <div className="addContractManagement-form-row">
          <div className="addContractManagement-form-group-1row">
            <div className="addContractManagement-form-group">
              <label>Contract ID<span>*</span></label>
              <input
                type="text"
                name="contract_id"
                value={formData.contract_id}
                placeholder="Enter Contract ID"
                onChange={handleChange}
              />
            </div>
            <div className="addContractManagement-form-group">
              <label>Vendor ID<span>*</span></label>
              <input
                type="text"
                name="vendorId"
                value={formData.vendorId}
                placeholder="Enter Vendor ID"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="addContractManagement-form-group-1row">
            <div className="addContractManagement-form-group">
              <label>Contract Start Date</label>
              <input
                type="date"
                name="contractStartDate"
                value={formData.contractStartDate}
                placeholder="Enter Contract Start Date"
                onChange={handleChange}
              />
            </div>
            <div className="addContractManagement-form-group">
              <label>Contract End Date<span>*</span></label>
              <input
                type="date" style={{ marginLeft: '50px' }}
                name="contractEndDate"
                value={formData.contractEndDate}
                placeholder='Enter Contract End Date'
                onChange={handleChange}

              />
            </div>
          </div>

          <div className="addContractManagement-form-group-1row">
            <div className="addContractManagement-form-group">
              <label>Contract Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                placeholder="Enter Contract Status"
                onChange={handleChange}
              />
            </div>
            <div className="addContractManagement-form-group">
              <label>Contract Amount<span>*</span></label>
              <input
                type="text"
                name="contractAmount"
                value={formData.contractAmount}
                placeholder='Enter Contract Amount'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="addContractManagement-form-group-1row">
            <div className="addContractManagement-form-group">
              <label>Contract Terms & Conditions</label>
              <input
                type="text"
                name="contractTermsAndConditions"
                value={formData.contractTermsAndConditions}
                placeholder="Enter Contract Terms & Conditions"
                onChange={handleChange}
              />
            </div>
            <div className="addContractManagement-form-group">
              <label>Payment Schedule</label>
              <input
                type="text"
                name="paymentSchedule"
                value={formData.paymentSchedule}
                placeholder="Enter Payment Schedule"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="addContractManagement-form-group-1row">
            <div className="addContractManagement-form-group">
              <label>Associated Purchase Orders</label>
              <input
                type="text"
                name="associatedPurchaseOrders"
                value={formData.associatedPurchaseOrders}
                placeholder="Enter Associated Purchase Orders"
                onChange={handleChange}
              />
            </div>
            <div className="addContractManagement-form-group">
              <label>Renewal Date</label>
              <input
                type="date" style={{ marginLeft: '50px' }}
                name="renewalDate"
                value={formData.renewalDate}
                placeholder="Enter Renewal Date"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="addContractManagement-form-group-1row">
            <div className="addContractManagement-form-group">
              <label>Remarks</label>
              <input
                type="text"
                name="remarks"
                value={formData.remarks}
                placeholder="Enter Remarks"
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        <div className="addContractManagement-form-actions">
          <button type="submit" className="addContractManagement-add-btn">
            {contract ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContractManagement;
