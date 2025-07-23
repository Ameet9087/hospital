import React, { useState, useEffect } from "react";
import "./BloodBankRequestForm.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from 'react-toastify';
const BloodBankRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    requiredUnits: "",
    requestDate: "",
    requiredDate: "",
    status: "",
    contactInformation: "",
    inPatientId: "",
  });

  const [patients, setPatients] = useState([]);

  // Fetch patient data from the API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/inpatients/getAllPatients`);
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json(); // Ensure correct data extraction
        console.log("Fetched data:", data); // Log the actual fetched data
        setPatients(data); // Set state properly
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
  
    fetchPatients();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data in the desired format
    const bloodRequestPayload = {
      bloodGroup: formData.bloodGroup,
      requiredUnits: formData.requiredUnits,
      requestDate: formData.requestDate,
      requiredDate: formData.requiredDate,
      status: formData.status,
      contactInformation: formData.contactInformation,
      patientDTO: {
        inPatientId: formData.inPatientId,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bloodrequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bloodRequestPayload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Request submitted successfully:", responseData);
        toast.success('Proposal saved successfully!');

      } else {
        console.error("Failed to submit request:", response.statusText);
        toast.error('Failed to save proposal. Please try again.');

      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error('Failed to save proposal. Please try again.');

    }
  };

  return (
    <div className="bloodbankrequest-container">
      <h2 className="bloodbankrequest-title">Blood Request Form</h2>
      <form className="bloodbankrequest-form" onSubmit={handleSubmit}>
        {/* Patient Select */}
        <div className="bloodbankrequest-form-row">
          <div className="bloodbankrequest-form-group">
            <FloatingSelect
              label="Patient"
              name="inPatientId"
              value={formData.inPatientId}
              onChange={handleChange}
              required
              options={[
                { value: "", label: "Select a Patient" },
                ...(Array.isArray(patients)
                  ? patients.map((patient) => ({
                      value: patient.inPatientId,
                      label: `${patient?.patient?.firstName} ${patient?.patient?.lastName} ${patient?.patient?.uhid}`,
                    }))
                  : []),
              ]}
            />

            {/* <label htmlFor="inPatientId">Patient:</label>
            <select
              id="inPatientId"
              name="inPatientId"
              value={formData.inPatientId}
              onChange={handleChange}
              required
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.inPatientId} value={patient.inPatientId}>
                  {patient.firstName} {patient.middleName} {patient.lastName}{" "}
                  (UHID: {patient.uhid})
                </option>
              ))}
            </select> */}
          </div>
          <div className="bloodbankrequest-form-group">
            <FloatingSelect
              label={"Blood Group"}
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              options={[
                { value: "", label: "Select a Blood Group" },
                { value: "A+", label: "A+" },
                { value: "A-", label: "A-" },
                { value: "B+", label: "B+" },
                { value: "B-", label: "B-" },
                { value: "AB+", label: "AB+" },
                { value: "AB-", label: "AB-" },
                { value: "O+", label: "O+" },
              ]}
            />
          </div>
        </div>

        {/* Required Units and Contact Information */}
        <div className="bloodbankrequest-form-row">
          <div className="bloodbankrequest-form-group">
            <FloatingInput
              label={"Required Units"}
              type="number"
              id="requiredUnits"
              name="requiredUnits"
              value={formData.requiredUnits}
              onChange={handleChange}
              placeholder="Enter Required Units"
              min="1"
              required
            />
          </div>
          <div className="bloodbankrequest-form-group">
            <FloatingInput
              label={"Contact Information"}
              type="text"
              id="contactInformation"
              name="contactInformation"
              value={formData.contactInformation}
              onChange={handleChange}
              placeholder="Enter Contact Information"
              required
            />
          </div>
        </div>

        {/* Request Date and Required Date */}
        <div className="bloodbankrequest-form-row">
          <div className="bloodbankrequest-form-group">
            <FloatingInput
              label={"Request Date"}
              type="date"
              id="requestDate"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="bloodbankrequest-form-group">
            <FloatingInput
              label={"Required Date"}
              type="date"
              id="requiredDate"
              name="requiredDate"
              value={formData.requiredDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Status */}
        <div className="bloodbankrequest-form-row">
          <div className="bloodbankrequest-form-group">
            <FloatingSelect
              label={"Status"}
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              options={[
                { value: "", label: "Select a state" },
                { value: "Issued", label: "Issued" },
                { value: "Pending", label: "Pending" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="bloodbankrequest-form-actions">
          <button type="submit" className="bloodbankrequest-submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BloodBankRequestForm;
