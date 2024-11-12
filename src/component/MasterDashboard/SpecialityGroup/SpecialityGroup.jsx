import React, { useState } from 'react';
import axios from 'axios';
import './SpecialityGroup.css';
import useCustomAlert from '../../../alerts/useCustomAlert';

function SpecialityMaster() {
  const [specialityGroup, setSpecialityGroup] = useState("");
  const [misHeads, setMisHeads] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const { success, warning, error, CustomAlerts } = useCustomAlert();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      specialityGroup,
      misHeads,
      description,
      status
    };

    try {
      const response = await axios.post("http://192.168.0.101:8086/api/specialityGroups", data);
      success("Speciality Group Added");
      
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  };

  return (
    <div className="speciality-group">
      <CustomAlerts></CustomAlerts>
      {/* Header */}
      <div className="speciality-group__header">
        <h3>Speciality Group</h3>
      </div>

      <form onSubmit={handleSubmit} className="speciality-group__form-container">
        <div className="speciality-group__form-group">
          <label>Speciality Group: *</label>
          <input
            type="text"
            value={specialityGroup}
            onChange={(e) => setSpecialityGroup(e.target.value)}
            required
          />
        </div>
        <div className="speciality-group__form-group">
          <label>MIs Heads: *</label>
          <input
            type="text"
            value={misHeads}
            onChange={(e) => setMisHeads(e.target.value)}
            required
          />
        </div>
        <div className="speciality-group__form-group">
          <label>Description: *</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="speciality-group__form-group">
          <label>Status:</label>
          <div className="speciality-group__radio-group">
            <label>
              <input
                type="radio"
                value="Active"
                checked={status === "Active"}
                onChange={handleStatusChange}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={handleStatusChange}
              />
              Inactive
            </label>
          </div>
        </div>
        <button type="submit" className="speciality-group__submit-button">Submit</button>
      </form>
    </div>
  );
}

export default SpecialityMaster;
