import React, { useState } from "react";
import SymptomChecklist from "./SymptomChecklist"; // Import the SymptomChecklist component
import "./SymptomsList.css"; // Import the updated CSS with component-specific styles
import DiseasesAsPerSymptoms from './DiseasesAsPerSymptoms';
import Medicines from './MedicinesAsPerDisease';
import Dosage from './DosageAsPerMedicines';
import Timings from './TimingsForMedicines';


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("symptoms");
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const handleSymptomsSelected = (selectedSymptoms) => {
    setSelectedSymptoms(selectedSymptoms);
  
    console.log("Selected Symptoms:", selectedSymptoms); // Properly logs the object
  };

  const handleDiseasesSelected = (updatedDiseases) => {
    console.log("Updated Diseases:prachi", updatedDiseases); // Log the selected diseases
    setSelectedDiseases(updatedDiseases); // Set the diseases to state
  };

  const handleMedicinesSelected = (selectedMedicine) => {
    console.log("Selected Medicine:", selectedMedicine); // **Changed**: Log selected medicine
    setSelectedMedicines((prevMedicines) => {
      const updatedMedicines = prevMedicines.includes(selectedMedicine)
        ? prevMedicines.filter(med => med !== selectedMedicine) // Remove if already selected
        : [...prevMedicines, selectedMedicine]; // Add if not selected
      
      console.log("Updated Selected Medicines:", updatedMedicines); // **Changed**: Log the updated list of selected medicines
      return updatedMedicines;
    });
  };


  return (
    <div className="Tabs-container"> {/* Updated with Tabs-container class */}
      <ul className="Tabs-nav"> {/* Updated with Tabs-nav class */}
        <li
          className={activeTab === "symptoms" ? "active" : ""}
          onClick={() => setActiveTab("symptoms")}
        >
          Symptoms
        </li>
        <li
          className={activeTab === "diseases" ? "active" : ""}
          onClick={() => setActiveTab("diseases")}
        >
          Diseases
        </li>
        <li
          className={activeTab === "medication" ? "active" : ""}
          onClick={() => setActiveTab("medication")}
        >
          Medication
        </li>
        <li
          className={activeTab === "dosage" ? "active" : ""}
          onClick={() => setActiveTab("dosage")}
        >
          Dosage
        </li>
        <li
          className={activeTab === "timing" ? "active" : ""}
          onClick={() => setActiveTab("timing")}
        >
          Timing
        </li>
      </ul>

      <div className="Tabs-content"> {/* Updated with Tabs-content class */}
        {activeTab === "symptoms" && <SymptomChecklist onSymptomsSelected={handleSymptomsSelected} />} {/* Integrated SymptomChecklist component */}
        
     

        {activeTab === "diseases" && <DiseasesAsPerSymptoms selectedSymptoms={selectedSymptoms} onDiseasesSelected={handleDiseasesSelected} />}
      {activeTab === "medication" && <Medicines selectedDiseases={selectedDiseases} onMedicinesSelected={handleMedicinesSelected} />}

      {activeTab === "dosage" && <Dosage selectedMedicines={selectedMedicines} />}
        {activeTab === "timing" && <Timings selectedMedicines={selectedMedicines} />}
      </div>
    </div>
  );
};

export default Tabs;
