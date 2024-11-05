import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProcedureSchedulingForm.css';

const ProcedureSchedulingForm = () => {
  const initialState = {
    patientId: 3,
    patientName: '',
    dob: '',
    sex: '',
    procedureType: 'Endoscopy',
    scheduledDateTime: '2024-10-23T14:00:00',
    referringPhysician: 'Dr. Williams',
    endoscopistName: 'Dr. Johnson',
    procedureRoom: 'Room 1',
    diagnosis: 'GERD',
    anesthesiaRequired: false,
    specialInstructions: 'Ensure hydration before the procedure.',
    consentFormSigned: true,
    endoscopeId: 2
  };

  const [formData, setFormData] = useState(initialState);
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filterDate, setFilterDate] = useState('');

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
      alert("Data submitted");
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const filteredProcedures = procedures.filter((procedure) => {
    const matchesSearchText = procedure.patientName.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilterDate = filterDate ? new Date(procedure.scheduledDateTime).toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;
    return matchesSearchText && matchesFilterDate;
  });

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
      
      <div className="procedure-filters">
        <input
          type="text"
          placeholder="Search by Patient Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="date"
          placeholder="Filter by Date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div className="procedure-list">
        <h2>Procedure List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Procedure Type</th>
                <th>Scheduled Date</th>
                <th>Referring Physician</th>
                <th>Endoscopist</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcedures.map((procedure) => (
                <tr key={procedure.id}>
                  <td>{procedure.patientId}</td>
                  <td>{procedure.patientName}</td>
                  <td>{procedure.procedureType}</td>
                  <td>{new Date(procedure.scheduledDateTime).toLocaleString()}</td>
                  <td>{procedure.referringPhysician}</td>
                  <td>{procedure.endoscopistName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProcedureSchedulingForm;
