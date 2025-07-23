import React, { useState } from "react";
import "./UpdateCoa.css";

const NewCoaPopup = ({ closeupdate, initialData }) => {
  const [coa, setCoa] = useState({
    primaryGroup: initialData.primaryGroup || "",
    coaName: initialData.coaName || "",
    description: initialData.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoa({
      ...coa,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving COA:", coa);
    // Add your logic to save the data, e.g., sending it to an API
    closeupdate();
  };

  return (
    <div className="uc-popup-overlay">
      <div className="uc-popup-content">
        <h2>Update Chart of Account</h2>
        <div className="uc-form-row">
          <div className="uc-form-group">
            <label>Primary Group</label>
            <select
              name="primaryGroup"
              value={coa.primaryGroup}
              onChange={handleInputChange}
              className="uc-popup-select"
            >
              <option value="Revenue">Revenue</option>
              <option value="Expenses">Expenses</option>
              <option value="Assets">Assets</option>
              <option value="Liabilities">Liabilities</option>
            </select>
          </div>
          <div className="uc-form-group">
            <label>COA Name</label>
            <input
              type="text"
              name="coaName"
              value={coa.coaName}
              onChange={handleInputChange}
              placeholder="COA Name"
              className="uc-popup-input"
            />
          </div>
          <div className="uc-form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={coa.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="uc-popup-input"
            />
          </div>
        </div>
        <div className="uc-button-row">
          <button className="uc-save-btn" onClick={handleSave}>
            Update COA
          </button>
        </div>
        <button className="uc-close-btn" onClick={closeupdate}>
          X
        </button>
      </div>
    </div>
  );
};

export default NewCoaPopup;
