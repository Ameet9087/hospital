import React, { useState } from "react";
import "./MaintenanceFileMasterPopUp.css";
import {API_BASE_URL} from "../../../api/api"
import { toast } from "react-toastify";
import { FloatingInput } from "../../../../FloatingInputs";

const MaintenanceFileMasterPopUp = ({onClose}) => {
  const [formData, setFormData] = useState({
    typeName: "",
    code: "",
    description: "",
    status: "Active",
  });

  const [message, setMessage] = useState(""); // To display success or error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      typeName: "",
      code: "",
      description: "",
      status: "Active",
    });
  };

  const handleSave = () => {
    fetch(`${API_BASE_URL}/maintenance-type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save data");
        }
        return res.json();
      })
      .then((data) => {
        setMessage("Data saved successfully!");
       toast.success("Saved data:", data);
        handleClear();
        onClose();
      })
      .catch((err) => {
        toast.error("Error saving data:", err);
        setMessage("Error saving data");
      });
  };

  return (
    <div className="MaintenanceFileMasterPopUp-container">
      <div className="MaintenanceFileMasterPopUp-header">
        <h4>Maintenance Type Master</h4>
      </div>
      {message && (
        <div className="MaintenanceFileMasterPopUp-message-bar">
          <p>{message}</p>
        </div>
      )}
      <div className="MaintenanceFileMasterPopUp-form">
        <div className="MaintenanceFileMasterPopUp-form-row">
          <div className="MaintenanceFileMasterPopUp-form-group-1row">
            <div className="MaintenanceFileMasterPopUp-form-group">
              <FloatingInput
              label={"Type Name"}
              type="text"
              id="typeName"
              name="typeName"
              placeholder="Enter Type Name"
              value={formData.typeName}
              onChange={handleChange}
              required
              
              />
            </div>
            <div className="MaintenanceFileMasterPopUp-form-group">
              <FloatingInput
              label={"Code"}
              type="text"
              id="code"
              name="code"
              placeholder="Enter Code"
              value={formData.code}
              onChange={handleChange}
              required
              />
            </div>
          </div>

          <div className="MaintenanceFileMasterPopUp-form-group-1row">
            <div className="MaintenanceFileMasterPopUp-form-group">
              <FloatingInput
              label={"Description"}
              type="text"
              id="description"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              />
            </div>
          </div>
          <div className="MaintenanceFileMasterPopUp-form-group-1row">
            <div className="MaintenanceFileMasterPopUp-form-group">
              <label>Status:</label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleChange}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="MaintenanceFileMasterPopUp-form-actions">
        <button
          className="MaintenanceFileMasterPopUp-add-button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MaintenanceFileMasterPopUp;
