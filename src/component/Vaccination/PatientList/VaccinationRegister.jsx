import React, { useState } from "react";
import "./Vaccinationregister.css";
import { API_BASE_URL } from "../../api/api";

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

const casteData = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist"];

const VaccinationRegister = ({ onClose }) => {
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
    caste: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };

      if (name === "motherName" && prevState.babyName === "") {
        updatedFormData.babyName = `Baby of ${value}`;
      }

      if (name === "religion") {
        updatedFormData.caste = ""; // Reset caste when religion changes
      }

      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to the backend API
    fetch(`${API_BASE_URL}/vaccinations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        onClose(); // Close the popup on successful registration
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="vaccinationRegister__overlay">
      <div className="vaccinationRegister__popup">
        <div className="vaccinationRegister__header">
          <h2>Vaccination Patient Register</h2>
          <button
            onClick={onClose}
            className="vaccinationRegister__closeButton"
          >
            X
          </button>
        </div>
        <form className="vaccinationRegister__form" onSubmit={handleSubmit}>
          <div className="vaccinationRegister__formGroup">
            <label>Mother Name*</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              placeholder="Mother Name"
              required
            />
          </div>
          <div className="vaccinationRegister__formGroup">
            <label>Baby Name</label>
            <input
              type="text"
              name="babyName"
              value={formData.babyName}
              onChange={handleChange}
              placeholder="Baby Name"
            />
          </div>
          <div className="vaccinationRegister__formGroup">
            <label>Age*</label>
            <div className="vaccinationRegister__ageInput">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="1"
                required
              />
              <select
                name="ageUnit"
                value={formData.ageUnit}
                onChange={handleChange}
              >
                <option>Days</option>
                <option>Months</option>
                <option>Years</option>
              </select>
            </div>
          </div>
          <div className="vaccinationRegister__formGroup">
            <label>Date Of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="vaccinationRegister__formGroup">
            <label>Gender*</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="vaccinationRegister__formGroup">
            <label>Country*</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              disabled
            >
              <option>India</option>
            </select>
          </div>
          <div className="vaccinationRegister__formGroup">
            <label>State*</label>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="vaccinationRegister__formGroup">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
          {/* <div className="vaccinationRegister__formGroup">
            <label>Vacc. Regd. No.*</label>
            <input
              type="text"
              name="vaccRegdNo"
              value={formData.vaccRegdNo}
              onChange={handleChange}
              placeholder="1"
              required
            />
          </div> */}
          <div className="vaccinationRegister__formGroup">
            <label>Father Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Father Name"
            />
          </div>
          <div className="vaccinationRegister__formGroup">
            <label>Phone number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
            />
          </div>
          <div className="vaccinationRegister__formGroup">
            <label>Religion</label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            >
              {casteData?.map((religion) => (
                <option key={religion} value={religion}>
                  {religion}
                </option>
              ))}
            </select>
          </div>
          <div className="vaccinationRegister__formActions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Register</button>
          </div>
        </form>
        {/* <p className="vaccinationRegister__note">
          Note: 'Register' will also create a new Visit for this patient in
          IMMUNIZATION Department.
        </p> */}
      </div>
    </div>
  );
};

export default VaccinationRegister;
