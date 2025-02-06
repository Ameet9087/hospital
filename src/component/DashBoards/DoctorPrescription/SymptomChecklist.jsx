import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SymptomChecklist.css"; // Import CSS file
import { API_BASE_URL } from "../../api/api";
import { Route, Routes, useNavigate } from "react-router-dom";

const SymptomChecklist = ({ onSymptomsSelected }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setModalContent(<h5>Loading {path} content...</h5>); // Set loading message or actual content
    setShowModal(true);
    navigate(path); // Optionally, navigate in the background (useful if you need to update the URL)
  };
  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchSymptomCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/symptom-categories`);
        setCategories(response.data); // Set fetched data
      } catch (error) {
        console.error("Error fetching symptom categories", error);
      }
    };

    fetchSymptomCategories();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (symptomId, symptomName) => {
    setSelectedSymptoms((prev) => {
      const updatedSymptoms = { ...prev };

      if (updatedSymptoms[symptomId]) {
        delete updatedSymptoms[symptomId]; // Remove if unchecked
      } else {
        updatedSymptoms[symptomId] = symptomName; // Store name instead of true
      }

      onSymptomsSelected(updatedSymptoms);

      return updatedSymptoms;
    });
  };

  return (
    <div className="SymptomChecklist-container">
      <h1 className="SymptomChecklist-title">Daily Symptom Checklist</h1>
      {categories.length > 0 ? (
        categories.map(({ symptomCategoryId, category, symptoms }) => (
          <div key={symptomCategoryId} className="SymptomChecklist-category">
            <h2>{category}</h2>
            <div className="SymptomChecklist-grid">
              {symptoms.map(({ symptomId, symptomsName }) => (
                <div key={symptomId} className="SymptomChecklist-item">
                  <input
                    type="checkbox"
                    id={`symptom-${symptomId}`}
                    checked={!!selectedSymptoms[symptomId]}
                    onChange={() => handleCheckboxChange(symptomId, symptomsName)}
                  />
                  <label htmlFor={`symptom-${symptomId}`}>{symptomsName}</label>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading symptoms...</p>
      )}
      <div className="right-aligned-link" onClick={() => handleNavigation("/settings/prescription/symptoms-category")}>
        Add More Symptoms
      </div>


      {/* Custom Modal */}
      {showModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <div className="modal-header">
              <button className="close-btn" onClick={closeModal}>×</button>
              <h2>Symptoms Category</h2>
            </div>
            <div className="modal-body">
              {/* Render the modal content here */}
              {modalContent}
            </div>
            <div className="modal-footer">
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default SymptomChecklist;
