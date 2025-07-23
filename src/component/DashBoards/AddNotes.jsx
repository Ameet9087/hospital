import React from 'react';
import './AddNotes.css';

const FormComponent = ({ onBack }) => {  // Receive the onBack prop
  return (
    <div className="form-component__form-container">
      <button className="form-component__view-notes-button" onClick={onBack}>
        View Notes
      </button>
      <div className="form-component__form-grid">
        <div className="form-component__form-group">
          <label>Primary Doctor :</label>
          <input type="text" value="Dr. VICTOR OCHIENG OKECH" readOnly />
        </div>
        <div className="form-component__form-group">
          <label>Secondary Doctor :</label>
          <input type="text" placeholder="Doctor Name" />
        </div>
        <div className="form-component__form-group">
          <label>Note Type :</label>
          <select>
            <option>Select Note Type</option>
          </select>
        </div>
        <div className="form-component__form-group">
          <label>Written By :</label>
          <input type="text" value="admin admin" readOnly />
        </div>
        <div className="form-component__form-group">
          <label>Date/Time :</label>
          <input type="date" value="2024-09-02" />
        </div>
        <div className="form-component__form-group">
          <label>Template :</label>
          <select>
            <option>Select Template</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
