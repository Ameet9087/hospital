import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import "../DisSales/dispenSales.css";

const UpdateCounter = () => {
  const [counterData, setCounterData] = useState({
    counter: '',
    entryTime: '',
    logoutTime: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const counterId = localStorage.getItem('counterId'); // Get counter ID from localStorage

  useEffect(() => {
    // Fetch counter data when the component mounts
    const fetchCounterData = async () => {
      if (!counterId) return;

      try {
        const response = await axios.get(`http://localhost:3155/api/counter/${counterId}`);
        setCounterData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load counter data');
        setLoading(false);
      }
    };

    if (counterId) {
      fetchCounterData();
    } else {
      setLoading(false);
      setError('No counter selected');
    }
  }, [counterId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCounterData({
      ...counterData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    if (!counterId) {
      alert('No counter selected');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3155/api/counter/update/${counterId}`, counterData);
      alert('Counter updated successfully!');
      setCounterData(response.data); // Update state with new data
    } catch (error) {
      setError('Failed to update counter');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="update-counter-container">
      <h4>Update Counter</h4>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="counter">Counter Name:</label>
        <input
          type="text"
          id="counter"
          name="counter"
          value={counterData.counter}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="entryTime">Entry Time:</label>
        <input
          type="text"
          id="entryTime"
          name="entryTime"
          value={counterData.entryTime}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="logoutTime">Logout Time:</label>
        <input
          type="text"
          id="logoutTime"
          name="logoutTime"
          value={counterData.logoutTime}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleUpdate} className="update-button">
        Update Counter
      </button>
    </div>
  );
};

export default UpdateCounter;
