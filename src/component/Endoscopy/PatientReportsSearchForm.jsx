  /* Mohini_Endoscopy_PatientReportsSearchForm_18-10-24 */
import React, { useState } from 'react';
import './PatientReportsSearchForm.css';
const PatientReportsSearchForm = ({ onSearch }) => {
  const [patientIdentifier, setPatientIdentifier] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [procedureType, setProcedureType] = useState('');
  const [reportType, setReportType] = useState('');
  const [doctor, setDoctor] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      patientIdentifier,
      fromDate,
      toDate,
      procedureType,
      reportType,
      doctor,
      status,
    });
  };

  return (
    <form className="patient-report-search-form" onSubmit={handleSearch}>
      <h2 className="patient-report-search-form-title">Patient Reports Search</h2>

      <div className="patient-report-search-form-container">
        <div className="patient-report-search-form-left">
          <div className="patient-report-search-form-group">
            <label htmlFor="patientIdentifier">Patient ID/Name:</label>
            <input
              type="text"
              id="patientIdentifier"
              value={patientIdentifier}
              onChange={(e) => setPatientIdentifier(e.target.value)}
              placeholder="Enter Patient ID or Name"
              className="patient-report-search-input"
            />
          </div>

          <div className="patient-report-search-form-group">
            <label htmlFor="procedureType">Procedure Type:</label>
            <select
              id="procedureType"
              value={procedureType}
              onChange={(e) => setProcedureType(e.target.value)}
              className="patient-report-search-select"
            >
              <option value="">Select Procedure Type</option>
              <option value="Gastroscopy">Gastroscopy</option>
              <option value="Colonoscopy">Colonoscopy</option>
            </select>
          </div>

          <div className="patient-report-search-form-group">
            <label htmlFor="doctor">Doctor/Endoscopist:</label>
            <input
              type="text"
              id="doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              placeholder="Enter Doctor/Endoscopist Name"
              className="patient-report-search-input"
            />
          </div>
        </div>

        <div className="patient-report-search-form-right">
          <div className="patient-report-search-form-group">
            <label>Date Range:</label>
            <div className="patient-report-search-date-range">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="patient-report-search-input-date"
              />
              <span>to</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="patient-report-search-input-date"
              />
            </div>
          </div>

          <div className="patient-report-search-form-group">
            <label htmlFor="reportType">Report Type:</label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="patient-report-search-select"
            >
              <option value="">Select Report Type</option>
              <option value="Procedure Report">Procedure Report</option>
              <option value="Imaging">Imaging</option>
              <option value="Post-Procedure Notes">Post-Procedure Notes</option>
            </select>
          </div>

          <div className="patient-report-search-form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="patient-report-search-select"
            >
              <option value="">Select Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="In-progress">In-progress</option>
            </select>
          </div>
        </div>
      </div>

      <div className="patient-report-search-button-container">
        <button type="submit" className="patient-report-search-button">
          Search
        </button>
      </div>
    </form>
  );
};

export default PatientReportsSearchForm;
  /* Mohini_Endoscopy_PatientReportsSearchForm_18-10-24 */
