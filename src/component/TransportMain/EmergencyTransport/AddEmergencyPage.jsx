 /* Dhanashree_AddEmergencyPageTransport_24/09_Starts */

import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./AddEmergencyPage.css";
import { API_BASE_URL } from "../../api/api";

function AddEmergencyPageTransport() {
  const [formData, setFormData] = useState({
    emergencyId: "",
    patientId: "",
    patientName: "",
    age: "",
    gender: "",
    contactNumber: "",
    emergencyType: "",
    pickupLocation: "",
    status: "",
    emergencyCost: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Log formData to check if it's defined and populated
    console.log(formData);
  
    // Axios POST request to add new emergency data
    // axios.post("http://localhost:4069/EmergencyTransport/add", formData) 
    axios.post(`${API_BASE_URL}/EmergencyTransport/add`, formData) 
      .then((response) => {
        console.log("Emergency Data Added: ", response.data);
        alert("Emergency data successfully added!"); // Optionally, notify the user
        setFormData({
          emergencyId: "",
          patientIid: "",
        name: "",
          age: "",
          gender: "",
          contact_number: "",
          emergency_type: "",
          pickup_location: "",
          status: "",
          emergency_cost: "",
        }); // Clear the form after successful submission
      })
      .catch((error) => {
        console.error("Error adding emergency data:", error);
        alert("Failed to add emergency data. Please try again."); // Optionally, notify the user
      });
  };

  return (
    <div className="AddEmergencyPageTransport-form-container">
      <h1>Add Emergency Data for Patient</h1>
      <form onSubmit={handleSubmit}>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Emergency Id:</label>
          <input
            type="text"
            name="emergencyId"
            value={formData.emergencyId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Patient Id:</label>
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Emergency Type:</label>
          <input
            type="text"
            name="emergencyType"
            value={formData.emergencyType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Pickup Location:</label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div className="AddEmergencyPageTransport-form-row">
          <label>Emergency Cost:</label>
          <input
            type="text"
            name="emergencyCost"
            value={formData.emergencyCost}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="AddEmergencyPageTransport-submit-btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddEmergencyPageTransport;

 /* Dhanashree_AddEmergencyPageTransport_24/09_Ends */

 