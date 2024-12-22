import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import './CSSDItemMaster.css';

const CSSDItemMaster = () => {
  const [status, setStatus] = useState("Active");
  const [itemName, setItemName] = useState("");
  const [type, setType] = useState("Auto Clave");
  const [department, setDepartment] = useState("CSSD");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if an itemName was passed in state
    if (location.state?.itemName) {
      setItemName(location.state.itemName);
    }
  }, [location.state]);

  const handleSave = async () => {
    const machineData = {
      machineName: itemName,
      type: type,
      department: department,
      description: description,
      status: status,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/machines",
        machineData
      );
      console.log("Machine saved successfully:", response.data);
      alert("Machine saved successfully!");
    } catch (error) {
      console.error("Error saving machine:", error);
      alert("Failed to save machine. Please try again.");
    }
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="CSSDItemMaster-container">
      <div className="CSSDItemMaster-header">
        <div className="CSSDItemMaster-heading">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="back-icon"
            onClick={handleClose}
          />
          <h2>CSSD Machine Master</h2>
        </div>
      </div>
      <div className="CSSDItemMaster-content">
        <div className="CSSDItemMaster-formContainer">
          <div className="CSSDItemMaster-formGroup">
            <label>Machine Name:</label>
            <input
              type="text"
              placeholder="Enter machine name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Auto Clave">Auto Clave</option>
              <option value="Imaging">Imaging</option>
              <option value="Diagnostic">Diagnostic</option>
              <option value="ETO">ETO</option>
            </select>
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Dept.:</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="CSSD">CSSD</option>
              <option value="Radiology">Radiology</option>
              <option value="Pathology">Pathology</option>
            </select>
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Description:</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Status:</label>
            <div className="CSSDItemMaster-statusOptions">
              <input
                type="radio"
                value="Active"
                checked={status === "Active"}
                onChange={() => setStatus("Active")}
              />
              Active
              <input
                type="radio"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={() => setStatus("Inactive")}
              />
              Inactive
            </div>
          </div>
        </div>
        <div className="CSSDItemMaster-buttonContainer">
          <button onClick={handleSave}>Save</button>
          <button>Delete</button>
          <button>Clear</button>
          <button onClick={handleClose}>Close</button>
          <button>Search</button>
          <button>Tracking</button>
          <button>Print</button>
          <button>Version Comparison</button>
          <button>SDC</button>
          <button>Testing</button>
          <button>Info</button>
        </div>
      </div>
    </div>
  );
};

export default CSSDItemMaster;
