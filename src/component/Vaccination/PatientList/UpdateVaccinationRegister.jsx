import React, { useState, useEffect } from "react";
import "./UpdateVaccination.css";
import { API_BASE_URL } from "../../api/api";

// Indian states and castes for selection
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const castes = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist"];

const UpdateVaccinationRegister = ({ patient, onClose }) => {
  const [formData, setFormData] = useState({
    motherName: "",
    babyName: "",
    age: "",
    ageUnit: "Days",
    dateOfBirth: "",
    gender: "Male",
    country: "India",
    state: "",
    address: "",
    fatherName: "",
    phoneNumber: "",
    religion: "Hindu",
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        motherName: patient.motherName || "",
        babyName: patient.babyName || "",
        age: patient.age || "",
        ageUnit: patient.ageUnit || "Days",
        dateOfBirth: patient.dateOfBirth || "",
        gender: patient.gender || "Male",
        country: patient.country || "India",
        state: patient.state || "",
        address: patient.address || "",
        fatherName: patient.fatherName || "",
        phoneNumber: patient.phoneNumber || "",
        religion: patient.religion || "Hindu",
      });
    }
  }, [patient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { vaccRegdNo, ...updatedData } = formData;
    fetch(`${API_BASE_URL}/vaccination/${patient?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="UpdateVaccinationRegister__overlay">
      <div className="UpdateVaccinationRegister__popup">
        <div className="UpdateVaccinationRegister__header">
          <h2>Update Vaccination Patient Register</h2>
          <button
            onClick={onClose}
            className="UpdateVaccinationRegister__closeButton"
          >
            X
          </button>
        </div>
        <form
          className="UpdateVaccinationRegister__form"
          onSubmit={handleSubmit}
        >
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Mother Name*</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              placeholder="Mother Name"
              required
            />
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Baby Name</label>
            <input
              type="text"
              name="babyName"
              value={formData.babyName}
              onChange={handleInputChange}
              placeholder="Baby Name"
            />
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Age*</label>
            <div className="UpdateVaccinationRegister__ageInput">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                required
              />
              <select
                name="ageUnit"
                value={formData.ageUnit}
                onChange={handleInputChange}
              >
                <option>Days</option>
                <option>Months</option>
                <option>Years</option>
              </select>
            </div>
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Date Of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Gender*</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Country*</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              disabled
            >
              <option>India</option>
            </select>
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <label>State*</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
          </div>
          {/* <div className="UpdateVaccinationRegister__formGroup">
            <label>Vacc. Regd. No.*</label>
            <input
              type="text"
              name="vaccRegdNo"
              value={formData.vaccRegdNo}
              onChange={handleInputChange}
              placeholder="Vacc. Regd. No."
              required
            />
          </div> */}
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Father Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              placeholder="Father Name"
            />
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Phone number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone number"
            />
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <label>Religion</label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
            >
              {castes.map((caste) => (
                <option key={caste} value={caste}>
                  {caste}
                </option>
              ))}
            </select>
          </div>
          <div className="UpdateVaccinationRegister__formActions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVaccinationRegister;
