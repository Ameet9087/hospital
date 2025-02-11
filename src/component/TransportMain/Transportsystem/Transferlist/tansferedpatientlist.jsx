import React, { useState, useEffect } from 'react';
import './transferpatientlist.css';
import { API_BASE_URL } from '../../../api/api';

function TransferredPatientList() {
  // State to hold patients data and loading/error states
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transport-info`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPatients(data); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchPatients(); // Call the fetch function
  }, []); // Empty dependency array to run only once on mount

  // Loading and error handling UI
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="transportpatientalllist-container">
      <h2 className="transportpatientalllist-header">All Patient Transport List</h2>
      <table className="transportpatientalllist-table">
        <thead>
          <tr>
            <th className="transportpatientalllist-th">Patient Name</th>
            <th className="transportpatientalllist-th">Transport Mode</th>
            <th className="transportpatientalllist-th">Ambulance Driver</th>
            <th className="transportpatientalllist-th">Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patientTransport) => (
            <tr key={patientTransport.transportInfoId} className="transportpatientalllist-tr">
              {/* Correct patient name mapping */}
              <td className="transportpatientalllist-td">
                {`${patientTransport.inPatient?.patient?.firstName || ''} 
                  ${patientTransport.inPatient?.patient?.middleName || ''} 
                  ${patientTransport.inPatient?.patient?.lastName || ''}`.trim()}
              </td>

              {/* Transport mode */}
              <td className="transportpatientalllist-td">{patientTransport.modeOfTransport}</td>

              {/* Ambulance Driver */}
              <td className="transportpatientalllist-td">
                {patientTransport.modeOfTransport === 'Ambulance' ?
                  patientTransport.ambulance?.driver || 'N/A' : 'N/A'}
              </td>

              {/* Transport status */}
              <td className={`transportpatientalllist-td ${patientTransport.transportStatus === 'Transported' ? 'transported' : 'not-transported'}`}>
                {patientTransport.transportStatus || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransferredPatientList;
