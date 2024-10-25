import React, { useState, useEffect, useRef } from 'react';
import './OphthalmoOutpatient.css';
import PatientDashboard from '../DashBoards/PatientDashboard'; // Import the PatientDashboard component
import { API_BASE_URL } from '../api/api';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import OphthalmoPatientDashboard from './OphthalmoPatientDashboard';

const OutPatient = () => {
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [view, setView] = useState('newPatient');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [isPatientOPEN,setIsPatientOPEN] = useState(false)
  const [patients, setPatients] = useState([]); // State to store the fetched patient data
  const [selectedPatient, setSelectedPatient] = useState(null); // State to store the selected patient
  const toggleFollowUp = () => {
    setShowFollowUp(!showFollowUp);
  };

  const handlePatientClick = (patient) => {
    setIsPatientOPEN(!isPatientOPEN)
    setSelectedPatient(patient); // Set the selected patient to open the dashboard
  };

  useEffect(() => {
   
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/new-patient-visits`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        const data = await response.json();
        setPatients(data); // Store the fetched data in the state
      } catch (error) {
        setError(error.message);
      } 
    };

    fetchPatientData();
  }, []);

  console.log(patients);
  

  // If a patient is selected, render the PatientDashboard
  if (isPatientOPEN) {
    return <OphthalmoPatientDashboard patient={selectedPatient}/>;
  }

  return (
    <div className="OutPatient-out-patient">
      <div className="OutPatient-sub-nav">
        <button
          className={view === 'newPatient' ? 'OutPatient-active' : ''}
          onClick={() => handleViewChange('newPatient')}
        >
          New Patient
        </button>
        <button
          className={view === 'opdRecord' ? 'OutPatient-active' : ''}
          onClick={() => handleViewChange('opdRecord')}
        >
          OPD Record
        </button>
        <button className="OutPatient-follow-up" onClick={toggleFollowUp}>
              Follow Up List
            </button>
      </div>

      {view === 'newPatient' && (
        <div>
          <div className="OutPatient-filters">
            <div className="OutPatient-date-picker">
              <label>Date:</label>
              <input className='OutPatient-input' type="date" value="2024-08-18" />
            </div>
            <select className='OutPatient-input'>
              <option>Today</option>
              <option>Last Week</option>
              <option>This Month</option>
              <option>Custom</option>
            </select>
            <div className="OutPatient-search">
              <input className='OutPatient-input' type="text" placeholder="Search" />
              <button className='OutPatient-input'>🔍</button>
            </div>
          </div>

          <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                 "Name",
                 "Age/Sex",
                 "VisitType",
                 "Performer Name",
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
            {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <tr key={index}>
                    <td>{`${patient.firstName} ${patient.lastName}`}</td>
                    <td>{patient.age}/{patient.sex}</td>
                    <td>{patient.visitType}</td>
                    <td>{`${patient?.employeeDTO?.salutation} ${patient?.employeeDTO?.firstName} ${patient?.employeeDTO?.lastName}`}</td>
                    <td>
                      <button
                        className="OutPatient-action-button"
                        onClick={() => handlePatientClick(patient)} // Open the PatientDashboard when clicked
                      >
                        👤
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="OutPatient-no-data">
                    No Rows To Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* {view === 'opdRecord' && <OpdList />}
      
      {showFavorites && <TableComponent />}
      {showFollowUp && <NewPatientFollowUpList />} */}
    </div>
  );
};

export default OutPatient;

