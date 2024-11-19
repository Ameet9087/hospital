import React, { useState } from 'react';
import axios from 'axios';
import './ProcedureService.css';

const ProcedureService = () => {
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  const [availableProcedures, setAvailableProcedures] = useState([
    "Procedure 1", "Procedure 2", "Procedure 3", "Procedure 4"
  ]);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [patientId, setPatientId] = useState(1); // Example patientId, replace with dynamic value if needed

  const addProcedure = () => {
    if (selectedProcedure && !selectedProcedures.includes(selectedProcedure)) {
      setSelectedProcedures([...selectedProcedures, selectedProcedure]);
    }
  };

  const removeProcedure = (procedure) => {
    setSelectedProcedures(selectedProcedures.filter(item => item !== procedure));
  };

  const cancelSelection = () => {
    setSelectedProcedures([]);
  };

  const submitSelection = async () => {
    if (selectedProcedures.length === 0) {
      alert("No procedures selected.");
      return;
    }

    const payload = {
      serviceNames: selectedProcedures,
      patient: {
        patientId: patientId,
      },
    };

    try {
      const response = await axios.post('http://192.168.0.110:9000/api/services', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Data submitted successfully:', response.data);
      alert('Procedures saved successfully!');
    } catch (error) {
      console.error('Error saving procedures:', error);
      alert('Failed to save procedures.');
    }
  };

  return (
    <div className="procedures-service-container">
      <h3>Procedures/Services</h3>
      <div className="procedures-service-content">
        <label htmlFor="procedures">Procedures/Services:</label>
        <select
          id="procedures"
          value={selectedProcedure}
          onChange={(e) => setSelectedProcedure(e.target.value)}
        >
          <option value="">--Select--</option>
          {availableProcedures.map((procedure, index) => (
            <option key={index} value={procedure}>
              {procedure}
            </option>
          ))}
        </select>
        <button type="button" onClick={addProcedure} className="procedures-service-add">
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
