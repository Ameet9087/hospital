/* Mohini_Endoscopy_PostProcedureNotesForm_18-10-24 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProcedureSchedulingForm.css';

const PostProcedureNotesForm = () => {
  const initialState = {
    patientId: '',
    procedureType: '',
    procedureDateTime: '',
    endoscopistName: '',
    findings: '',
    biopsyTaken: 'No',
    postProcedureDiagnosis: '',
    postProcedureNotes: '',
    dischargeDateTime: '',
    followUpDate: '',
    postProcedureImaging: null,
    finalReport: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [patients, setPatients] = useState([]); // State to hold patient data

  useEffect(() => {
    // Fetch patient data from the API
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/endoscopy-patients/getAll');
        setPatients(response.data); // Set the fetched patients to state

        console.log(response.data+"aaaaaaaaaaaa")
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the data according to the API requirements
    const dataToSubmit = {
      id: 1, // Assuming patientId is used as id
      procedureDateTime: formData.procedureDateTime,
      findings: formData.findings,
      biopsyTaken: formData.biopsyTaken === 'Yes', // Convert to boolean
      postProcedureDiagnosis: formData.postProcedureDiagnosis,
      postProcedureNotes: formData.postProcedureNotes,
      dischargeDateTime: formData.dischargeDateTime,
      followUpDate: formData.followUpDate,
      procedureId: 2, // Update as necessary based on your application logic
      postProcedureImaging: formData.postProcedureImaging,
      finalReport: formData.finalReport,
    };

    try {
      const response = await axios.post(`http://localhost:8000/api/post-procedure-notes/patient/${formData.patientId}`, dataToSubmit);
      console.log('Form Submitted:', response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleReset = () => {
    setFormData(initialState); // Reset state to initial values
  };

  return (
    <form className="procedure-scheduling-form" onSubmit={handleSubmit}>
      <div className="procedure-scheduling-form-left">
        <div className="procedure-scheduling-form-group">
          <label htmlFor="patientId">Patient ID:</label>
          <select
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.patientId} 
              </option>
            ))}
          </select>
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="procedureType">Procedure Type:</label>
          <input
            type="text"
            id="procedureType"
            name="procedureType"
            value={formData.procedureType}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="procedureDateTime">Procedure Date and Time:</label>
          <input
            type="datetime-local"
            id="procedureDateTime"
            name="procedureDateTime"
            value={formData.procedureDateTime}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="endoscopistName">Endoscopist Name:</label>
          <input
            type="text"
            id="endoscopistName"
            name="endoscopistName"
            value={formData.endoscopistName}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="findings">Findings:</label>
          <textarea
            id="findings"
            name="findings"
            value={formData.findings}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="biopsyTaken">Biopsy Taken:</label>
          <select
            id="biopsyTaken"
            name="biopsyTaken"
            value={formData.biopsyTaken}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      <div className="procedure-scheduling-form-right">
        <div className="procedure-scheduling-form-group">
          <label htmlFor="postProcedureDiagnosis">Post Procedure Diagnosis:</label>
          <input
            type="text"
            id="postProcedureDiagnosis"
            name="postProcedureDiagnosis"
            value={formData.postProcedureDiagnosis}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="postProcedureNotes">Post Procedure Notes:</label>
          <textarea
            id="postProcedureNotes"
            name="postProcedureNotes"
            value={formData.postProcedureNotes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="dischargeDateTime">Discharge Date and Time:</label>
          <input
            type="datetime-local"
            id="dischargeDateTime"
            name="dischargeDateTime"
            value={formData.dischargeDateTime}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="followUpDate">Follow-Up Date:</label>
          <input
            type="date"
            id="followUpDate"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="postProcedureImaging">Post Procedure Imaging:</label>
          <input
            type="file"
            id="postProcedureImaging"
            name="postProcedureImaging"
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="finalReport">Final Report:</label>
          <input
            type="file"
            id="finalReport"
            name="finalReport"
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-actions">
          <button type="submit" className="procedure-scheduling-form-submit-btn">
            Submit
          </button>
          <button
            type="button"
            className="procedure-scheduling-form-submit-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostProcedureNotesForm;
/* Mohini_Endoscopy_PostProcedureNotesForm_18-10-24 */  
