import React, { useState } from 'react';
import './TreatmentGiven.css';

const TreatmentGiven = () => {
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [inputText, setInputText] = useState("");
  const [patientId, setPatientId] = useState(1); // Replace this with dynamic patient ID if necessary

  // Add treatments from the input textarea
  const addTreatmentsFromInput = () => {
    const treatments = inputText
      .split('\n')  // Split by newline
      .map(treatment => treatment.trim())  // Trim whitespace
      .filter(treatment => treatment.length > 0);  // Remove empty lines
    
    // Add only unique treatments
    const newTreatments = treatments.filter(treatment => !selectedTreatments.includes(treatment));
    setSelectedTreatments([...selectedTreatments, ...newTreatments]);
    setInputText(""); // Clear the input field after adding
  };

  // Remove a specific treatment from the list
  const removeTreatment = (treatment) => {
    setSelectedTreatments(selectedTreatments.filter(item => item !== treatment));
  };

  // Clear all selected treatments
  const cancelSelection = () => {
    setSelectedTreatments([]);
    setInputText(""); // Clear input text as well
  };

  // Submit the selected treatments to the backend
  const submitSelection = async () => {
    if (selectedTreatments.length === 0) {
      alert("No treatments selected.");
      return;
    }

    try {
      // Prepare data to be sent
      const data = {
        treatmentDescriptions: selectedTreatments,
        patient: {
          patientId: patientId // Ensure this is correctly passed as an object
        }
      };

      // Send data to backend
      const response = await fetch('http://192.168.0.110:9000/api/treatments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the response text for error details
        throw new Error(`Server error: ${response.statusText}, ${errorText}`);
      }

      const result = await response.json();
      console.log("Treatments added:", result);
      alert('Treatments successfully submitted!');
      
      // Clear input fields and selected treatments after successful submission
      setSelectedTreatments([]);
      setInputText("");
    } catch (error) {
      console.error('Error submitting treatments:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="Treatment-Given-container">
      <h3>Treatment Given</h3>
      
      <div className='Treatment-Given-content'>
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

        <div className='Treatment-Given-btn'>
          <button type="button" onClick={addTreatmentsFromInput} className='Treatment-Given-add'>+</button>
        </div>
      </div>
      
      <div id="selected-treatments" className='Treatment-Given-showcase'>
        {selectedTreatments.length > 0 && (
          <ul>
            {selectedTreatments.map((treatment, index) => (
              <li key={index}>
                {index + 1}. {treatment}
                <button type="button" className='Treatment-Given-cut' onClick={() => removeTreatment(treatment)}>
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="Treatment-Given-action-buttons">
        <button type="button" onClick={cancelSelection} className='Treatment-Given-action-cancel'>Cancel</button>
        <button type="button" onClick={submitSelection} className='Treatment-Given-action-submit'>Submit</button>
      </div>
    </div>
  );
};

export default TreatmentGiven;
