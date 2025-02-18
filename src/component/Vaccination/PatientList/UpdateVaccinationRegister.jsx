import React, { useState, useEffect } from "react";
import "./UpdateVaccination.css";
import { API_BASE_URL } from "../../api/api";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import { toast } from "react-toastify";

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
        toast.success("Successfully updated")
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error is ocured")
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
            <FloatingInput
            label={"Mother Name *"}
            type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              placeholder="Mother Name"
              required/>
            
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <FloatingInput
            label={"Baby Name"}
            type="text"
              name="babyName"
              value={formData.babyName}
              onChange={handleInputChange}
              placeholder="Baby Name"/>
           
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <FloatingInput
            label={"Age *"}
            type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                required/>
           
            <div className="UpdateVaccinationRegister__ageInput">
              <FloatingSelect
              label={"Age Unit"}
              name="ageUnit"
              value={formData.ageUnit}
              onChange={handleInputChange}
              options={[{value:"Days",label:"Days"},{value:"Months",label:"Months"},{value:"Years",label:"Years"},]}/>
              
            </div>
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <FloatingInput
            label={"Date Of Birth"}
             type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}/>
            
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <FloatingSelect
            label={"Gender *"}
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            options={[{value:"Male",label:"Male"},{value:"Female",label:"Female"}]}/>
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
            <FloatingSelect
            label={"Country *"}
            name="country"
              value={formData.country}
              onChange={handleInputChange}
              disabled
              options={[{value:"India",label:"India"}]}/>
            
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
          <FloatingSelect
  label={"State *"}
  name="state"
  value={formData.state}
  onChange={handleInputChange}
  options={[
    { value: "", label: "Select State" },
    ...indianStates.map((state) => ({
      value: state,
      label: state,
    })),
  ]}
/>
           
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
          <FloatingInput
            label={"Address"}
            type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"/>
           
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
          <FloatingInput
            label={"Father Name"}
            type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              placeholder="Father Name"/>
           
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
          <FloatingInput
            label={"Phone number"}
            type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone number"/>
           
           
          </div>
          <div className="UpdateVaccinationRegister__formGroup">
          <FloatingSelect
  label={"Religion"}
  name="religion"
  value={formData.religion}
  onChange={handleInputChange}
  options={[
    { value: "", label: "Select Religion" },
    ...castes.map((religion) => ({
      value: religion,
      label: religion,
    })),
  ]}
/>

         
          </div>
          <div className="UpdateVaccinationRegister__formActions">
            
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVaccinationRegister;
