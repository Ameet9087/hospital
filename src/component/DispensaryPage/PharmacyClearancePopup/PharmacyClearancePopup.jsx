import React, { useState, useRef, useEffect } from "react";
import './PharmacyClearancePopup.css';
import axios from "axios";
import { API_BASE_URL } from "../../api/api";


const FloatingInput = ({ label, type = "text", value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={`PharmacyClearance-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="PharmacyClearance-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="PharmacyClearance-floating-label">{label}</label>
    </div>
  );
};
const   PharmacyClearancePopup = ({patient}) => {

  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    patientClearanceDues:"",
    implant:"",
    noReturns:""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
        patientClearanceDues: formData.patientClearanceDues, 
        implant: formData.implant,  
        noReturns: formData.noReturns, 
    };
    try {
      const response = await fetch(`${API_BASE_URL}/discharge-intimations/${patient?.disId}/pharmacy-clearance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      const result = await response.json();
      console.log("Form submission success:", result);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };
  return (
    <>
      <div className="PharmacyClearance-container">
        <div className="PharmacyClearance-section">
          <div className="PharmacyClearance-header">Pharmacy Clearance</div>
          <div className="PharmacyClearance-grid">
            <div className="PharmacyClearance-search-field">
              <FloatingInput
                label="MRNO"
                type="text"
                name="uhid"
                value={patient?.ipAdmissionDto?.patient?.patient?.uhid}
              />
            </div>
            <FloatingInput label="IPNo" value={patient?.ipAdmissionDto?.patient?.inPatientId} name="ipNo" />
            <FloatingInput
              label="Patient Name"
              value={`${patient?.ipAdmissionDto?.patient?.patient?.firstName} ${patient?.ipAdmissionDto?.patient?.patient?.lastName}`}
              readOnly
            />
            <FloatingInput label="DOA" value={patient?.ipAdmissionDto?.admissionDate} name="doa"/>
            <FloatingInput label="Ward" value={patient?.ipAdmissionDto?.roomDetails?.roomDTO?.roomNumber} name="ward"/>
            
            <FloatingInput label="Address" value={patient?.ipAdmissionDto?.patient?.patient?.address} name="address"
            readOnly/>  
            <div className="PharmacyClearance-checkboxes">
    <label className="PharmacyClearance-checkboxes-label">
    <input
      type="checkbox"
      name="patientClearanceDues"
      checked={formData.patientClearanceDues}
      onChange={handleChange}
    />
    Patient Clearance Dues
  </label>
    <label className="PharmacyClearance-checkboxes-label">
    <input
      type="checkbox"
      name="implant"
      checked={formData.implant}
      onChange={handleChange}
    />
    Implant
  </label>
    <label className="PharmacyClearance-checkboxes-label">
    <input
      type="checkbox"
      name="noReturns"
      checked={formData.noReturns}
      onChange={handleChange}
    />
    No Returns 
  </label>
</div>
          
            
          </div>
        </div>
      </div>
     
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
      <div className="PharmacyClearance-buttons">
        <button className="btn-blue" onClick={handleSubmit}>Save</button>
      </div>
    </>
  );
};

export default PharmacyClearancePopup;
