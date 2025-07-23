import React, { useState, useEffect, useRef } from 'react';
import './respiratoryFunctionTests.css';
import axios from 'axios';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
function RespiratoryFunctionTests() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    testId: '',
    patientId: '',
    patientName: '',
    testDate: '',
    testType: '',
    testResult: ''
  });
  const [patients, setPatients] = useState([]); // Store fetched patients here
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTests, setFilteredTests] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch all patients from the backend when the component is mounted
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/patients');
        setPatients(response.data); // Store the patients in state
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Fetch all respiratory function tests from the backend when the component is mounted
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/respiratory-tests');
        setTests(response.data); // Store the fetched tests in state
        setFilteredTests(response.data); // Set filtered tests initially to the fetched tests
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  // Filter tests and patients by search query
  useEffect(() => {
    if (searchQuery) {
      const filteredTestList = tests.filter(test =>
        test.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredPatientList = patients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTests(filteredTestList);
      setFilteredPatients(filteredPatientList);
    } else {
      setFilteredTests(tests);
      setFilteredPatients([]);
    }
  }, [searchQuery, tests, patients]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest({ ...newTest, [name]: value });
  };

  const handleAddOrUpdateTest = async () => {
    try {
      if (editIndex !== null) {
        // Update (PUT) the existing test
        const testToUpdate = tests[editIndex];
        const updatedTest = { ...newTest, testId: testToUpdate.testId }; // Include the testId for the update
        const response = await axios.put(`http://localhost:8052/api/respiratory-tests/${testToUpdate.testId}`, updatedTest);
        
        const updatedTests = [...tests];
        updatedTests[editIndex] = response.data; // Update test in the state with the response from the server
        setTests(updatedTests);
      } else {
        // Add new test (POST)
        const response = await axios.post('http://localhost:8052/api/respiratory-tests', newTest);
        setTests([...tests, response.data]); // Add the new test to the list with the response from the server
      }
  
      // Reset form and modal
      setNewTest({ testId: '', patientId: '', patientName: '', testDate: '', testType: '', testResult: '' });
      setShowAddTestModal(false);
      setEditIndex(null);
    } catch (error) {
      console.error('Error saving test:', error);
    }
  };
  

  const handleDeleteTest = async (index) => {
    const testToDelete = tests[index];
    
    try {
      // Make the delete request to the backend
      await axios.delete(`http://localhost:8052/api/respiratory-tests/${testToDelete.testId}`);
      
      // Update state to remove the deleted test
      setTests(tests.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };
  

  const handleAddTestForPatient = (patient) => {
    setNewTest({
      patientId: `${patient.patientId}`,
      patientName: `${patient.firstName} ${patient.lastName}`,
      testDate: '',
      testType: '',
      testResult: ''
    });
    setShowAddTestModal(true);
  };
  const handleEditTest = (test, index) => {
    setNewTest(test); // Load test details into the form for editing
    setEditIndex(index); // Track the index of the test being edited
    setShowAddTestModal(true); // Show the modal
  };
  return (
    <div className="pulmonology-respiratoryfuntest-container">
      <div className="pulmonology-respiratoryfuntest-actions">
        <input
          type="text"
          placeholder="Search by Patient Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pulmonology-respiratoryfuntest-search"
        />
      </div>

      {/* Show patients matching the search in a table format with an "Add Test" button */}
      {filteredPatients.length > 0 && (
        <div className="pulmonology-respiratoryfuntest-patienttable">
          <h3>Patients matching "{searchQuery}":</h3>
          <table className="patient-table">
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
                    <button onClick={() => handleAddTestForPatient(patient)}>
                      Add Test
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <table ref={tableRef}>
        <thead>
          <tr>
            {['Test ID', 'Patient Name', 'Test Date', 'Test Type', 'Test Result', 'Actions'].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTests.map((test, index) => (
            <tr key={index}>
              <td>{test.testId}</td>
              <td>{test.patientName}</td>
              <td>{test.testDate}</td>
              <td>{test.testType}</td>
              <td>{test.testResult}</td>
              <td>
                <button className='pulmonology-respiratoryfuntest-modal-edit-btn' onClick={() => handleEditTest(test, index)}>Edit</button>
                <button  className='pulmonology-respiratoryfuntest-modal-edit-btn' onClick={() => handleDeleteTest(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddTestModal && (
        <div className="pulmonology-respiratoryfuntest-modal" onClick={() => setShowAddTestModal(false)}>
          <div className="pulmonology-respiratoryfuntest-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editIndex !== null ? 'Edit Test' : 'Add New Test'}</h2>
            <div className='pulmonology-respiratoryfuntest-modal-contentform'>
              <label>Patient Name:</label>
              <input
                type="text"
                name="patientName"
                value={newTest.patientName}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className='pulmonology-respiratoryfuntest-modal-contentform'>
              <label>Patient ID:</label>
              <input
                type="text"
                name="patientId"
                value={newTest.patientId}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className='pulmonology-respiratoryfuntest-modal-contentform'>
              <label>Test Date:</label>
              <input
                type="date"
                name="testDate"
                value={newTest.testDate}
                onChange={handleInputChange}
              />
            </div>
            <div className='pulmonology-respiratoryfuntest-modal-contentform'>
              <label>Test Type:</label>
              <input
                type="text"
                name="testType"
                value={newTest.testType}
                onChange={handleInputChange}
              />
            </div>
            <div className='pulmonology-respiratoryfuntest-modal-contentform'>
              <label>Test Result:</label>
              <input
                type="text"
                name="testResult"
                value={newTest.testResult}
                onChange={handleInputChange}
              />
            </div>
            <div className="pulmonology-respiratoryfuntest-modal-btns">
              <button className="pulmonology-respiratoryfuntest-modal-edit-btn"onClick={handleAddOrUpdateTest}>Save</button>
              <button onClick={() => setShowAddTestModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RespiratoryFunctionTests;
