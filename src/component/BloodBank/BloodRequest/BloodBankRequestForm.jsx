import React, { useState, useEffect } from "react";
import "./BloodBankRequestForm.css";
import { API_BASE_URL } from "../../api/api";

const BloodBankRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    storage_id: "",
    storagedate: "",
    bloodgroup: "",
    volume: "",
    expirydate: "",
    storagelocation: "",
    status: "",
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
      storageId: formData.storage_id,
      storageDate: formData.storagedate,
      bloodGroup: formData.bloodgroup,
      volume: formData.volume,
      expiryDate: formData.expirydate,
      storageLocation: formData.storagelocation,
      status: formData.status,

      patientDTO: {
        inPatientId: formData.inPatientId
      }
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
      <h2 className="bloodbankrequest-title">Blood Request</h2>
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
                  {patient.patientName}
                </option>
              ))}
            </select>
          </div>
          <div className="bloodbankrequest-form-group">
            <label htmlFor="bloodgroup">Blood Group:</label>
            <select
              id="bloodgroup"
              name="bloodgroup"
              value={formData.bloodgroup}
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

        {/* Second Row */}
        <div className="bloodbankrequest-form-row">
          <div className="bloodbankrequest-form-group">
            <label htmlFor="volume">Volume (ml):</label>
            <input
              type="number"
              id="volume"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              placeholder="Enter Volume"
              required
            />
          </div>
          <div className="bloodbankrequest-form-group">
            <label htmlFor="expirydate">Expiry Date:</label>
            <input
              type="date"
              id="expirydate"
              name="expirydate"
              value={formData.expirydate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Third Row */}
        <div className="bloodbankrequest-form-row">
          <div className="bloodbankrequest-form-group">
            <label htmlFor="storagedate">Storage Date:</label>
            <input
              type="date"
              id="storagedate"
              name="storagedate"
              value={formData.storagedate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="bloodbankrequest-form-group">
            <label htmlFor="storagelocation">Storage Location:</label>
            <input
              type="text"
              id="storagelocation"
              name="storagelocation"
              value={formData.storagelocation}
              onChange={handleChange}
              placeholder="Enter Storage Location"
              required
            />
          </div>
        </div>

        {/* Fourth Row */}
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
              <option value="Available">Available</option>
              <option value="Reserved">Reserved</option>
              <option value="Unavailable">Unavailable</option>
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
