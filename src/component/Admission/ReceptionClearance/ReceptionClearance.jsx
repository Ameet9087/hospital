import React, { useState, useRef, useEffect } from "react";
import "./ReceptionClearance.css";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput } from "../../../FloatingInputs/index";

const ReceptionClearance = ({ patient, setActiveState }) => {
  const [formData, setFormData] = useState({
    billHasPrepared: "",
    billHasSettled: "",
    ipblocked: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        billHasPrepared: formData.billHasPrepared,
        billHasSettled: formData.billHasSettled,
        ipblocked: formData.ipblocked,
        status: "Done",
      };
      const response = await axios.post(
        `${API_BASE_URL}/discharge-intimations/${patient?.disId}/reception-clearance`,
        requestData
      );
      setActiveState("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="reception-clearance-container">
        <div className="reception-clearance-section">
          <div className="reception-clearance-header">Reception Clearance</div>
          <div className="reception-clearance-grid">
            <div className="reception-clearance-search-field">
              <FloatingInput
                label="MRNO"
                type="text"
                name="uhid"
                value={patient?.ipAdmissionDto?.patient?.patient?.uhid}
                onChange={handleChange}
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
              label="DOA"
              value={patient?.ipAdmissionDto?.admissionDate}
              name="doa"
              onChange={handleChange}
            />

            <FloatingInput
              label="Address"
              value={patient?.ipAdmissionDto?.patient?.patient?.address}
              name="address"
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="reception-clearance-checkboxes">
            <label className="reception-clearance-checkboxes-label">
              <input
                type="checkbox"
                name="billHasPrepared"
                checked={formData.billHasPrepared}
                onChange={handleChange}
              />
              Bill Has Prepared
            </label>
            <label className="reception-clearance-checkboxes-label">
              <input
                type="checkbox"
                name="billHasSettled"
                checked={formData.billHasSettled}
                onChange={handleChange}
              />
              Bill Has Settled
            </label>
            <label className="reception-clearance-checkboxes-label">
              <input
                type="checkbox"
                name="ipblocked"
                checked={formData.ipblocked}
                onChange={handleChange}
              />
              IP Blocked
            </label>
          </div>
        </div>
      </div>
      <div className="reception-clearance-buttons">
        <button onClick={handleSubmit} className="btn-blue">
          Save
        </button>
      </div>
    </>
  );
};

export default ReceptionClearance;
