import React, { useState, useEffect } from 'react';
import './TripDetails.css';

const TripDetails = () => {
  const [trips, setTrips] = useState([]); // State to store all trips
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch all trips data from the API
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/trips`); // Fetch all trips
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        const data = await response.json();

        console.log(JSON.stringify(data, null, 2)); // Log the API response

        setTrips(data); // Save the trip data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []); // Empty dependency array means this will run only once when the component is mounted

  // Loading or Error State
  if (loading) return <div className="trip-details-loading">Loading...</div>;
  if (error) return <div className="trip-details-error">Error: {error}</div>;

  // Check if trips are empty or undefined
  if (!trips || trips.length === 0) {
    return <div className="trip-details-error">No trips available.</div>;
  }

  // Render all trip details in a table
  return (
    <div className="trip-details">
      <h1>All Trip Details</h1>

      <table>
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Distance Traveled</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.tripId}>
              <td>{trip.tripId || 'N/A'}</td>
              <td>{trip.startTime || 'N/A'}</td>
              <td>{trip.endTime || 'N/A'}</td>
              <td>{trip.distanceTraveled || 'N/A'} miles</td>
              <td>{trip.status || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Driver Details Table */}
      <h2>Driver Details</h2>
      {trips.map((trip) => (
        <table key={trip.tripId}>
          <thead>
            <tr>
              <th>Driver ID</th>
              <th>Driver Name</th>
              <th>License Number</th>
              <th>Driver Availability</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{trip.driverDTO?.driverId || 'N/A'}</td>
              <td>{trip.driverDTO?.name || 'N/A'}</td>
              <td>{trip.driverDTO?.licenseNumber || 'N/A'}</td>
              <td>{trip.driverDTO?.isAvailable || 'N/A'}</td>
              <td>{trip.driverDTO?.contactNumber || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      ))}

      {/* Vehicle Request Details Table */}
      <h2>Vehicle Request Details</h2>
      {trips.map((trip) => (
        <table key={trip.tripId}>
          <thead>
            <tr>
              <th>Request Type</th>
              <th>Request Status</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Request Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{trip.vehicleRequestDTO?.requestType || 'N/A'}</td>
              <td>{trip.vehicleRequestDTO?.status || 'N/A'}</td>
              <td>{trip.vehicleRequestDTO?.pickupLocation || 'N/A'}</td>
              <td>{trip.vehicleRequestDTO?.dropoffLocation || 'N/A'}</td>
              <td>{trip.vehicleRequestDTO?.requestTime || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default TripDetails;
