import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import "./DiseasesAsPerSymptoms.css"; // Import styles

const Diseases = ({ selectedSymptoms, onDiseasesSelected }) => {
  const [diseases, setDiseases] = useState([]);
  const [symptomsNames, setSymptomsNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  // Fetch diseases from API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/diseases`)
      .then((response) => {
        const diseasesWithSymptoms = response.data.map((disease) => {
          return {
            ...disease,
            symptomsNames: disease.symptoms.map((symptom) => symptom.symptomsName),
          };
        });

        const allSymptomsNames = diseasesWithSymptoms.flatMap(
          (disease) => disease.symptomsNames
        );

        setDiseases(diseasesWithSymptoms);
        setSymptomsNames(allSymptomsNames);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching diseases data:", error);
        setLoading(false);
      });
  }, []);

  // Get the names of the selected symptoms (those with a true value)
  const selectedSymptomNames = Object.values(selectedSymptoms).filter(
    (symptomName) => symptomName
  );

  // Filter diseases based on selected symptoms
  const matchedDiseases = diseases.filter((disease) =>
    selectedSymptomNames.every((selectedSymptomName) =>
      disease.symptomsNames.includes(selectedSymptomName)
    )
  );
  const handleDiseaseChange = (event) => {
    const { value, checked } = event.target;

    setSelectedDiseases((prev) => {
      let updatedDiseases;

      // If checked, add the disease to the list
      if (checked) {
        updatedDiseases = [...prev, value]; // Add selected disease
      } else {
        updatedDiseases = prev.filter((disease) => disease !== value); // Remove deselected disease
      }

      // Pass the updated diseases to the parent component
      onDiseasesSelected(updatedDiseases);

      return updatedDiseases;
    });
  };


  return (
    <div className="Diseases-container">
      <h2>Possible Diseases</h2>
      {loading ? (
        <p>Loading diseases...</p>
      ) : matchedDiseases.length > 0 ? (
        <ul>
          {matchedDiseases.map((disease) => (
            <li key={disease.diseaseId}>
              <label>
                <input
                  type="checkbox"
                  value={disease.name}
                  onChange={handleDiseaseChange} // Track disease selection
                />
                {disease.name}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p>No diseases matched the selected symptoms.</p>
      )}
    </div>
  );
};

export default Diseases;
