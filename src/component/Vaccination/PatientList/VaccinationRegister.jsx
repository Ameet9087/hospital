import React, { useState } from "react";
import "./Vaccinationregister.css";
import { API_BASE_URL } from "../../api/api";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import { toast } from "react-toastify";

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
        toast.success("Add Successfully")
        onClose(); // Close the popup on successful registration
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Not Added Successfuly")
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
            <FloatingInput
            label={"Mother Name*"}
            type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              placeholder="Mother Name"
              required/>
          
          </div>
          <div className="vaccinationRegister__formGroup">
            <FloatingInput
            label={"Baby Name"}
            type="text"
              name="babyName"
              value={formData.babyName}
              onChange={handleChange}
              placeholder="Baby Name"/>
           
          </div>
          <div className="vaccinationRegister__formGroup">
            <FloatingInput
            label={"Age*"}
            type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="1"
                required/>
            
              <FloatingSelect
              label={"Age Unit"}
              name="ageUnit"
                value={formData.ageUnit}
                onChange={handleChange}
                options={[{value:"Days",label:"Days"},{value:"Months",label:"Months"},{value:"Years",label:"Years"},]}/>
              
            
          </div>
          <div className="vaccinationRegister__formGroup">
            <FloatingInput
            label={"Date Of Birth"}
            type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}/>
           
          </div>
          <div className="vaccinationRegister__formGroup">
            <FloatingSelect
            label={"Gender * "}
            name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[{value:"Male",label:"Male"},{value:"Female",label:"Female"}]}/>
            
          </div>
          <div className="vaccinationRegister__formGroup">
            <FloatingSelect
            label={" Country *"}
            name="country"
              value={formData.country}
              onChange={handleChange}
              disabled
              options={[{value:"India",label:"India"}]}/>
          
          </div>
          <div className="vaccinationRegister__formGroup">
          <FloatingSelect
  label={"State *"}
  name="state"
  value={formData.state}
  onChange={handleChange}
  options={[
    { value: "", label: "Select State" },
    ...indianStates.map((state) => ({
      value: state,
      label: state,
    })),
  ]}
/>

          </div>
          <div className="vaccinationRegister__formGroup">
            <FloatingInput
            label={"Address"}
            type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"/>
            
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
            <FloatingInput
            label={"Father Name"}
            type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Father Name"/>
            
          </div>
          <div className="vaccinationRegister__formGroup">
            <FloatingInput
            label={"Phone number"}
            type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"/>
            
          </div>
          <div className="vaccinationRegister__formGroup">
          <FloatingSelect
  label={"Religion"}
  name="religion"
  value={formData.religion}
  onChange={handleChange}
  options={[
    { value: "", label: "Select Religion" },
    ...casteData.map((religion) => ({
      value: religion,
      label: religion,
    })),
  ]}
/>

           
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
