import React, { useState, useEffect } from "react";
import axios from "axios";
import "../SocialServicesMain/registerNewSSUPatient.css";
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

function RegisterNewSSUPatient({ togglePopup, patientData = null }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    fatherName: "",
    motherName: "",
    country: "",
    age: "",
    gender: "",
    address: "",
    religion: "",
    phoneNumber: "",
    race: "",
    maritalStatus: "",
    ssus: [
      {
        targetGroup: "",
        community: "",
        membership: "",
        hasTargetGroupCertificate: false,
        targetGroupCertificateType: "",
        certificateNo: "",
        incomeSource: "",
        financialStatus: "",
      },
    ],
  });

  useEffect(() => {
    if (patientData) {
      setFormData({
        ...patientData,
        ssus: patientData.ssus || [
          {
            targetGroup: "",
            community: "",
            membership: "",
            hasTargetGroupCertificate: false,
            targetGroupCertificateType: "",
            certificateNo: "",
            incomeSource: "",
            financialStatus: "",
          },
        ],
      });
    }
  }, [patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSsuChange = (index, field, value) => {
    const updatedSsus = [...formData.ssus];
    updatedSsus[index][field] = value;
    setFormData({
      ...formData,
      ssus: updatedSsus,
    });
  };

  const addSsu = () => {
    setFormData({
      ...formData,
      ssus: [
        ...formData.ssus,
        {
          targetGroup: "",
          community: "",
          membership: "",
          hasTargetGroupCertificate: false,
          targetGroupCertificateType: "",
          certificateNo: "",
          incomeSource: "",
          financialStatus: "",
        },
      ],
    });
  };

  const removeSsu = (index) => {
    const updatedSsus = formData.ssus.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      ssus: updatedSsus,
    });
  };
  const handleClear = () => {
    setFormData({
      firstName: "",
      fatherName: "",
      middleName: "",
      motherName: "",
      lastName: "",
      country: "",
      age: "",
      address: "",
      gender: "",
      religion: "",
      phoneNumber: "",
      race: "",
      maritalStatus: "",
      hasTargetGroupCertificate: "",
      incomeSource: "",
      financialStatus: "",
      ssus: [
        {
          targetGroup: "",
          community: "",
          membership: "",
        },
      ],
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (patientData) {
        // Update existing patient
        const response = await axios.put(
          `${API_BASE_URL}/social-patients/${patientData.socialPatientId}`,
          formData
        );
        console.log("Update Response:", response.data);
        toast.success("Updated Successfully");
      } else {
        // Register new patient
        const response = await axios.post(
          `${API_BASE_URL}/social-patients`,
          formData
        );
        console.log("Create Response:", response.data);
        toast.success("Submited Successfully");
      }
      togglePopup();
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      toast.error("Error for Submiting form!");
    }
  };

  return (
    <div className="registerNewSSUPatient-patient-registration">
      <h2>
        {patientData ? "Update SSU Patient" : "New SSU Patient Registration"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="registerNewSSUPatient-section">
          <h3>Patient Information</h3>
          <div className="registerNewSSUPatient-form-row">
            <FloatingInput
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  // Allow only letters and spaces
                  handleChange(e);
                }
              }}
            />

            <FloatingInput
              label={"Father Name"}
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  // Allow only letters and spaces
                  handleChange(e);
                }
              }}
            />
            <FloatingInput
              label={"Middle Name"}
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  // Allow only letters and spaces
                  handleChange(e);
                }
              }}
            />

            <FloatingInput
              label={"Mother Name"}
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  // Allow only letters and spaces
                  handleChange(e);
                }
              }}
            />
          </div>

          <div className="registerNewSSUPatient-form-row">
            <FloatingInput
              label={"Last Name"}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  // Allow only letters and spaces
                  handleChange(e);
                }
              }}
            />

            <FloatingSelect
              label={"country"}
              name="country"
              value={formData.country}
              onChange={handleChange}
              options={[
                { label: "India", value: "India" },
                { label: "Kenya", value: "Kenya" },
                { label: "United States", value: "United States" },
              ]}
            />
            <FloatingInput
              label={"Age"}
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />

            <FloatingInput
              label={"Address"}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="registerNewSSUPatient-form-row">
            <FloatingSelect
              label={"Gender"}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
            />

            <FloatingSelect
              label={"Religion"}
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              options={[
                { label: "Hinduism", value: "Hinduism" },
                { label: "Christianity", value: "Christianity" },
                { label: "Islam", value: "Islam" },
                { label: "Other", value: "Other" },
              ]}
            />
            <FloatingInput
              label="Phone Number"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  // Allows only digits and limits to 10 characters
                  handleChange(e);
                }
              }}
            />

            <FloatingInput
              label={"Race"}
              type="text"
              name="race"
              value={formData.race}
              onChange={handleChange}
            />
          </div>

          <div className="registerNewSSUPatient-form-row-single">
            <FloatingSelect
              label={"Marital status"}
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              options={[
                { label: "Single", value: "Single" },
                { label: "Married", value: "Married" },
                { label: "Widowed", value: "Widowed" },
              ]}
            />
          </div>
        </div>

        <div className="registerNewSSUPatient-section">
          <h3>SSU Information</h3>
          {formData.ssus.map((ssu, index) => (
            <div key={index} className="registerNewSSUPatient-ssu">
              <div className="registerNewSSUPatient-form-row">
                <FloatingSelect
                  label="Target Group"
                  value={ssu.targetGroup}
                  onChange={(e) =>
                    handleSsuChange(index, "targetGroup", e.target.value)
                  }
                  options={[
                    { label: "Poor/Ultra Poor", value: "Poor/Ultra Poor" },
                    { label: "Helpless", value: "Helpless" },
                    { label: "Disability", value: "Disability" },
                  ]}
                />
                <FloatingInput
                  label="Community"
                  type="text"
                  value={ssu.community}
                  onChange={(e) =>
                    handleSsuChange(index, "community", e.target.value)
                  }
                />
                <FloatingInput
                  label="Membership"
                  type="text"
                  value={ssu.membership}
                  onChange={(e) =>
                    handleSsuChange(index, "membership", e.target.value)
                  }
                />
                <FloatingSelect
                  label="Has Target Group Certificate?"
                  name="hasTargetGroupCertificate"
                  value={formData.hasTargetGroupCertificate}
                  onChange={handleChange}
                  options={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                />
              </div>
              <div className="registerNewSSUPatient-form-row-income">
                <FloatingSelect
                  label="Income Source"
                  name="incomeSource"
                  value={formData.incomeSource}
                  onChange={handleChange}
                  options={[
                    { label: "--Select Income Source--", value: "" },
                    {
                      label: "Unskilled Labour in Agriculture or Other",
                      value: "Unskilled Labour in Agriculture or Other",
                    },
                    {
                      label: "Skilled Labour in Agriculture or Other",
                      value: "Skilled Labour in Agriculture or Other",
                    },
                    {
                      label: "Private Sector/Government Sector",
                      value: "Agriculture/Farming",
                    },
                    {
                      label: "Foreign employment in Malaysia or UAE",
                      value: "Foreign employment in Malaysia or UAE",
                    },
                    { label: "Others", value: "Others" },
                  ]}
                />
                <FloatingSelect
                  label="Financial Status"
                  name="financialStatus"
                  value={formData.financialStatus}
                  onChange={handleChange}
                  options={[
                    { label: "--Select Status--", value: "" },
                    { label: "Poor", value: "Poor" },
                    { label: "Ultra Poor", value: "Ultra Poor" },
                    { label: "Not Poor", value: "Not Poor" },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="registerNewSSUPatient-form-actions">
          <button type="submit" className="registerNewSSUPatient-register-btn">
            {patientData ? "Update" : "Register"}
          </button>
          <button className="registerNewSSUPatient-register-btn" type="button" onClick={handleClear}>
          Reset
          </button>
          <button
            type="button"
            onClick={togglePopup}
            className="registerNewSSUPatient-close-btn"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterNewSSUPatient;
