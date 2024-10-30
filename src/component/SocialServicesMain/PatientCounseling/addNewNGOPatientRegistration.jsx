/* Ajhar Tamboli addNewNGOPatientRegistration.jsx 07-10-24 */

import React, { useState } from 'react';
import "./addNewNGOPatientRegistration.css";

const AddNewNGOPatientRegistration = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientID: "",
    patientName: "",
    age: "",
    gender: "",
    contactNumber: "",
    department: "",
    disease: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    console.log("Form Data: ", formData);
    onSubmit(formData);
    onClose();

  };

  return (
    <div className="addNewNGOPatientRegistration-container">
      <div className="addNewNGOPatientRegistration-header">
        <h3>Add New NGO Patient Registration</h3>
        <button className="addNewNGOPatientRegistration-close-btn" onClick={onClose}>x</button>
      </div>

      <div className="addNewNGOPatientRegistration-form">
        <div className="addNewNGOPatientRegistration-form-row">
          <div className="addNewNGOPatientRegistration-form-group-1row">
            <div className="addNewNGOPatientRegistration-form-group">
              <label>Patient ID<span>*</span></label>
              <input
                type="text"
                placeholder="Enter Patient ID"
                name="patientID"
                value={formData.patientID}
                onChange={handleInputChange}
              />
            </div>
            <div className="addNewNGOPatientRegistration-form-group">
              <label>Patient Name<span>*</span></label>
              <input
                type="text"
                placeholder="Enter Patient Name"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="addNewNGOPatientRegistration-form-group-1row">
            <div className="addNewNGOPatientRegistration-form-group">
              <label>Age</label>
              <input
                type="text"
                placeholder="Enter Patient Age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="addNewNGOPatientRegistration-form-group">
              <label>Gender<span>*</span></label>
              <input
                type="text"
                placeholder="Enter Patient Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="addNewNGOPatientRegistration-form-group-1row">
            <div className="addNewNGOPatientRegistration-form-group">
              <label>Contact Number</label>
              <input
                type="text"
                placeholder="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="addNewNGOPatientRegistration-form-group">
              <label>Department<span>*</span></label>
              <input
                type="text"
                placeholder="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="addNewNGOPatientRegistration-form-group-1row">
            <div className="addNewNGOPatientRegistration-form-group">
              <label>Disease</label>
              <input
                type="text"
                placeholder="Enter Patient Disease"
                name="disease"
                value={formData.disease}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="addNewNGOPatientRegistration-form-actions">
        <button className="addNewNGOPatientRegistration-add-btn" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default AddNewNGOPatientRegistration;
