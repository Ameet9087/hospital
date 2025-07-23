import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SendMessageHistory.css'; // Assuming you create a separate CSS file for styles

const SendMessageHistory = () => {
  const [messageHistory, setMessageHistory] = useState([]); // State for storing message history
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To capture errors

  useEffect(() => {
    // Fetch message history from API
    axios.get(' http://localhost:8085/api/broadcast')
      .then((response) => {
        console.log(response.data);
        setMessageHistory(response.data); // Update state with API data
        setLoading(false); // Data loaded, hide loading state
      })
      .catch((error) => {
        console.error('Error fetching message history:', error);
        setError('Failed to load message history'); // Set error message
        setLoading(false); // Stop loading even if there’s an error
      });
  }, []); // Empty dependency array to ensure this runs only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="SMHP-SendMessageHistory-container">
      <h2>Send Message History For the Department</h2>
      <table className="SMHP-SendMessageHistory-table">
        <thead>
          <tr>
            <th>Message ID</th>
            <th>broadcastDate</th>
            <th>Department ID</th>
            <th>Send Message</th>
            <th>Message Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {messageHistory.map((message) => (
            <tr key={message.broadcastId}>
              <td>{message.broadcastId}</td>
              <td>{new Date(message.broadcastDate).toDateString()}</td> {/* Assuming there's a recipient in your DTO */}
              <td>{message.departmentId}</td>
              <td>{message.message}</td>
              <td>{new Date(message.createdAt).toLocaleTimeString()}</td> 
              <td>{message.status}</td>{/* Format date as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SendMessageHistory;
