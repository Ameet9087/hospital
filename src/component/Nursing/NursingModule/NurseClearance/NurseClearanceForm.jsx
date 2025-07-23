import React, { useState } from "react";
import "./NurseClearanceForm.css";
import { API_BASE_URL } from "../../../api/api";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const FloatingInput = ({ label, type = "text", value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  return (
    <div
      className={`NurseClearanceForm-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="NurseClearanceForm-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={props.onChange}
        {...props}
      />
      <label className="NurseClearanceForm-floating-label">{label}</label>
    </div>
  );
};

const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  return (
    <div
      className={`NurseClearanceForm-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="NurseClearanceForm-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={props.onChange}
        {...props}
      >
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="NurseClearanceForm-floating-label">{label}</label>
    </div>
  );
};

const NurseClearanceForm = ({ patient, setDischargePopup }) => {
  const [formData, setFormData] = useState({
    medicinesReturnedPharmacy: false,
    dischargeMedicinesIndented: false,
    roomInventoryChecked: false,
    idBandRemoved: false,
    centrelineCannulaRemoved: false,
    anyDrainRemoved: false,
    dressingDone: false,
    patientEducationGiven: false,
    accompanied: {
      parents: false,
      relative: false,
      friend: false,
      otherSpecify: "",
      name: "",
      contactNo: "",
      declaredDead: "",
    },
    dischargeDetails: {
      dischargeTrackingEntered: "",
      dischargedTo: "",
      specify: "",
      billsSettled: "",
      remarks: "",
    },
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      const [mainKey, subKey] = name.split(".");
      if (subKey) {
        return {
          ...prev,
          [mainKey]: { ...prev[mainKey], [subKey]: fieldValue },
        };
      }
      return { ...prev, [name]: fieldValue };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      medicinesReturnedPharmacy: formData.medicinesReturnedPharmacy
        ? "Yes"
        : "No",
      dischargeMedicinesIndented: formData.dischargeMedicinesIndented
        ? "Yes"
        : "No",
      roomInventoryChecked: formData.roomInventoryChecked ? "Yes" : "No",
      idBandRemoved: formData.idBandRemoved ? "Yes" : "No",
      centrelineCannulaRemoved: formData.centrelineCannulaRemoved
        ? "Yes"
        : "No",
      anyDrainRemoved: formData.anyDrainRemoved ? "Yes" : "No",
      dressingDone: formData.dressingDone ? "Yes" : "No",
      patientEducationGiven: formData.patientEducationGiven ? "Yes" : "No",
      accompanied: {
        parents: formData.accompanied.parents ? "Yes" : "No",
        relative: formData.accompanied.relative ? "Yes" : "No",
        friend: formData.accompanied.friend ? "Yes" : "No",
        otherSpecify: formData.accompanied.otherSpecify,
        name: formData.accompanied.name,
        contactNo: formData.accompanied.contactNo,
        declaredDead: formData.accompanied.declaredDead,
      },
      dischargeDetails: {
        dischargeTrackingEntered:
          formData.dischargeDetails.dischargeTrackingEntered,
        dischargedTo: formData.dischargeDetails.dischargedTo,
        specify: formData.dischargeDetails.specify,
        billsSettled: formData.dischargeDetails.billsSettled,
        remarks: formData.dischargeDetails.remarks,
      },
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/discharge-intimations/${patient?.disId}/nurse-clearance`,
        submissionData
      );

      console.log("Form submission success:");
      setDischargePopup(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };
  return (
    <>
      <div className="NurseClearanceForm-container">
        <div className="nurseClearanceForm-title-bar">
          <div className="nurseClearanceForm-header">
            <span>Nurse Clearance Form</span>
          </div>
        </div>
        <div className="NurseClearanceForm-section">
          <div className="NurseClearanceForm-header">Operation Details</div>
          <div className="NurseClearanceForm-grid">
            <div className="NurseClearanceForm-search-field">
              <FloatingInput
                label={"UHID"}
                value={patient?.ipAdmissionDto?.patient?.patient?.uhid}
                type="text"
                name="uhid"
              />
            </div>
            <FloatingInput
              label="IPNo"
              value={patient?.ipAdmissionDto?.patient?.inPatientId}
              name="ipNo"
              onChange={handleChange}
            />
            <FloatingInput
              label="Patient Name"
              value={`${patient?.ipAdmissionDto?.patient?.patient?.firstName} ${patient?.ipAdmissionDto?.patient?.patient?.lastName}`}
              readOnly
            />
            <FloatingInput
              label="Age"
              value={patient?.ipAdmissionDto?.patient?.patient?.age}
              name="age"
              onChange={handleChange}
            />
            <FloatingInput
              label="Sex"
              type="text"
              name="sex"
              value={patient?.ipAdmissionDto?.patient?.patient?.gender}
            />
            <FloatingInput
              label="Relative Name"
              value={patient?.ipAdmissionDto?.patient?.patient?.relationName}
              type="text"
            />
            <FloatingInput
              label="Address"
              type="text"
              name="Address"
              value={patient?.ipAdmissionDto?.patient?.patient?.address}
            />
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="medicinesReturnedPharmacy"
                value={formData.medicinesReturnedPharmacy}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Medicines Returned Pharmacy
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="dischargeMedicinesIndented"
                value={formData.dischargeMedicinesIndented}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Discharge Medicines Indented
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="roomInventoryChecked"
                value={formData.roomInventoryChecked}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Room Inventory Checked
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="idBandRemoved"
                value={formData.idBandRemoved}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                ID Band Removed
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="centrelineCannulaRemoved"
                value={formData.centrelineCannulaRemoved}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Centreline- Cannula Remove
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input type="checkbox" id="allowMultiple" name="" />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Folleys Catheter Removed
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="anyDrainRemoved"
                value={formData.anyDrainRemoved}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Any Drain Removed
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="dressingDone"
                value={formData.dressingDone}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Dressing Done
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="patientEducationGiven"
                value={formData.patientEducationGiven}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Patient Education Given
              </label>
            </div>
          </div>
        </div>
        <div className="NurseClearanceForm-section">
          <div className="NurseClearanceForm-header">Accompanied</div>
          <div className="NurseClearanceForm-grid">
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="accompanied.parents"
                value={formData.accompanied.parents}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Parents
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="accompanied.relative"
                value={formData.accompanied.relative}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Relative
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="accompanied.friend"
                value={formData.accompanied.friend}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Friend
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="accompanied.otherSpecify"
                value={formData.accompanied.otherSpecify}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Other Specify
              </label>
            </div>

            <FloatingInput
              label="Name"
              name="accompanied.name"
              value={formData.accompanied.name}
              onChange={handleChange}
            />
            <FloatingInput
              label="Contact No"
              name="accompanied.contactNo"
              value={formData.accompanied.contactNo}
              onChange={handleChange}
            />
            <FloatingSelect
              label="Declared Dead"
              name="accompanied.declaredDead"
              value={formData.accompanied.declaredDead}
              onChange={handleChange}
              options={[
                { value: "", label: "Select" },
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </div>
        </div>
        <div className="NurseClearanceForm-section">
          <div className="NurseClearanceForm-header">Final Discharge</div>
          <div className="NurseClearanceForm-grid">
            <FloatingSelect
              label="Discharge Tracking Entered:"
              name="dischargeDetails.dischargeTrackingEntered"
              value={formData.dischargeDetails.dischargeTrackingEntered}
              options={[
                { value: "", label: "Select" },
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />

            <div className="billing-ipBilling-form-row-chechbox">
              <label htmlFor="">Discharged to : </label>
              <input
                type="checkbox"
                id="allowMultiple"
                name="Home"
                value={formData.dischargedTo}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Home
              </label>
            </div>
            <div className="billing-ipBilling-form-row-chechbox">
              <input
                type="checkbox"
                id="allowMultiple"
                name="Other"
                value={formData.dischargedTo}
                onChange={handleChange}
              />
              <label
                htmlFor="allowMultiple"
                className="iPBilling-checkbox-label"
              >
                Other
              </label>
            </div>

            <FloatingInput label="specify" />
            <FloatingSelect
              label="Bills Settles"
              name="dischargeDetails.specify"
              options={[
                { value: "", label: "Select" },
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={formData.dischargeDetails.specify}
              onChange={handleChange}
            />
            <FloatingInput
              label=" Remarks"
              name="dischargeDetails.remarks"
              value={formData.dischargeDetails.remarks}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="nurseClearance-Form">
        <div className="nurseClearanceForm-action-buttons">
          <button className="btn-blue" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};
export default NurseClearanceForm;
// AjharTamboli 20-11-24 nurseClearanceForm.jsx
