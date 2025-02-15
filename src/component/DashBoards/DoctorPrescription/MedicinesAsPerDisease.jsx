import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import "./MedicinesAsPerDisease.css"; // Import styles

const Medicines = ({ selectedDiseases, onMedicinesSelected }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Effect Triggered, Selected Diseases:", selectedDiseases);
  }, [selectedDiseases]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/diseases`)
      .then((response) => {
        const medicinesData = response.data
          .filter((disease) => selectedDiseases.includes(disease.name))
          .flatMap((disease) =>
            disease.medicationPrescriptions.flatMap((prescription) =>
              prescription.pharmacyItemsDosage.map((item) => {
                return {
                  diseaseName: disease.name,
                  itemName: item?.pharmacyItemMasterDTO?.itemName ?? "Unknown",
                  dosage: item.dosage,
                };
              })
            )
          );

        setMedications(medicinesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicine data:", error);
        setLoading(false);
      });
  }, [selectedDiseases]);

  const handleMedicineChange = (itemName) => {
    onMedicinesSelected(itemName);
  };

  return (
    <div className="Medicines-container">
      <h2>Recommended Medicines</h2>
      {loading ? (
        <p>Loading medicines...</p>
      ) : medications.length > 0 ? (
        <ul>
          {medications.map((med, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  value={med.itemName}
                  onChange={() => handleMedicineChange(med.itemName)}
                />{" "}
                {med.itemName}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p>No medicines available for the selected diseases.</p>
      )}
    </div>
  );
};

export default Medicines;
