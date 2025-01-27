import React, { useState, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import "./DischargeIntimationForm.css";
import PopupTable from "../Services/PopupTable";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";

const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };
  return (
    <div
      className={`DischargeIntimationForm-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <input
        type={type}
        className="DischargeIntimationForm-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="DischargeIntimationForm-floating-label">{label}</label>
    </div>
  );
};
const FloatingSelect = ({ label, options = [], ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div
      className={`DischargeIntimationForm-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <select
        className="DischargeIntimationForm-floating-select"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => setHasValue(e.target.value !== "")}
        {...props}
      >
        <option value="">{}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="DischargeIntimationForm-floating-label">{label}</label>
    </div>
  );
};

const DischargeIntimationForm = ({ ipAdmission }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    dischargeAdviceDate: "",
    dischargeAdviceTime: "",
    remark: "",
    pharmacyReturns: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ipAdmissionDto: {
        ipAdmmissionId: ipAdmission?.ipAdmmissionId,
      },
      disAdvisedDate: formData.dischargeAdviceDate,
      disAdvisedTime: formData.dischargeAdviceTime,
      remarks: formData.remark,
      pharmacyReturns: formData.pharmacyReturns,
      flag: "Pending",
    };

    try {
      console.log(requestData);

      const response = await axios.post(
        `${API_BASE_URL}/discharge-intimations`,
        requestData
      );
      alert("Form submitted successfully!");
      setFormData({
        dischargeAdviceDate: "",
        dischargeAdviceTime: "",
        remark: "",
        pharmacyReturns: "",
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form. Please check your data and try again.");
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
    <div className="DischargeIntimationForm-container">
      <div className="DischargeIntimationForm-section">
        <div className="DischargeIntimationForm-header">
          Discharge Intimation Form
        </div>
        <div className="DischargeIntimationForm-section">
          <div className="DischargeIntimationForm-grid">
            {/* IPNo Field with Popup */}
            <div className="DischargeIntimationForm-search-field">
              <FloatingInput
                label="IPNo"
                type="text"
                value={ipAdmission?.patient?.inPatientId}
              />
            </div>
            {/* Auto-filled Fields */}
            <FloatingInput
              label="Patient Name"
              type="text"
              name="patientName"
              value={
                ipAdmission?.patient?.patient?.firstName +
                  " " +
                  ipAdmission?.patient?.patient?.lastName || ""
              }
              readOnly
            />
            <FloatingInput
              label="Age"
              type="text"
              name="age"
              value={ipAdmission?.patient?.patient?.age}
              readOnly
            />
            <FloatingInput
              label="Consultant Doctor"
              type="text"
              name="consultantDoctor"
              value={
                ipAdmission?.admissionUnderDoctorDetail?.consultantDoctor
                  ?.doctorName
              }
              readOnly
            />
            <FloatingInput
              label="Room No"
              type="text"
              name="roomNo"
              value={ipAdmission?.roomDetails?.roomDTO?.roomNumber}
              readOnly
            />

            <FloatingInput
              label="Floor No"
              type="text"
              name="floorNo"
              value={ipAdmission?.roomDetails?.floorDTO?.floorNumber}
              readOnly
            />

            <FloatingInput
              label="Bed No"
              type="text"
              name="bedNo"
              value={ipAdmission?.roomDetails?.bedDTO?.bedNo}
              readOnly
            />

            <FloatingInput
              label="Discharge advice date"
              type="date"
              name="dischargeAdviceDate"
              value={formData.dischargeAdviceDate}
              onChange={handleChange}
            />

            <FloatingInput
              label="Discharge advice time"
              type="time"
              name="dischargeAdviceTime"
              value={formData.dischargeAdviceTime}
              onChange={handleChange}
            />

            <FloatingInput
              label="Remarks"
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
            />

            <FloatingInput
              label="Pharmacy return"
              type="text"
              name="pharmacyReturns"
              value={formData.pharmacyReturns}
              onChange={handleChange}
            />
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
      <div className="DischargeIntimationForm-buttons">
        <button className="btn-blue" onClick={handleSubmit}>
          Save
        </button>
        <button className="btn-red">Close</button>
      </div>
    </div>
  );
};

export default DischargeIntimationForm;
