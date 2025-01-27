import React, { useState } from "react";
import "./TreatmentGiven.css";
import { API_BASE_URL } from "../api/api";

const TreatmentGiven = ({ inPatientId, outPatientId, setIsModalOpen }) => {
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [inputText, setInputText] = useState("");

  const addTreatmentsFromInput = () => {
    const treatments = inputText
      .split("\n")
      .map((treatment) => treatment.trim())
      .filter((treatment) => treatment.length > 0);
    const newTreatments = treatments.filter(
      (treatment) => !selectedTreatments.includes(treatment)
    );
    setSelectedTreatments([...selectedTreatments, ...newTreatments]);
    setInputText("");
  };

  const removeTreatment = (treatment) => {
    setSelectedTreatments(
      selectedTreatments.filter((item) => item !== treatment)
    );
  };

  const cancelSelection = () => {
    setSelectedTreatments([]);
    setInputText("");
  };

  const submitSelection = async () => {
    if (selectedTreatments.length === 0) {
      alert("No treatments selected.");
      return;
    }

    try {
      const data = {
        treatmentDescriptions: selectedTreatments.join(", "),
        ...(inPatientId
          ? { inPatient: { inPatientId } }
          : { outPatient: { outPatientId } }),
      };
      console.log(data);

      const response = await fetch(`${API_BASE_URL}/treatments/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.statusText}, ${errorText}`);
      }

      const result = await response.json();
      console.log("Treatments added:", result);
      alert("Treatments successfully submitted!");
      setIsModalOpen(false);
      setSelectedTreatments([]);
      setInputText("");
    } catch (error) {
      console.error("Error submitting treatments:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="Treatment-Given-container">
      <h3>Treatment Given</h3>

      <div className="Treatment-Given-content">
        <div className="Treatment-Given-Add">
          <label htmlFor="treatments">Enter Treatments :</label>
          <textarea
            id="treatments"
            cols={50}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter treatments, one per line"
          />
        </div>

        <div className="Treatment-Given-btn">
          <button
            type="button"
            onClick={addTreatmentsFromInput}
            className="Treatment-Given-add"
          >
            +
          </button>
        </div>
      </div>

      <div id="selected-treatments" className="Treatment-Given-showcase">
        {selectedTreatments.length > 0 && (
          <ul>
            {selectedTreatments.map((treatment, index) => (
              <li key={index}>
                {index + 1}. {treatment}
                <button
                  type="button"
                  className="Treatment-Given-cut"
                  onClick={() => removeTreatment(treatment)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="Treatment-Given-action-buttons">
        <button
          type="button"
          onClick={cancelSelection}
          className="Treatment-Given-action-cancel"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={submitSelection}
          className="Treatment-Given-action-submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TreatmentGiven;
