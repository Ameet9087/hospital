import React, { useState, useEffect } from "react";
import axios from "axios";
import "../SocialServicesMain/registerNewSSUPatient.css";

function RegisterNewSSUPatient({ togglePopup, patientData = null }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    fatherName: "",
    motherName: "",
    country: "india",
    age: "",
    ageUnit: "Years",
    gender: "",
    address: "",
    religion: "",
    phoneNumber: "",
    race: "",
    maritalStatus: "",
    targetGroup: "",
    community: "",
    membership: "",
    hasTargetGroupCertificate: false,
    targetGroupCertificateType: "",
    certificateNo: "",
    incomeSource: "",
    financialStatus: "",
  });

  useEffect(() => {
    if (patientData) {
      setFormData({
        ...patientData,
        hasTargetGroupCertificate:
          patientData.hasTargetGroupCertificate || false,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (patientData) {
        // Update existing patient
        const response = await axios.put(
          `http://localhost:1415/api/patients/${patientData.id}`,
          formData
        );
        console.log("Update Response:", response.data);
      } else {
        // Register new patient
        const response = await axios.post(
          "http://localhost:1415/api/patients/register",
          formData
        );
        console.log("Create Response:", response.data);
      }
      togglePopup();
      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      // Handle error (e.g., show an error message)
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
            <label>
              First Name*:{" "}
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </label>
            <label>
              Father Name:{" "}
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father Name"
              />
            </label>
          </div>
          <div className="registerNewSSUPatient-form-row">
            <label>
              Middle Name:{" "}
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle Name"
              />
            </label>
            <label>
              Mother Name:{" "}
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Mother Name"
              />
            </label>
          </div>
          <div className="registerNewSSUPatient-form-row">
            <label>
              Last Name*:{" "}
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </label>
            <label>
              Country*:
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="Kenya">Kenya</option>
              </select>
            </label>
          </div>
          <div className="registerNewSSUPatient-form-row">
            <label>
              Age*:
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="register-new-age-input"
              />
              <select
                name="ageUnit"
                value={formData.ageUnit}
                onChange={handleChange}
              >
                <option>Years</option>
              </select>
            </label>
            <label>
              Address:{" "}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
              />
            </label>
          </div>
          <div className="registerNewSSUPatient-form-row">
            <label>
              Gender*:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">--select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Religion:
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              >
                <option value="">--select--</option>
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div className="registerNewSSUPatient-form-row">
            <label>
              Phone number:{" "}
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="phone number"
              />
            </label>
            <label>
              Race:{" "}
              <input
                type="text"
                name="race"
                value={formData.race}
                onChange={handleChange}
                placeholder="race"
              />
            </label>
          </div>
          <div className="registerNewSSUPatient-form-row">
            <label>
              Marital status:
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">--select--</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
              </select>
            </label>
          </div>
        </div>

        <div className="registerNewSSUPatient-section">
          <h3>SSU Information</h3>
          <div className="registerNewSSUPatient-form-row">
            <label>
              Target Group*:
              <select
                name="targetGroup"
                value={formData.targetGroup}
                onChange={handleChange}
              >
                <option value="">Choose Target Group</option>
                <option value="Poor/Ultra Poor">Poor/Ultra Poor</option>
                <option value="Helpless">Helpless</option>
                <option value="Disability">Disability</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="Victim of Gender Violence">
                  Victim of Gender Violence
                </option>
              </select>
            </label>
            <label>
              Community*:
              <select
                name="community"
                value={formData.community}
                onChange={handleChange}
              >
                <option value="">--select--</option>
                <option value="Community 1">Community 1</option>
                <option value="Community 2">Community 2</option>
              </select>
            </label>
            <label>
              Membership*:
              <select
                name="membership"
                value={formData.membership}
                onChange={handleChange}
              >
                <option value="">--select--</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
              </select>
            </label>
          </div>
          <div className="registerNewSSUPatient-form-row">
            <label>
              Has Target Group Certificate?
              <select
                name="hasTargetGroupCertificate"
                value={formData.hasTargetGroupCertificate}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          </div>
          <div className="registerNewSSUPatient-form-row">
            <label>
              Income Source:
              <select
                name="incomeSource"
                value={formData.incomeSource}
                onChange={handleChange}
              >
                <option value="">--Select Income Source--</option>
                <option value="Unskilled Labour in Agriculture or Other">
                  Unskilled Labour in Agriculture or Other
                </option>
                <option value="Skilled Labour in Agriculture or Other">
                  Skilled Labour in Agriculture or Other
                </option>
                <option value="Agriculture/Farming">
                  Private Sector/Government Sector
                </option>
                <option value="Foreign employment in Malaysia or UAE">
                  Foreign employment in Malaysia or UAE
                </option>
                <option value="Others">Others</option>
              </select>
            </label>
            <label>
              Financial Status:
              <select
                name="financialStatus"
                value={formData.financialStatus}
                onChange={handleChange}
              >
                <option value="">--Select Status--</option>
                <option value="Poor">Poor</option>
                <option value="Ultra Poor">Ultra Poor</option>
                <option value="Not Poor">Not Poor</option>
              </select>
            </label>
          </div>
        </div>

        <div className="registerNewSSUPatient-form-actions">
          <button type="submit" className="registerNewSSUPatient-register-btn">
            {patientData ? "Update" : "Register"}
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
