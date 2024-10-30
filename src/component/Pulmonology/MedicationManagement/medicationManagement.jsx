import React, { useState, useEffect, useRef } from 'react';
import './MedicationManagement.css'; 
import axios from 'axios';

const MedicationManagement = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [medications, setMedications] = useState([]); // To store medication data
  const [newMedication, setNewMedication] = useState({
    medicationId: '', patientId: '', patientName: '', medicationName: '', dosage: '', startDate: '', endDate: '', result: ''
  });

  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [patients, setPatients] = useState([]); // To store patient data
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const [filteredPatients, setFilteredPatients] = useState([]); // Filtered patients based on search

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Fetch medications from backend
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/medications');
        setMedications(response.data); // Set medications data from the response
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);

  // Filter patients based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = patients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]);
    }
  }, [searchQuery, patients]);

  // Handle adding or updating a medication
  const handleAddMedication = async () => {
    try {
      if (newMedication.medicationId) {
        // Update existing medication
        const response = await axios.put(`http://localhost:8052/api/medications/${newMedication.medicationId}`, newMedication);
        setMedications(medications.map(med => med.medicationId === newMedication.medicationId ? response.data : med));
      } else {
        // Add new medication
        const response = await axios.post('http://localhost:8052/api/medications', newMedication);
        setMedications([...medications, response.data]);
      }

      // Reset form and close modal
      setNewMedication({
        medicationId: '', patientId: '', patientName: '', medicationName: '', dosage: '', startDate: '', endDate: '', result: ''
      });

      setShowAddMedicationModal(false);
    } catch (error) {
      console.error('Error saving medication:', error);
    }
  };

  // Handle editing a medication
  const handleEditMedication = (medication) => {
    setNewMedication(medication);
    setShowAddMedicationModal(true);
  };

  // Handle deleting a medication
  const handleDeleteMedication = async (medicationId) => {
    if (window.confirm("Are you sure you want to delete this medication?")) {
      try {
        await axios.delete(`http://localhost:8052/api/medications/${medicationId}`);
        setMedications(medications.filter(med => med.medicationId !== medicationId));
      } catch (error) {
        console.error('Error deleting medication:', error);
      }
    }
  };

  // Handle adding a medication for a specific patient
  const handleAddMedicationForPatient = (patient) => {
    setNewMedication({
      medicationId: '',
      patientId: patient.patientId,
      patientName: `${patient.firstName} ${patient.lastName}`,
      medicationName: '',
      dosage: '',
      startDate: '',
      endDate: '',
      result: ''
    });
    setShowAddMedicationModal(true);
  };

  return (
    <div className="medication-management-container">
      <input
        type="text"
        placeholder="Search Patient by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="medication-management-search"
      />
      <button className='medication-management-btn' onClick={() => setShowAddMedicationModal(true)}>Add Medication</button>

      {/* Display filtered patients based on search */}
      {filteredPatients.length > 0 && (
        <div className="medication-management-patient-table">
          <h3>Patients matching "{searchQuery}":</h3>
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.patientId}>
                  <td>{patient.patientId}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>
                    <button onClick={() => handleAddMedicationForPatient(patient)}>
                      Add Medication
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table to display all medications */}
      <table ref={tableRef} className="medication-management-table">
        <thead>
          <tr>
            {["Medication ID", "Patient ID", "Patient Name", "Medication Name", "Dosage", "Start Date", "End Date", "Result", "Actions"].map((header, index) => (
              <th key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {medications.map((medication, index) => (
            <tr key={index}>
              <td>{medication.medicationId}</td>
              <td>{medication.patientId}</td>
              <td>{medication.patientName}</td>
              <td>{medication.medicationName}</td>
              <td>{medication.dosage}</td>
              <td>{medication.startDate}</td>
              <td>{medication.endDate}</td>
              <td>{medication.result}</td>
              <td>
                <button className='medication-management-edit-btn' onClick={() => handleEditMedication(medication)}>Edit</button>
                <button className='medication-management-edit-btn' onClick={() => handleDeleteMedication(medication.medicationId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to add or edit medications */}
      {showAddMedicationModal && (
        <div className="medication-management-modal" onClick={() => setShowAddMedicationModal(false)}>
          <div className="medication-management-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{newMedication.medicationId ? 'Edit Medication' : 'Add New Medication'}</h2>
            <div className="medication-management-modal-contentform">
              <label>Patient ID:</label>
              <input
                type="text"
                value={newMedication.patientId}
                readOnly
              />
            </div>
            <div className="medication-management-modal-contentform">
              <label>Patient Name:</label>
              <input
                type="text"
                value={newMedication.patientName}
                readOnly
              />
            </div>
            <div className="medication-management-modal-contentform">
              <label>Medication Name:</label>
              <input
                type="text"
                value={newMedication.medicationName}
                onChange={(e) => setNewMedication({ ...newMedication, medicationName: e.target.value })}
              />
            </div>
            <div className="medication-management-modal-contentform">
              <label>Dosage:</label>
              <input
                type="text"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
              />
            </div>
            <div className="medication-management-modal-contentform">
              <label>Start Date:</label>
              <input
                type="date"
                value={newMedication.startDate}
                onChange={(e) => setNewMedication({ ...newMedication, startDate: e.target.value })}
              />
            </div>
            <div className="medication-management-modal-contentform">
              <label>End Date:</label>
              <input
                type="date"
                value={newMedication.endDate}
                onChange={(e) => setNewMedication({ ...newMedication, endDate: e.target.value })}
              />
            </div>
            <div className="medication-management-modal-contentform">
              <label>Result:</label>
              <input
                type="text"
                value={newMedication.result}
                onChange={(e) => setNewMedication({ ...newMedication, result: e.target.value })}
              />
            </div>
            <button onClick={handleAddMedication}>{newMedication.medicationId ? 'Update Medication' : 'Add Medication'}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationManagement;
