import React from 'react';
import './ClinicalDashBoard.css';

const ClinicalMedication = () => {
  return (
    <div className="ClinicalDashBoard-medication-list">
      <header className='ClinicalDashBoard-header'>
        <h1 className='ClinicalDashBoard-h1'>Medication List</h1>
        <button className="ClinicalDashBoard-add-btn">Add</button>
        <span>Add Home Medication</span>
        <button className="ClinicalDashBoard-close-btn">×</button>
      </header>
      <div className="ClinicalDashBoard-content">
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Type</th>
              <th>Dose</th>
              <th>Route</th>
              <th>Last Taken</th>
              <th>Frequency</th>
              <th>Comments</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PARACETAMOL INJ.</td>
              <td>CURRENT</td>
              <td>1 G</td>
              <td>Injection Routes</td>
              <td>2024-08-12</td>
              <td>3</td>
              <td></td>
              <td><button className="ClinicalDashBoard-edit-btn">Edit</button></td>
            </tr>
            <tr>
              <td>Sodium Chloride (Normal Saline) 0.9% 500MI</td>
              <td>CURRENT</td>
              <td>1000 ml</td>
              <td>Injection Routes</td>
              <td>2024-08-12</td>
              <td>2</td>
              <td></td>
              <td><button className="ClinicalDashBoard-edit-btn">Edit</button></td>
            </tr>
          </tbody>
        </table>
        <form className="ClinicalDashBoard-add-medication-form">
          <h2>Type:</h2>
          <div className="ClinicalDashBoard-radio-group">
            <input type="radio" id="current" name="type" value="current" />
            <label htmlFor="current">Current</label>
            <input type="radio" id="home" name="type" value="home" />
            <label htmlFor="home">Home</label>
          </div>
          <div className="ClinicalDashBoard-form-group">
            <label htmlFor="name">Name *</label>
            <input type="text" id="name" placeholder="MedicationName" required />
          </div>
          <div className="ClinicalDashBoard-form-group">
            <label htmlFor="dose">Dose *</label>
            <input type="text" id="dose" required />
          </div>
          <div className="ClinicalDashBoard-form-group">
            <label htmlFor="route">Route *</label>
            <select id="route" required>
              <option value="">Select route</option>
            </select>
          </div>
          <div className="ClinicalDashBoard-form-group">
            <label htmlFor="frequency">Frequency *</label>
            <input type="text" id="frequency" required />
          </div>
          <div className="ClinicalDashBoard-form-group">
            <label htmlFor="lastTaken">Last Taken *</label>
            <input type="date" id="lastTaken" value="2024-08-25" required />
          </div>
          <div className="ClinicalDashBoard-form-group">
            <label htmlFor="comments">Comments</label>
            <textarea id="comments"></textarea>
          </div>
          <button type="submit" className="ClinicalDashBoard-add-btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default ClinicalMedication;
