/* Ajhar Tamboli patientQueueDisplay.jsx 09-10-24 */


import React, { useState, useEffect } from 'react';
import "./patientQueueDisplay.css";
import AddPatientQueueDisplay from "./addPatientQueueDisplay";

const PatientQueueDisplay = () => {
  const [labTests, setLabTests] = useState([]); // Patient data
  const [showPopup, setShowPopup] = useState(false); // For showing the popup
  const [selectedPatient, setSelectedPatient] = useState(null); // For editing patient data
  const [isEditing, setIsEditing] = useState(false); // To determine whether it's an add or edit action

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const recordsPerPage = 10; // Number of records per page

  // Search state
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch data from the API
  useEffect(() => {
    fetchPatientsQueue();
  }, []);

  const fetchPatientsQueue = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/patientsqueue/allpatients');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Patient Data:', data); // Log the fetched data
        setLabTests(data); // Set the fetched data
      } else {
        console.error('Failed to fetch patient queue data');
      }
    } catch (error) {
      console.error('Error fetching patient queue:', error);
    }
  };

  // Filter labTests based on search term
  const filteredLabTests = labTests.filter(patient => {
    // Return true if the searchTerm is empty or if the patient name includes the searchTerm
    return searchTerm === '' || (patient && patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  // Pagination calculations
  const totalResults = filteredLabTests.length;
  const totalPages = Math.ceil(totalResults / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredLabTests.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddUpdate = async (formData) => {
    const apiUrl = selectedPatient ? `http://localhost:8080/api/patientsqueue/update/${formData.id}` : 'http://localhost:8080/api/patientsqueue/add';
    const method = selectedPatient ? 'PUT' : 'POST';

    console.log('Sending Data:', formData); // Log the data being sent

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the error message from the response
        throw new Error(`Failed to save patient queue data: ${errorText}`);
      }

      const result = await response.json();
      console.log(result); // Handle the result as needed

      fetchPatientsQueue();
      handleClosePopup(); // Close the form after successful submission
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle errors (e.g., show a notification)
    }
  };

  // Show popup for adding a new patient
  const handleAddPatientQueueDisplay = () => {
    setSelectedPatient(null); // Clear previous selection
    setIsEditing(false); // Not editing, this is a new addition
    setShowPopup(true); // Show the popup
  };

  // Show popup for editing a patient
  const handleEditPatientQueueDisplay = (patient) => {
    setSelectedPatient(patient); // Set selected patient data for editing
    setIsEditing(true); // It's an edit action
    setShowPopup(true); // Show the popup
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPatient(null); // Clear selection when closing
  };

  return (
    <div className="patientQueueDisplay-container">
      <div className="patientQueueDisplay-firstRow">
        <div className="patientQueueDisplay-addBtn">
          <button className="patientQueueDisplay-add-button" onClick={handleAddPatientQueueDisplay}>
            +Add Patient Queue Display
          </button>
        </div>
      </div>

      <div className="patientQueueDisplay-controls">
        <div className="patientQueueDisplay-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
          <button className="patientQueueDisplay-star-button">☆</button>
          <button className="patientQueueDisplay-ok-button">OK</button>
        </div>
      </div>

      <div className='patientQueueDisplay-search-N-result'>
        <div className="patientQueueDisplay-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Patient Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>
        <div className="patientQueueDisplay-results-info">
          <span>Showing {currentRecords.length} / {totalResults} results</span>
          <button className="patientQueueDisplay-print-button">
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Queue ID</th>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Department</th>
            <th>Consultation Type</th>
            <th>Appointment No</th>
            <th>Service Provider</th>
            <th>Mobile No</th>
            <th>Appointment Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((test, index) => (
            <tr key={test.id}> {/* Use a unique key for each row */}
              <td>{test.queueNumber}</td>
              <td>{test.id}</td>
              <td>{test.name}</td>
              <td>{test.ageGender}</td>
              <td>{test.department}</td>
              <td>{test.consultationType}</td>
              <td>{test.appointmentNumber}</td>
              <td>{test.serviceProvider}</td>
              <td>{test.mobile}</td>
              <td>{test.appointmentTime}</td>
              <td>{test.status}</td>
              <td>
                <button className="patientQueueDisplay-edit-button" onClick={() => handleEditPatientQueueDisplay(test)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="patientQueueDisplay-modal">
          <div className="patientQueueDisplay-modal-content">
            <AddPatientQueueDisplay
              onClose={handleClosePopup}
              onSubmit={handleAddUpdate}
              selectedQueue={selectedPatient} // Pass data to the popup for editing
            />
          </div>
        </div>
      )}

      <div className="nGOpatientRegistration-pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          « Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next »
        </button>
      </div>
    </div>
  );
};

export default PatientQueueDisplay;
