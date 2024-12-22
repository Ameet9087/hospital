import React, { useState, useEffect, useRef } from 'react';
import './TriagedPatient.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';

const TriagedPatients = ({ onApprove }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [patients, setPatients] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetch patients
  useEffect(() => {
    fetch('http://192.168.0.118:8081/api/emergency-patients')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data from the patients API');
        }
        return response.json();
      })
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  // Fetch statuses
  useEffect(() => {
    fetch('http://192.168.0.118:8081/api/triages')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch status data from the statuses API');
        }
        return response.json();
      })
      .then(data => setStatuses(data))
      .catch(error => console.error('Error fetching statuses:', error));
  }, []);

  // Get status label
  const getStatusLabel = (statusId) => {
    if (!statusId) {
      return 'Pending';
    }
    const status = statuses.find(status => status.id === statusId);
    return status ? status.label : 'Unknown';
  };

  const approvePatient = (patientId) => {
    // Find the patient to approve
    const approvedPatient = patients.find(patient => patient.id === patientId);
  
    // Notify the parent component if needed
    if (approvedPatient && typeof onApprove === 'function') {
      onApprove(approvedPatient);
    }
  
    // Filter out the approved patient
    setPatients(prevPatients =>
      prevPatients.filter(patient => patient.id !== patientId)
    );
  };
  

  return (
    <div className="TriagedPatients-triaged-patients">
      <div className="TriagedPatients-content">
        {/* Search and Filter */}
        <div className="TriagedPatients-search-filter">
          <div className="TriagedPatients-search-bar">
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="TriagedPatients-search-icon">🔍</button>
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="TriagedPatients-filter-dropdown"
          >
            <option value="All">All</option>
            <option value="Emergency">Emergency</option>
            <option value="Dog Bite">Dog Bite</option>
            <option value="Snake Bite">Snake Bite</option>
            <option value="Animal Bite">Animal Bite</option>
            <option value="Emergency Labour">Emergency Labour</option>
            <option value="Medico-Legal">Medico-Legal</option>
          </select>
        </div>

        {/* Patients Table */}
        <table ref={tableRef}>
          <thead>
            <tr>
              {["S.N.", "First Name", "Last Name", "Age/Sex", "Phone No.", "Case Type", "Status", "Action"]
                .map((header, index) => (
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
            {patients
              .filter(patient => {
                const nameExists = patient.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  patient.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
                const caseTypeMatches = filter === 'All' || patient.caseType === filter;
                return nameExists && caseTypeMatches;
              })
              .map((patient, index) => (
                <tr key={patient.id}>
                  <td>{index + 1}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.age}/{patient.gender}</td>
                  <td>{patient.contactNumber}</td>
                  <td>{patient.caseType}</td>
                  <td>{getStatusLabel(patient.status)}</td>
                  <td>
                    <button 
                      onClick={() => approvePatient(patient.id)} 
                      className="finalized-btn"
                    >
                      Finalized
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TriagedPatients;
