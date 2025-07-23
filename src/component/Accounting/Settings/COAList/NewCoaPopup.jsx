import React, { useState } from "react";
import "./CreateCoa.css";

const NewCoaPopup = ({ onClose }) => {
  const [coa, setCoa] = useState([
    {
      primaryGroup: "",
      coaName: "",
      description: "",
    },
  ]);

  const handleSave = () => {
    console.log("Saving ledgers:", ledgers);
    onClose();
  };

  const handleInputChange = (e) => {
    setCoa(e.target.value);
  };

  return (
    <div className="cc-popup-overlay">
      <div className="cc-popup-content">
        <h2>Create COA</h2>
        <div className="cc-form-row">
          <div className="cc-form-group">
            <label>Primary Group</label>
            <select value={coa.primaryGroup} onChange={handleInputChange}>
              <option value="Revenue">Revenue</option>
              <option value="Expenses">Expenses</option>
              <option value="Assets">Assets</option>
              <option value="Liabilities">Liabilities</option>
            </select>
          </div>
          <div className="cc-form-group">
            <label>COA Name</label>

            <input
              type="text"
              placeholder="COAName"
              name="coaName"
              onChange={handleInputChange}
              className="cc-popup-input"
            />
          </div>
          <div className="cc-form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleInputChange}
              className="cc-popup-input"
            />
          </div>
        </div>
        <div className="cc-button-row">
          <button className="cc-save-btn" onClick={handleSave}>
            Save COA
          </button>
        </div>
        <button className="cc-close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};
export default NewCoaPopup;
