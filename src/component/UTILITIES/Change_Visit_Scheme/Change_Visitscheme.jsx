import React, { useState } from 'react';
import axios from 'axios';
import './Change_Visitschememain.css';

function Change_Visitscheme() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [name, setName] = useState('');
  const [newScheme, setNewScheme] = useState('');
  const [newPriceCategory, setNewPriceCategory] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState(null);
 // Function to fetch patient details by name
 const fetchPatientDetails = async () => {
  try {
    const response = await axios.get('http://localhost:8989/api/change-visit-scheme/by-name', {
      params: { name }
    });
    if (response.data) {
      setPatientDetails(response.data);
      setIsVisible(true);
      setError(null);
    } else {
      setError('Patient not found');
      setPatientDetails(null);
    }
  } catch (err) {
    console.error('Error fetching patient details:', err);
    setError('An error occurred while fetching patient details.');
    setPatientDetails(null);
  }
};

// Function to handle saving the new scheme and price category
const handleSaveClick = async () => {
  try {
    await axios.put('http://localhost:8989/api/change-visit-scheme/update-new-scheme', null, {
      params: {
        name,
        newScheme,
        newPriceCategory,
        remarks
      }
    });
    setIsPopupVisible(false);
    alert('Data has been saved successfully!');
  } catch (err) {
    console.error('Error saving data:', err);
    setError('Failed to update the scheme.');
  }
};

// Handle form submission to search for patient details
const handleSearchSubmit = (e) => {
  e.preventDefault();
  fetchPatientDetails();
};

const handleConfirm = () => {
  handleSaveClick();
};

const handleCancel = () => {
  setIsPopupVisible(false);
};

  return (
    <div className="Change_Visitschememain">
      <div className="middleChange_Visitscheme">
        <div className="headingChange_Visitschememain">
          <h4>Change Scheme / Price Category</h4>
        </div>

        {/* Form to search patient by name */}
        <form onSubmit={handleSearchSubmit}>
          <div className="label_Change_Visitschememain">
            <label htmlFor="patientsearch">Select Patient:</label>
            <input 
              type="text" 
              placeholder="Search by hospital / patient name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Search</button>
        </form>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        {isVisible && patientDetails && (
          <div>
            <div className="patient-info">
              <div className="info-row">
                <span className="label">Patient Name:</span>
                <span className="value">{patientDetails.name}</span>
              </div>
              <div className="info-row">
                <span className="label">Hospital No:</span>
                <span className="value">{patientDetails.hospitalNumber}</span>
              </div>
              <div className="info-row">
                <span className="label">Age/Sex:</span>
                <span className="value">{patientDetails.ageSex}</span>
              </div>
              <div className="info-row">
                <span className="label">Contact No:</span>
                <span className="value">{patientDetails.contactNumber}</span>
              </div>
              <div className="info-row">
                <span className="label">Visit Type:</span>
                <span className="value">{patientDetails.visitType}</span>
              </div>
              <div className="info-row">
                <span className="label">Inpatient No:</span>
                <span className="value">{patientDetails.inpatientNumber}</span>
              </div>
              <div className="info-row">
                <span className="label">Address:</span>
                <span className="value">{patientDetails.address}</span>
              </div>
            </div>

            <div className="scheme-info">
              <span className="label">Current Scheme:</span>
              <span className="value">{patientDetails.currentScheme}</span>
              <span className="label">Current Price Category:</span>
              <span className="value">{patientDetails.currentPriceCategory}</span>
            </div>

            {/* Form to update the scheme */}
            <div className="change-form">
              <h3>Change To:</h3>
              <div className="form-row">
                <label>Select New Scheme:</label>
                <select value={newScheme} onChange={(e) => setNewScheme(e.target.value)}>
                  <option value="">---Select New Scheme---</option>
                  <option value="Scheme A">Scheme A</option>
                  <option value="Scheme B">Scheme B</option>
                  <option value="Scheme C">Scheme C</option>
                </select>
              </div>
              <div className="form-row">
                <label>Select New Price Category:</label>
                <select value={newPriceCategory} onChange={(e) => setNewPriceCategory(e.target.value)}>
                  <option value="">---Select New Price Category---</option>
                  <option value="Category A">Category A</option>
                  <option value="Category B">Category B</option>
                  <option value="Category C">Category C</option>
                </select>
              </div>
              <div className="form-row">
                <label>Remarks:</label>
                <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Save button to trigger popup confirmation */}
        {isVisible && patientDetails && (
          <div className="btn_Change_Visitschememain">
            <button
              className="btn_Change_Visitschememainsave btn btn-success"
              onClick={() => setIsPopupVisible(true)}
            >
              Save
            </button>
            <button className="btn_Change_Visitschememaindiscard" onClick={() => setIsVisible(false)}>Discard</button>
          </div>
        )}

        {/* Popup Modal */}
        {isPopupVisible && (
          <div className="popup">
            <div className="popup-content">
              <h2>Confirm!</h2>
              <p>Are you sure you want to save the changes?</p>
              <div className="popup-buttons">
                <button className="btn btn-success" onClick={handleConfirm}>Yes</button>
                <button className="btn btn-danger" onClick={handleCancel}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Change_Visitscheme;
