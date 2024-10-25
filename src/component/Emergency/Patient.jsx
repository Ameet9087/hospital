 /* Dhanashree_PatientList_19/09 */

import React, { useState, useEffect, useRef } from 'react';
import './Patient.css';
import EmergencyPatientRegistration from '../Emergency/Registration';
import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../api/api';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [showRegistration, setShowRegistration] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null); // State to track the visible dropdown

  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

  // Fetch data from the API
  useEffect(() => {
    fetch(`${API_BASE_URL}/emergency-patients`)
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleNewRegistrationClick = () => {
    setShowRegistration(true);
  };

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const toggleDropdown = (index) => {
    if (dropdownVisible === index) {
      setDropdownVisible(null); // Close the dropdown if it's already open
    } else {
      setDropdownVisible(index); // Open the dropdown for the clicked icon
    }
  };

  const renderDropdown = () => (
    <div className="dropdown-menu">
      <select className="dropdown-container">
        <option value="Contains">Contains</option>
      </select>
      <input
        type="text"
        placeholder="Filter"
        className="dropdown-textbox"
      />
    </div>
  );

  // Function to update the status of a patient
  const updatePatientStatus = (patientId, newStatus) => {
    const updatedPatient = patients.find(patient => patient.id === patientId);
    if (!updatedPatient) return;

    // Update the patient status locally
    updatedPatient.status = newStatus;
    setPatients([...patients]);

    // Make the PUT request to update the status in the API
    fetch(`${API_BASE_URL}/patients/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPatient),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update patient status');
        }
        return response.json();
      })
      .then(data => {
        console.log('Patient status updated:', data);
      })
      .catch(error => console.error('Error updating patient status:', error));
  };

  if (showRegistration) {
    return <EmergencyPatientRegistration />;
  }

  return (
    <div className="patient-list">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Existing Patient Name" 
          className="patient-name-input"
        />
        <div className="filter-container">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="All">All</option>
            <option value="General">General</option>
            <option value="Dog Bite">Dog Bite</option>
            <option value="Snake Bite">Snake Bite</option>
            <option value="Animal Bite">Animal Bite</option>
            <option value="Emergency Labour">Emergency Labour</option>
            <option value="Medico-Legal">Medico-Legal</option>
          </select>
        </div>
        <button className="new-registration-btn" onClick={handleNewRegistrationClick}>
          + New Registration
        </button>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-icon">🔍</button>
      </div>

      <div className="results-info">
        <span>Showing {patients.length} / {patients.length} results</span>
        <button className="Emergency-print-btn" onClick={handlePrint}>Print</button>
      </div>



      <table  ref={tableRef}>
          <thead>
            <tr>
              { [
  "Hospital No.",
  "Name",
  "Age",
  "Gender",
  "Visit Date Time",
  "Actions"
].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>


        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{new Date().toLocaleString()}</td>
              <td>

    
                <button 
                  className="action-btn" 
                  onClick={() => updatePatientStatus(patient.id, 'Triaged')}
                >
                  Triaged Patients
                </button>

                {/* 
                <button 
                  className="action-btn" 
                  onClick={() => updatePatientStatus(patient.id, 'Finalized')}
                >
                  Finalized Patients
                </button> */}

              </td>


            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="pagination">
        <span>0 to {patients.length} of {patients.length}</span>
        <button className="pagination-btn">First</button>
        <button className="pagination-btn">Previous</button>
        <span>Page 1 of 1</span>
        <button className="pagination-btn">Next</button>
        <button className="pagination-btn">Last</button>
      </div> */}
    </div>
  );
};

export default PatientList;

 /* Dhanashree_PatientList_19/09 */
