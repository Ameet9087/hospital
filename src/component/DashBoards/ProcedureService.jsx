import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProcedureService.css";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingSelect } from "../../FloatingInputs";

const ProcedureService = ({ setIsModalOpen, inPatientId, outPatientId }) => {
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  const [availableProcedures, setAvailableProcedures] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [procedureType, setProcedureType] = useState(""); // Type of procedure
  const [serviceTypes] = useState(["Radiology", "Lab"]); // Procedure types

  console.log("check in ", inPatientId);
  console.log("check out ", outPatientId);
  // Fetch procedures based on selected type
  useEffect(() => {
    if (procedureType) {
      const fetchProcedures = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/service-details/sorted-map?serviceTypeName=${procedureType}`
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
      toast.error("Please select at least one procedure before submitting.");
      return;
    }

    const payload = selectedProcedures.map((serviceName) => ({
      serviceName,
      payStatus: "Pending",
      rate: 0.0,
      inPatient: inPatientId ? { inPatientId } : null,  // ✅ Ensure `inPatient` is an object or `null`
      outPatient: outPatientId ? { outPatientId } : null, // ✅ Ensure `outPatient` is an object or `null`
    }));

    console.log("Submitting Payload:", JSON.stringify(payload, null, 2)); // Debugging

    try {
      await axios.post(`${API_BASE_URL}/services`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setIsModalOpen(false);
      toast.success("Procedures Saved Successfully");
      cancelSelection();
    } catch (error) {
      console.error("Error saving procedures:", error);
      toast.error("Failed to save procedures. Please try again later.");
    }
  };


  return (
    <div className="procedures-service-container">
      <h3>Procedures/Services</h3>
      <div className="procedures-service-content-container">
        <div className="procedures-service-content">
          <FloatingSelect
            label={"Procedure Type"}
            id="procedure-type"
            value={procedureType}
            onChange={(e) => setProcedureType(e.target.value)}
            options={[
              { value: "", label: "" },
              ...(Array.isArray(serviceTypes)
                ? serviceTypes.map((type) => ({
                  value: type,
                  label: type,
                }))
                : []),
            ]}
          />
        </div>

        <div className="procedures-service-content">
          <FloatingSelect
            label={"Procedures"}
            id="procedures"
            value={selectedProcedure}
            onChange={(e) => setSelectedProcedure(e.target.value)}
            disabled={!procedureType}
            options={[
              { value: "", label: "" },
              ...(Array.isArray(availableProcedures)
                ? availableProcedures.map((procedure) => ({
                  value: procedure?.serviceName,
                  label: procedure?.serviceName,
                }))
                : []),
            ]}
          />
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
            <ul className="procedures-service-showcase-ul">
              {selectedProcedures
                .slice()
                .reverse()
                .map((procedure, index) => (
                  <li key={selectedProcedures.length - 1 - index}>
                    {selectedProcedures.length - index}. {procedure}
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
