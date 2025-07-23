import React, { useState } from "react";
import "./AddVoucher.css";

const AddVoucherPopup = ({ onClose }) => {
  const [voucher, setVoucher] = useState([
    {
      voucherName: "",
      voucherCode: "",
      description: "",
      isActive: false,
      isCopyDescription: false,
    },
  ]);

  const handleSave = () => {
    console.log("Saving ledgers:", voucher);
    onClose();
  };

  const handleInputChange = (e) => {
    setVoucher(e.target.value);
  };

  return (
    <div className="voucher-popup-overlay">
      <div className="voucher-popup-content">
        <h2>Create Voucher</h2>
        <div className="voucher-form-row">
          <div className="voucher-form-group">
            <label>Voucher Name</label>
            <input
              type="text"
              placeholder="voucherName"
              name="voucherName"
              onChange={handleInputChange}
              className="voucher-popup-input"
            />
          </div>
          <div className="voucher-form-group">
            <label>COA Name</label>

            <input
              type="text"
              placeholder="voucherCode"
              name="voucherCode"
              onChange={handleInputChange}
              className="voucher-popup-input"
            />
          </div>
          <div className="voucher-form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleInputChange}
              className="voucher-popup-input"
            />
          </div>
          <div className="voucher-form-group">
            <label>Is Active</label>
            <input
              type="checkbox"
              placeholder="Description"
              name="isActive"
              value={true}
              checked
              onChange={handleInputChange}
              className="voucher-popup-checkbox"
            />
          </div>
          <div className="voucher-form-group">
            <label>Is Copy Description</label>
            <input
              type="checkbox"
              placeholder="Description"
              name="isCopyDescription"
              value={true}
              onChange={handleInputChange}
              className="voucher-popup-checkbox"
            />
          </div>
        </div>
        <div className="voucher-button-row">
          <button className="voucher-save-btn" onClick={handleSave}>
            Add Voucher
          </button>
        </div>
        <button className="voucher-close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};
export default AddVoucherPopup;
