import React, { useState, useEffect } from "react";
import "./EquipmentTaggingForm.css";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";
const EquipmentTaggingForm = () => {
  const [formData, setFormData] = useState({
    status: "Active",
    equipmentMasterId: "",
    partId: "",
  });

  const [equipmentMasters, setEquipmentMasters] = useState([]);
  const [parts, setParts] = useState([]);

  // Fetch Equipment Masters
  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-masters`)
      .then((response) => response.json())
      .then((data) => setEquipmentMasters(data))
      .catch((error) => console.error("Error fetching equipment masters:", error));
  }, []);

  // Fetch Parts
  useEffect(() => {
    fetch(`${API_BASE_URL}/parts`)
      .then((response) => response.json())
      .then((data) => setParts(data))
      .catch((error) => console.error("Error fetching parts:", error));
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      taggingId: null,
      status: formData.status,
      equipmentMasterDTO: {
        equipmentMasterId: parseInt(formData.equipmentMasterId, 10),
      },
      partDTO: {
        partId: parseInt(formData.partId, 10),
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/equipment-tagging`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Equipment tagged successfully!");
        setFormData({ status: "Active", equipmentMasterId: "", partId: "" });
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Failed to tag equipment."}`);
      }
    } catch (error) {
      toast.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="equipment-tagging">
      <h2 className="equipment-tagging__header">Equipment Tagging To Item Master</h2>

      <form className="equipment-tagging__form" onSubmit={handleSubmit}>
        {/* Equipment Name */}
        <div className="equipment-tagging__group">
        <FloatingSelect
  label={"Equipment Name *"}
  name="equipmentMasterId"
  value={formData.equipmentMasterId}
  onChange={handleInputChange}
  required
  options={[
    { value: "", label: "Select Equipment", disabled: true },
    ...equipmentMasters.map((equipment) => ({
      value: equipment.equipmentMasterId,
      label: equipment.equipmentName
    }))
  ]}
/>

        
          <div className="equipment-tagging__input-container">
           
          </div>
        </div>

        {/* Item Name */}
        <div className="equipment-tagging__group">
          
        <FloatingSelect
  label={"Item Name"}
  name="partId"
  value={formData.partId}
  onChange={handleInputChange}
  required
  options={[
    { value: "", label: "Select Item", disabled: true },
    ...parts.map((part) => ({
      value: part.partId,
      label: part.partName
    }))
  ]}
/>

        </div>

        {/* Status */}
        <div className="equipment-tagging__group">
          
          <label className="equipment-tagging__label">Status</label>
          <span className="equipment-tagging__colon">:</span>
          <div className="equipment-tagging__radio-group">
            <label className="equipment-tagging__radio-label">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={formData.status === "Active"}
                onChange={handleInputChange}
                className="equipment-tagging__radio"
              />
              Active
            </label>
            <label className="equipment-tagging__radio-label">
              <input
                type="radio"
                name="status"
                value="InActive"
                checked={formData.status === "InActive"}
                onChange={handleInputChange}
                className="equipment-tagging__radio"
              />
              InActive
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button className="equipment-tagging-add" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default EquipmentTaggingForm;
