import React, { useState } from "react";
import "./AddWardSubstoreMap.css"; // Ensure CSS matches the component name
import axios from "axios";
import { API_BASE_URL } from "../api/api";


const AddWardSubstoreMap = () => {
  const [ward, setWard] = useState("");
  const [substore, setSubstore] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [mappedData, setMappedData] = useState([]);

  const handleAddRow = () => {
    if (!ward || !substore) {
      alert("Please fill in both Ward and Substore fields!");
      return;
    }

    const newRow = {
      id: Date.now(),
      ward,
      substore,
      isDefault,
    };

    setMappedData((prevData) => [...prevData, newRow]);
    setWard("");
    setSubstore("");
    setIsDefault(false);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/save-mapping`, {
        mappings: mappedData,
      });
      console.log("Data saved successfully:", response.data);
      alert("Data saved successfully!");
      setMappedData([]);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleDiscard = () => {
    setWard("");
    setSubstore("");
    setIsDefault(false);
  };

  const handleDeleteRow = (id) => {
    setMappedData((prevData) => prevData.filter((row) => row.id !== id));
  };

  return (
    <div className="AddWardSubstoreMap">
      <h2>Add Ward SubStore Map</h2>
      <div className="AddWardSubstoreMap-form">
        <div className="AddWardSubstoreMap-formGroup">
          <label>
            Ward<span className="required">*</span>:
          </label>
          <input
            type="text"
            placeholder="Select Ward"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          />
        </div>
        <div className="AddWardSubstoreMap-formGroup">
          <label>
            Substore<span className="required">*</span>:
          </label>
          <input
            type="text"
            placeholder="Select Substore"
            value={substore}
            onChange={(e) => setSubstore(e.target.value)}
          />
        </div>
        <div className="AddWardSubstoreMap-formGroup">
          <label>
            Is Default:
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            />
          </label>
        </div>
        <div className="AddWardSubstoreMap-actions">
          <button
            className="AddWardSubstoreMap-addButton"
            onClick={handleAddRow}
          >
            Add
          </button>
          <button
            className="AddWardSubstoreMap-discardButton"
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      </div>
      <div className="AddWardSubstoreMap-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Ward</th>
              <th>Substore</th>
              <th>Is Default</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mappedData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.ward}</td>
                <td>{row.substore}</td>
                <td>{row.isDefault ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="AddWardSubstoreMap-deleteButton"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="AddWardSubstoreMap-save">
        <button className="AddWardSubstoreMap-saveButton" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddWardSubstoreMap;
