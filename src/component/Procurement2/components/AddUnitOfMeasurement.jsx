import React, { useState } from "react";
import "./AddUnitOfMeasurement.css";
import { API_BASE_URL } from "../../api/api";

const AddUnitOfMeasurement = ({onClose}) => {
  const [unitOfMeasurementName, setUnitName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        alert("Unit of Measurement added successfully!");
        onClose();
      } else {
        alert("Error adding Unit of Measurement");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the Unit of Measurement");
    }
  };

  return (
    <div className="AddUnitOfMeasurement-model">
      <h2>Add Unit of Measurement</h2>
      <form onSubmit={handleSubmit} className="AddUnitOfMeasurement-form">
        <div className="AddUnitOfMeasurement-formgroup">
          <label>
            Unit of Measurement Name<span className="MeasssRequired">*</span>
          </label>
          <input
            type="text"
            placeholder="Unit of Measurement Name"
            value={unitOfMeasurementName}
            onChange={(e) => setUnitName(e.target.value)}
            required
          />
        </div>

        <div className="AddUnitOfMeasurement-formgroup" >
          <label>Description</label>
          <input
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
