import React, { useState, useEffect } from "react";
import axios from "axios";
import "../LabSetting/labLookUpAddNewLUp.css";
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../FloatingInputs";

const LabLookUpUpdateNewLUp = ({ lookup, onClose }) => {
  const [moduleName, setModuleName] = useState(lookup.moduleName || "Lab");
  const [lookupName, setLookupName] = useState(lookup.lookupName || "");
  const [description, setDescription] = useState(lookup.description || "");
  const [lookupData, setLookupData] = useState(lookup.lookupdata || [""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(lookup);

  const handleLookupDataChange = (index, value) => {
    const newLookupData = [...lookupData];
    newLookupData[index] = value;
    setLookupData(newLookupData);
  };

  const handleAddLookupData = () => {
    setLookupData([...lookupData, ""]);
  };

  // Submit form data to backend API to update the lookup
  const handleSubmit = async () => {
    if (
      !lookupName ||
      lookupData.length === 0 ||
      lookupData.some((item) => item === "")
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      moduleName,
      lookupName,
      description,
      lookupdata: lookupData,
    };

    setLoading(true);
    setError("");
    const lookUpId = lookup.labLookupId;
    try {
      await axios.put(
        `${API_BASE_URL}/lab-lookups/update/${lookUpId}`,
        payload
      );
      toast.success("Lab Lookup Updated Successfully")
      onClose();
    } catch (err) {
      toast.error("Failed to update lookup. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="labLookUpAddNewLUp-container">
      <div className="labLookUpAddNewLUp-header">
        <h3>Update Lookup</h3>
        <button className="labLookUpAddNewLUp-close-btn" onClick={onClose}>
          x
        </button>
      </div>

      <div className="labLookUpAddNewLUp-form">
        <div className="labLookUpAddNewLUp-form-row">
          <div className="labLookUpAddNewLUp-form-group-1row">
            <div className="labLookUpAddNewLUp-form-group">
              <FloatingInput
              label={"Module Name"}
                type="text"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
              />
            </div>
          </div>

          <div className="labLookUpAddNewLUp-form-group-1row">
            <div className="labLookUpAddNewLUp-form-group">
              <FloatingInput
              label={"Look Up Name"}
              type="text"
              value={lookupName}
              onChange={(e) => setLookupName(e.target.value)}
              />
            </div>
          </div>

          <div className="labLookUpAddNewLUp-form-group-1row">
            <div className="labLookUpAddNewLUp-form-group">
              <FloatingInput
              label={"Description"}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="labLookUpAddNewLUp-header">
          <h3>Look Up Data</h3>
        </div>

        <div className="labLookUpAddDataContainer">
          {lookupData.map((data, index) => (
            <div
              key={index}
              className="labLookUpAddNewLUp-form-group labLookUpAddNewLUp-full-width"
            >
              <FloatingInput
              type="text"
              label={"Add Data"}
              value={data}
              onChange={(e) => handleLookupDataChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          className="labLookUpAddNewLUp-plus-btn"
          onClick={handleAddLookupData}
        >
          <i className="fa-solid fa-plus"></i> Add Data
        </button>

        {error && <p className="labLookUpAddNewLUp-error">{error}</p>}
      </div>

      <div className="labLookUpAddNewLUp-form-actions">
        <button
          className="labLookUpAddNewLUp-add-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default LabLookUpUpdateNewLUp;
