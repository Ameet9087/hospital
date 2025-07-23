import React, { useState, useEffect } from "react";
import "./NewPatientRegistrationForm.css";
import { API_BASE_URL } from "../api/api";
import { FloatingInput, FloatingSelect } from "../../FloatingInputs";
import { toast } from 'react-toastify';
const NewPatientRegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    country: "",
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

      toast.success('Proposal saved successfully!');

      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error('Failed to save proposal. Please try again.');

    }
  };

  return (
    <div
    // className="new-patient-regidter-modal new-patient-registration-modal"
    >
      <div className="new-patient-regidter-modal-modal-header">
        <h3>New Patient Registration</h3>
      </div>
    
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
              label={"Country"}
              name="country"
              value={formData.country}
              onChange={handleChange}
              options={[
                { value: "", label: "Select a country" },
                { value: "India", label: "India" },
                { value: "Kenya", label: "Kenya" },
                { value: "United States", label: "United States" },
                { value: "China", label: "China" },
                { value: "Germany", label: "Germany" },
                { value: "United Kingdom", label: "United Kingdom" },
                { value: "France", label: "France" },
                { value: "Japan", label: "Japan" },
                { value: "Canada", label: "Canada" },
                { value: "Australia", label: "Australia" },
                { value: "Brazil", label: "Brazil" },
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
            <FloatingSelect
              label={"State"}
              name="state"
              value={formData.state}
              onChange={handleChange}
              options={[
                { value: "", label: "Select a state" },
                { value: "Maharashtra", label: "Maharashtra" },
                { value: "Karnataka", label: "Karnataka" },
                { value: "Tamil Nadu", label: "Tamil Nadu" },
                { value: "Uttar Pradesh", label: "Uttar Pradesh" },
                { value: "West Bengal", label: "West Bengal" },
                { value: "Gujarat", label: "Gujarat" },
                { value: "Rajasthan", label: "Rajasthan" },
                { value: "Bihar", label: "Bihar" },
                { value: "Kerala", label: "Kerala" },
                { value: "Punjab", label: "Punjab" },
              ]}
            />
          </div>

          <div className="new-patient-regidter-modal-form-row">
            <FloatingSelect
              label={"Gender"}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { value: "", label: "Select a state" },
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />

            <FloatingInput
              label={"Address"}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="new-patient-regidter-modal-form-row">
            <FloatingInput
              label={"Age"}
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />

            <FloatingSelect
              name="ageUnit"
              value={formData.ageUnit}
              onChange={handleChange}
              options={[
                { value: "", label: "Select a Age" },
                { value: "Years", label: "Years" },
                { value: "Months", label: "Months" },
              ]}
            />
          </div>
        </div>

        <div className="new-patient-regidter-modal-section maternity-information">
          <h4>Maternity Information</h4>
          <div className="new-patient-regidter-modal-form-row">
            <FloatingInput
              label={"Husband's Name"}
              type="text"
              name="husbandName"
              placeholder="Husband's Name"
              value={formData.husbandName}
              onChange={handleChange}
              restrictions={{char:true}}
              required
            />

            <FloatingInput
              label={`1ˢᵗ Day of Last Menstruation`}
              type="date"
              name="lastMenstruationDate"
              placeholder="Husband's Name"
              value={formData.lastMenstruationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="new-patient-regidter-modal-form-row">
            <FloatingInput
              label={"Patient Height (in cm)"}
              type="number"
              name="patientHeight"
              placeholder="Patient Height (in cm)"
              value={formData.patientHeight}
              onChange={handleChange}
              min="0"
              required
            />

            <FloatingInput
              label={"Expected Date of Delivery"}
              type="date"
              name="expectedDeliveryDate"
              placeholder="Expected Date of Delivery"
              value={formData.expectedDeliveryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="new-patient-regidter-modal-form-row">
            <FloatingInput
              label={"Patient Weight (in kg)"}
              type="number"
              name="patientWeight"
              placeholder="Patient Weight (in kg)"
              value={formData.patientWeight}
              onChange={handleChange}
              min="0"
              required
            />

            <FloatingInput
              label={"OBS History"}
              type="text"
              name="obsHistory"
              placeholder="OBS History"
              value={formData.obsHistory}
              onChange={handleChange}
              min="0"
              required
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
