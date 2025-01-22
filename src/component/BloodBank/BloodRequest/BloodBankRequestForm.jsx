import React, { useState, useEffect } from "react";
import "./BloodBankRequestForm.css";
import { API_BASE_URL } from "../../api/api";

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
        const data = await response.json();
        setPatients(data); // Assuming the API returns an array of patients
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
        alert("Request submitted successfully!");
      } else {
        console.error("Failed to submit request:", response.statusText);
        alert("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Error submitting request. Please try again.");
    }
  };

  return (
    <div className="bloodbankrequest-container">
      <h2 className="bloodbankrequest-title">Blood Request Form</h2>
      <form className="bloodbankrequest-form" onSubmit={handleSubmit}>
        {/* Patient Select */}
        <div className="bloodbankrequest-form-row">
          <div className="bloodbankrequest-form-group">
            <label htmlFor="inPatientId">Patient:</label>
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
                  {patient.firstName} {patient.middleName} {patient.lastName} (UHID: {patient.uhid})
                </option>
              ))}
            </select>
          </div>
          <div className="bloodbankrequest-form-group">
            <label htmlFor="bloodGroup">Blood Group:</label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        {/* Required Units and Contact Information */}
        <div className="bloodbankrequest-form-row">
          <div className="bloodbankrequest-form-group">
            <label htmlFor="requiredUnits">Required Units:</label>
            <input
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
            <label htmlFor="contactInformation">Contact Information:</label>
            <input
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
            <label htmlFor="requestDate">Request Date:</label>
            <input
              type="date"
              id="requestDate"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="bloodbankrequest-form-group">
            <label htmlFor="requiredDate">Required Date:</label>
            <input
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
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
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
