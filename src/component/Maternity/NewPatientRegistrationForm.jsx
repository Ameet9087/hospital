import React, { useState, useEffect } from "react";
import "./NewPatientRegistrationForm.css";
import { API_BASE_URL } from "../api/api";
import { FloatingInput, FloatingSelect } from "../../FloatingInputs";

const NewPatientRegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    country: "Kenya",
    state: "",
    address: "",
    gender: "",
    age: "",
    ageUnit: "Years",
    husbandName: "",
    lastMenstruationDate: "",
    expectedDeliveryDate: "",
    patientHeight: "",
    patientWeight: "",
    obsHistory: "",
  });

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/inpatients/getAllPatients`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();

        console.log("Fetched Patient Data:prachi1", data); // Debugging log
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientSelect = (e) => {
    const patientId = e.target.value;
    setSelectedPatient(patientId);

    const selectedPatientData = patients.find(
      (patient) => String(patient.inPatientId) === String(patientId)
    );

    if (selectedPatientData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: selectedPatientData.patient?.firstName || "",
        middleName: selectedPatientData.patient?.middleName || "",
        lastName: selectedPatientData.patient?.lastName || "",
        contactNumber: selectedPatientData.patient?.contactNumber || "",
        address: selectedPatientData.patient?.address || "",
        gender: selectedPatientData.patient?.gender || "",
        age: selectedPatientData.patient?.age || "",
        country: selectedPatientData.patient?.country || "India",
        state: selectedPatientData.patient?.state || "",
        husbandName:
          selectedPatientData.patient?.maritalStatus === "Married"
            ? selectedPatientData.previousLastName || ""
            : "",
        bloodGroup: selectedPatientData.patient?.bloodGroup || "",
        email: selectedPatientData.patient?.email || "",
        obsHistory: selectedPatientData.patient?.occupation || "",
      }));
    } else {
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      firstDayOfMenstruation: formData.lastMenstruationDate,
      expectedDateOfDelivery: formData.expectedDeliveryDate,
      obsHistory: formData.obsHistory,
      husbandName: formData.husbandName,
      patientHeight: formData.patientHeight,
      patientWeight: formData.patientWeight,
      inPatientDTO: {
        inPatientId: selectedPatient,
      },
    };

    console.log("Data to Send:", JSON.stringify(dataToSend, null, 2)); // Logs formatted JSON data

    try {
      const response = await fetch(`${API_BASE_URL}/patients/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to register patient");
      }

      alert("Patient registered successfully");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering patient");
    }
  };

  return (
    <div
    // className="new-patient-regidter-modal new-patient-registration-modal"
    >
      <div className="new-patient-regidter-modal-modal-header">
        <h3>New Patient Registration</h3>
      </div>
      {/* <button className="new-patient-register-modal-close-btn" onClick={onClose}>
        ✖
      </button> */}

      <form
        className="new-patient-registration-form-container"
        onSubmit={handleSubmit}
      >
        <div className="new-patient-regidter-modal-section select-patient-section">
          <h4>Select Existing Patient</h4>
          <div className="new-patient-regidter-modal-form-row">
            <FloatingSelect
             label={"Patient Name"}
              value={selectedPatient}
              onChange={handlePatientSelect}
              options={[
                { value: "", label: "" },
                ...(Array.isArray(patients)
                  ? patients.map((patient) => ({
                      value: patient.inPatientId,
                      label: `${patient.patient?.firstName} ${patient.patient?.lastName}`,
                    }))
                  : []),
              ]}
            />
          </div>
        </div>

        <div className="new-patient-regidter-modal-section patient-information">
          <h4>Patient Information</h4>
          <div className="new-patient-regidter-modal-form-row">
            <FloatingInput
            label={"First Name"}
             type="text"
             name="firstName"
             placeholder="First Name"
             value={formData.firstName}
             onChange={handleChange}
            
            />
            <FloatingInput
            label={"Contact Number"}
             type="text"
             name="contactNumber"
             placeholder="Contact Number"
             value={formData.contactNumber}
             onChange={handleChange}
            
            />
          </div>
          <div className="new-patient-regidter-modal-form-row">
            <FloatingInput
            label={"Middle Name"}
             type="text"
             name="middleName"
             placeholder="Middle Name"
             value={formData.middleName}
             onChange={handleChange}
            />
            
            <FloatingSelect
  name="country"
  value={formData.country}
  onChange={handleChange}
  options={[
    { value: "", label: "Select a country" },
    { value: "Kenya", label: "Kenya" },
    { value: "United States", label: "United States" },
    { value: "China", label: "China" },
    { value: "India", label: "India" },
    { value: "Germany", label: "Germany" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "France", label: "France" },
    { value: "Japan", label: "Japan" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" },
    { value: "Brazil", label: "Brazil" }
  ]}
/>
          </div>


       
          <div className="new-patient-regidter-modal-form-row">
          <FloatingInput
       label={"Last Name"}
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
       
       />
            <label>State:</label>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Bihar">Bihar</option>
              <option value="Kerala">Kerala</option>
              <option value="Punjab">Punjab</option>
            </select>
          </div>

          <div className="new-patient-regidter-modal-form-row">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="new-patient-regidter-modal-form-row">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            <select
              name="ageUnit"
              value={formData.ageUnit}
              onChange={handleChange}
            >
              <option value="Years">Years</option>
              <option value="Months">Months</option>
            </select>
          </div>
        </div>

        <div className="new-patient-regidter-modal-section maternity-information">
          <h4>Maternity Information</h4>
          <div className="new-patient-regidter-modal-form-row">
            <label>Husband's Name:</label>
            <input
              type="text"
              name="husbandName"
              placeholder="Husband's Name"
              value={formData.husbandName}
              onChange={handleChange}
              required
            />
            <label>
              1<sup>st</sup> Day of Last Menstruation:
            </label>
            <input
              type="date"
              name="lastMenstruationDate"
              value={formData.lastMenstruationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="new-patient-regidter-modal-form-row">
            <label>Patient Height (in cm):</label>
            <input
              type="number"
              name="patientHeight"
              placeholder="0"
              value={formData.patientHeight}
              onChange={handleChange}
              required
            />
            <label>Expected Date of Delivery:</label>
            <input
              type="date"
              name="expectedDeliveryDate"
              value={formData.expectedDeliveryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="new-patient-regidter-modal-form-row">
            <label>Patient Weight (in kg):</label>
            <input
              type="number"
              name="patientWeight"
              placeholder="0"
              value={formData.patientWeight}
              onChange={handleChange}
              required
            />
            <label>OBS History:</label>
            <input
              type="text"
              name="obsHistory"
              placeholder="OBS History"
              value={formData.obsHistory}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="new-patient-regidter-modal-register-btn"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default NewPatientRegistrationForm;
