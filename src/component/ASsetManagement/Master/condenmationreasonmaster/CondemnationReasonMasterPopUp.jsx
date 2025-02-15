import React, { useEffect, useState } from "react";
import "./CondemnationReasonMasterPopUp.css";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../../FloatingInputs";
const CondemnationReasonMasterPopUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    condemnationReason: "",
    description: "",
  });

  const [isActive, setIsActive] = useState(false);

  const handleCheckboxClick = () => {
    setIsActive(!isActive);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClick = async () => {
    // Prepare the data to be sent in the POST request
    const data = {
      condemnationReasons: formData.condemnationReason,
      description: formData.description,
      status: isActive ? "Active" : "Inactive",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/condemnation-reasons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Condemnation reason added successfully!");
        onClose();
        // You can reset the form or close the popup here if needed
        setFormData({
          condemnationReason: "",
          description: "",
        });
        setIsActive(false);
      } else {
        toast.error("Failed to add condemnation reason. Please try again.");
      }
    } catch (error) {
      toast.error("Error while adding condemnation reason:", error);
    }
  };

  return (
    <div className="CondemnationReasonMasterPopUp-container">
      <div className="CondemnationReasonMasterPopUp-header">
        <h4>Condemnation Reason Master</h4>
      </div>

      <div className="CondemnationReasonMasterPopUp-form">
        <div className="CondemnationReasonMasterPopUp-form-row">
          <div className="CondemnationReasonMasterPopUp-form-group-1row">
            <div className="CondemnationReasonMasterPopUp-form-group">
              <FloatingInput
              label={"Condemnation Reason"}
               type="text"
               name="condemnationReason"
               value={formData.condemnationReason}
               onChange={handleChange}
               required
              
              />
            </div>
            <div className="CondemnationReasonMasterPopUp-form-group">
              <FloatingInput
              label={"Description"}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              />
            </div>
          </div>

          <div className="CondemnationReasonMasterPopUp-form-group-1row">
            <div className="CondemnationReasonMasterPopUp-form-group">
              <label>
                <div className="CondemnationReasonMasterPopUp-form-group-checkbox">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={handleCheckboxClick}
                  />
                  Status: {isActive ? "Active" : "Inactive"}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="CondemnationReasonMasterPopUp-form-actions">
        <button
          className="CondemnationReasonMasterPopUp-add-btn"
          onClick={handleButtonClick}
        >
          Add
        </button>
        {/* <button className="CondemnationReasonMasterPopUp-close-btn" onClick={onClose}>
          Close
        </button> */}
      </div>
    </div>
  );
};

export default CondemnationReasonMasterPopUp;