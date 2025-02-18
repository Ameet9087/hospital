import React, { useState } from "react";
import "./AddUnitOfMeasurement.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput } from "../../../FloatingInputs";
import { toast } from "react-toastify";
const AddUnitOfMeasurement = ({onClose}) => {
  const [unitOfMeasurementName, setUnitName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
  // Validate all fields
  if (!unitOfMeasurementName?.trim() || !description?.trim()) {
    toast.error("Please fill in all required fields.");
    return;
  }
    const newUnit = {
      name:unitOfMeasurementName,
      description,
      isActive:isActive
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/unitofmeasurement/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUnit),
        }
      );

      if (response.ok) {
        setUnitName("");
        setDescription("");
        setIsActive(true);
        toast.success("Unit of Measurement added successfully!");
        onClose();
      } else {
        toast.error("Error adding Unit of Measurement");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the Unit of Measurement");
    }
  };

  return (
    <div className="AddUnitOfMeasurement-model">
      <h2>Add Unit of Measurement</h2>
      <form onSubmit={handleSubmit} className="AddUnitOfMeasurement-form">
        <div className="AddUnitOfMeasurement-formgroup">
          <FloatingInput
          label={" Unit of Measurement Name"}
          type="text"
          placeholder="Unit of Measurement Name"
          value={unitOfMeasurementName}
          onChange={(e) => setUnitName(e.target.value)}
          required
          />
        
        </div>

        <div className="AddUnitOfMeasurement-formgroup" >
          <FloatingInput
          label={"Description"}
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        
        </div>

        <div className="AddUnitOfMeasurement-formgroup" >
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </div>

        <button type="submit" className="MeasssBtnAdd">
          Add Unit of Measurement
        </button>
      </form>
    </div>
  );
};

export default AddUnitOfMeasurement;
