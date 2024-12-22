import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SchedulingList() {
  const [surgeries, setSurgeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function to fetch the data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8051/api/surgeries'); // Replace with your API endpoint
        console.log(response.data)
        setSurgeries(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="scheduling-list-container">
      <h3>Scheduled Surgeries List</h3>

      {surgeries.length === 0 ? (
        <p>No surgeries scheduled yet.</p>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Surgery ID</th>
              <th>Patient ID</th>
              <th>Surgeon Name</th>
              <th>Surgery Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration (mins)</th>
              <th>OT Number</th>
            </tr>
          </thead>
          <tbody>
            {surgeries.map((surgery, index) => (
              <tr key={index}>
                <td>{surgery.id}</td>
                <td>{surgery.patientId}</td>
                <td>{surgery.surgeonName}</td>
                <td>{surgery.surgeryType}</td>
                <td>{surgery.scheduledDate}</td>
                <td>{surgery.scheduledTime}</td>
                <td>{surgery.duration}</td>
                <td>{surgery.operatingTheatreId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SchedulingList;
