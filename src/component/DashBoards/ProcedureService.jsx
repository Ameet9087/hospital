import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProcedureService.css";
import { API_BASE_URL } from "../api/api";

const ProcedureService = ({ inPatientId, outPatientId, setIsModalOpen }) => {
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  const [availableProcedures, setAvailableProcedures] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [procedureType, setProcedureType] = useState(""); // Type of procedure
  const [serviceTypes] = useState(["Radiology", "Lab"]); // Procedure types

  // Fetch procedures based on selected type
  useEffect(() => {
    if (procedureType) {
      const fetchProcedures = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/service-details/service?typeName=${procedureType}`
          );
          setAvailableProcedures(response.data);
        } catch (error) {
          console.error("Error fetching procedures:", error);
          alert("Failed to load procedures. Please try again later.");
        }
      };
      fetchProcedures();
    }
  }, [procedureType]);

  const addProcedure = () => {
    if (selectedProcedure && !selectedProcedures.includes(selectedProcedure)) {
      setSelectedProcedures([...selectedProcedures, selectedProcedure]);
    }
  };

  const removeProcedure = (procedure) => {
    setSelectedProcedures(
      selectedProcedures.filter((item) => item !== procedure)
    );
  };

  const cancelSelection = () => {
    setSelectedProcedures([]);
  };

  const submitSelection = async () => {
    if (selectedProcedures.length === 0) {
      alert("Please select at least one procedure before submitting.");
      return;
    }

    try {
      for (const serviceName of selectedProcedures) {
        const payload = {
          serviceName: serviceName,
          ...(inPatientId
            ? { inPatient: { inPatientId } }
            : { outPatient: { outPatientId } }),
        };

        await axios.post(`${API_BASE_URL}/services`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      alert("All procedures saved successfully!");
      setIsModalOpen(false);
      cancelSelection();
    } catch (error) {
      console.error("Error saving procedures:", error.message);
      alert("Failed to save procedures. Please try again later.");
    }
  };

  return (
    <div className="procedures-service-container">
      <h3>Procedures/Services</h3>

      <div className="procedures-service-content">
        <label htmlFor="procedure-type">Procedure Type:</label>
        <select
          id="procedure-type"
          value={procedureType}
          onChange={(e) => setProcedureType(e.target.value)}
        >
          <option value="">--Select Type--</option>
          {serviceTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="procedures-service-content">
        <label htmlFor="procedures">Procedures/Services:</label>
        <select
          id="procedures"
          value={selectedProcedure}
          onChange={(e) => setSelectedProcedure(e.target.value)}
          disabled={!procedureType}
        >
          <option value="">--Select--</option>
          {availableProcedures.map((procedure, index) => (
            <option key={index} value={procedure.serviceName}>
              {procedure.serviceName}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addProcedure}
          className="procedures-service-add"
        >
          +
        </button>
      </div>

      <div id="selected-procedures" className="procedures-service-showcase">
        {selectedProcedures.length > 0 && (
          <ul>
            {selectedProcedures.map((procedure, index) => (
              <li key={index}>
                {index + 1}.{procedure}
                <button
                  type="button"
                  className="procedures-service-cut"
                  onClick={() => removeProcedure(procedure)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="procedures-service-action-buttons">
        <button
          type="button"
          onClick={cancelSelection}
          className="procedures-service-action-cancel"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={submitSelection}
          className="procedures-service-action-submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProcedureService;
