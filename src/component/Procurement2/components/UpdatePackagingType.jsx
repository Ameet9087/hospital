import React, { useState } from "react";
import axios from "axios";
import "./AddPackagingType.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput } from "../../../FloatingInputs";
import { toast } from "react-toastify";
const UpdatePackagingType = ({ packagingType, onUpdate, onClose }) => {
  const [name, setName] = useState(packagingType.packagingTypeName || "");
  const [description, setDescription] = useState(packagingType.description || "");
  const [isActive, setIsActive] = useState(packagingType.isActive ?? false); // Ensure it's always boolean

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPackagingType = {
        packagingTypeName: name,
        description,
        isActive: !!isActive, // Ensure it's always boolean
      };

      const response = await axios.put(
        `${API_BASE_URL}/packageType/updatePackageType/${packagingType.id}`,
        updatedPackagingType
      );

      if (response.status === 200) {

        toast.success("Packaging type updated successfully!");
        onUpdate(updatedPackagingType); // Update state in parent component
        onClose(); // Close modal
      }
    } catch (error) {
      toast.error('Failed to save proposal. Please try again.');

      console.error("Error updating packaging type:", error);
    }
  };

  return (
    <div className="AddPackagingType-model">
      <h2>Update Packaging Type</h2>
      <form onSubmit={handleSubmit} className="AddPackagingType-form">
        <div className="AddPackagingType-formgroup">
          <FloatingInput
          label={"Packaging Type Name"}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Some Packaging Type"
          />
        
        </div>
        <div className="AddPackagingType-formgroup">
          </div>
        <div className="AddPackagingType-formgroup">
          <FloatingInput
          label={"Description"}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          />
        
        </div>

        <div className="AddPackagingType-formgroup">
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>

        <button type="submit" className="MeasssBtnAdd">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePackagingType;
