import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './ProcedureSchedulingForm.css';

const ProcedureSchedulingForm = () => {
  const initialState = {
    patientId: 3,  // Assuming a specific patient ID; change as necessary
    patientName: '',
    dob: '',
    sex: '',
    procedureType: 'Endoscopy',  // Default to 'Endoscopy'
    scheduledDateTime: '2024-10-23T14:00:00', // Default value for demonstration; change as necessary
    referringPhysician: 'Dr. Williams', // Default for demonstration
    endoscopistName: 'Dr. Johnson', // Default for demonstration
    procedureRoom: 'Room 1', // Default for demonstration
    diagnosis: 'GERD', // Default for demonstration
    anesthesiaRequired: false,
    specialInstructions: 'Ensure hydration before the procedure.',
    consentFormSigned: true,
    endoscopeId: 2
  };

  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/procedures');
        setProcedures(response.data);
      } catch (err) {
        setError('Failed to fetch procedures.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedures();
  }, []);

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {


        procedureType: formData.procedureType,
        scheduledDateTime: formData.scheduledDateTime,
        referringPhysician: formData.referringPhysician,
        endoscopistName: formData.endoscopistName,
        procedureRoom: formData.procedureRoom,
        preProcedureDiagnosis: formData.preProcedureDiagnosis,
        anesthesiaRequired: formData.anesthesiaRequired,
        consentFormSigned: formData.consentFormSigned,
        specialInstructions: formData.specialInstructions,
        patientId: formData.patientId,
        endoscopeId: formData.endoscopeId
    };

    try {
        const response = await axios.post('http://localhost:8000/api/procedures', requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response.data);

        alert("Data submitted")
    } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else {
            // Something else happened while setting up the request
            console.error('Error message:', error.message);
        }
    }
};

  const handleReset = () => {
    setFormData(initialState); // Reset form to initial state
  };

  return (
    <>
    <form className="procedure-scheduling-form" onSubmit={handleSubmit}>
      <div className="procedure-scheduling-form-left">
        <div className="procedure-scheduling-form-group">
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="sex">Sex:</label>
          <select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
            placeholder="e.g., Colonoscopy, Gastroscopy"
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="scheduledDateTime">Scheduled Date and Time:</label>
          <input
            type="datetime-local"
            id="scheduledDateTime"
            name="scheduledDateTime"
            value={formData.scheduledDateTime}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label>Anesthesia Required</label>
          <input
            type="checkbox"
            name="anesthesiaRequired"
            checked={formData.anesthesiaRequired}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="procedure-scheduling-form-right">
        <div className="procedure-scheduling-form-group">
          <label htmlFor="referringPhysician">Referring Physician:</label>
          <input
            type="text"
            id="referringPhysician"
            name="referringPhysician"
            value={formData.referringPhysician}
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
          <label htmlFor="procedureRoom">Procedure Room:</label>
          <input
            type="text"
            id="procedureRoom"
            name="procedureRoom"
            value={formData.procedureRoom}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="diagnosis">Pre-procedure Diagnosis:</label>
          <textarea
            id="diagnosis"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="procedure-scheduling-form-group">
          <label>Consent Form Signed</label>
          <input
            type="checkbox"
            name="consentFormSigned"
            checked={formData.consentFormSigned}
            onChange={handleChange}
          />
        </div>

        <div className="procedure-scheduling-form-group">
          <label htmlFor="specialInstructions">Special Instructions:</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
          ></textarea>
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
    <div className="procedure-list">
      <h2>Procedure List</h2>
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Procedure Type</th>
            <th>Scheduled Date</th>
            <th>Referring Physician</th>
            <th>Endoscopist</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {procedures.map((procedure) => (
            <tr key={procedure.id}>
              <td>{procedure.patientId}</td>
              <td>{procedure.patientName}</td>
              <td>{procedure.procedureType}</td>
              <td>{new Date(procedure.scheduledDateTime).toLocaleString()}</td>
              <td>{procedure.referringPhysician}</td>
              <td>{procedure.endoscopistName}</td>
              {/* <td>
                <button onClick={() => alert(`View details for ${procedure.id}`)}>View</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ProcedureSchedulingForm;
